import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrdenService } from '../../services/orden.service';


import { MailService } from 'src/app/services/mail.service';
import { Loading, Confirm, Report, Notify } from 'notiflix';
import { Path } from '../../config';






@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any
  totalvlr: any
  customer: any
  citys: any;
  usrid: any;
  ordenid: any;
  validacionform: boolean = false
  correostatus: any
  points: any
  codigo: any
  alerpoint: boolean
  pago: boolean = true
  path: String = Path.url;
  pointsform: any
  metodopago: any



  formulariodeorden: FormGroup;
  constructor(
    private conexcart: CartService,
    private servicio: RegisterService,
    private clien: LoginService,
    private rutas: Router,
    private formulario: FormBuilder,
    private ordenconex: OrdenService,
    private mail: MailService
  ) {

    this.formulariodeorden = this.formulario.group( //crea el grupo y los campos a validar para el formulario
      {
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required],
        metodopago: ['', Validators.required],
        puntos: ['0', Validators.required]

      }
    )
  }

  ngOnInit(): void {

    let usr =  atob(sessionStorage.getItem('usr')); // decodifica el usuario
    this.usrid = usr
    this.clien.consultarusr(usr).subscribe(res => {
      this.customer = res
    }); // consulta los datos del usuario que esta logueado
    let cartstorage = localStorage.getItem('cart') // guarda los datos del carrito en esa variable
    let carok = JSON.parse(cartstorage) //convierte  la variabe del carrito de compra en un archivo json
    this.cart = this.conexcart.asignarcarrito(carok) // envia el carrito al servicio
    this.totalvlr = this.conexcart.totalcarrito(this.cart) // recupera del servicio el valor total del carrito
    this.servicio.consultarcity().subscribe(res => {
      this.citys = res  //consulta las ciudades y departamentes para luego asinarlos al select
    })



    this.points = atob(localStorage.getItem('ggpoints'));  // decodifica el valor de los ggpoints y los asigna a la variable




  }


  validarpoints() { // funcion encargada de validar si el dato ingresado en el input para redimir cumple con las condiciones y dispara alertas

    if (this.formulariodeorden.value.puntos <= this.points && this.formulariodeorden.value.puntos >= 0 && this.formulariodeorden.value.puntos <= (this.totalvlr - 1000)) {
      this.alerpoint = false
      this.pago = true
    }
    else {


      this.alerpoint = true
      this.pago = false

    }

  }



  crearorden() {  // funcion para crear la orden

    if (this.cart.length == 0) { // valida que el carrito de compras tenga productos

      Notify.failure('No tienes Productos')
      this.rutas.navigateByUrl('viewcart')
    } else {

      if (this.formulariodeorden.valid) { //valida que todos los campos del formulario esten diligenciados
        this.pointsform = this.formulariodeorden.value.puntos   //guarda el valor a redimir en la variable
        this.metodopago = this.formulariodeorden.value.metodopago // guarda el metodo de pago seleccionado en la variable


        if (this.formulariodeorden.value.puntos > 0) { //valida que los puntos ingresados sea mayor a 0 para verificar al usr

          let mail =
          {
            asunto: 'Codigo de validacion',
            email: this.customer[0].email,
            mensaje: ''

          } //crea un array con los datos que el api recibe para enviar el correo de informacion

          this.ordenconex.generarcodigo(mail).subscribe(res => { // recibe el codigo de validacion desde la api
            this.codigo = res
          })


          Confirm.prompt(
            'Invercomes',
            'Te hemos enviado un codigo a tu correo, escribelo a continuacion',
            '',
            'Confirmar',
            'Cancelar',
            (respuesta) => {
              if (respuesta == this.codigo.Codigo) {// valida que el codigo ingresado por el usuario sea igual al generado por la api
                Notify.success('Codigo validado')
                Loading.standard('Generando orden')
                this.ordenconex.crearorden(this.formulariodeorden.value, this.totalvlr, this.usrid).subscribe(res => { //crea la orden y la envia a la api para registrarla
                  this.ordenid = res['orden']; // recibe el numero de orden registrado en la bd
                  this.creardetalleorden(this.ordenid) // envia el nuemro de orden creado en la bd para ejecutar dicha funcion
                   Loading.remove()
                  if (this.formulariodeorden.value.metodopago == 2 || this.formulariodeorden.value.metodopago == 3) {// si el metodo de pago seleccionado es con credito debera informar por correo a el fondo o a susolucion
                    this.informarcredito(this.metodopago)// llamado a la funcion q informa de los creditos
                  }

            this.informarcontabilidad() // funcion encargada de informar al area contable de el pedido
                })
              } else { // si el codigo no coincide arroja el siguiente error y debera volver a solicitar un codigo
                Notify.warning('Codigo no coincide')
              }
            },
            (respuesta) => {
              Notify.info('Tranquilo tus puntos siguen intactos')
            }
          )

        } else { // como no hay redimicion de puntos simplemente se genera la orden de la misma manera que esta arriba mensionado

          Loading.standard('Generando orden')
          this.ordenconex.crearorden(this.formulariodeorden.value, this.totalvlr, this.usrid).subscribe(res => {
            this.ordenid = res['orden'];
            this.creardetalleorden(this.ordenid)
            Loading.remove()
            if (this.formulariodeorden.value.metodopago == 2 || this.formulariodeorden.value.metodopago == 3) {
              this.informarcredito(this.metodopago)
            }
            this.informarcontabilidad()
          })


        }


      } else { // arroja alerta si los campos del formulario no estan diligenciados o estan mal diligenciados
        Notify.failure('Datos erroneos')
        this.validacionform = true

      }
    }


  }



  informarcontabilidad() {// genera el archivo que informara al area contable de invercomes sobre la nueva orden

    let datos = {
      email: 'contabilidad@invercomes.com.co',
      asunto: `Orden de compra ${this.ordenid}`,
      mensaje: `

          <div style="background:#ccc; width:80%; margin:auto; padding:30px; border-radius:10px;  ">
          <img src="https://invercomes.com.co/img/Logo-Invercomes-Horizontal.png" style="width:100%">
          <h2 style="">Orden de compra #${this.ordenid}</h2>
          <p>Se ha generado una orden de compra por valor de $ ${this.totalvlr - this.pointsform}</p>
          <p>Nombre: ${this.customer[0].name} <br>
          Identificacion: ${this.customer[0].identificacion_cliente} <br>
            Telefono: ${this.customer[0].phone} <br>
            Direccion: ${this.customer[0].address + ' ' + this.customer[0].city}</p>
          <p>Cordialmente,</p>
          <p>Equipo MarketPlace <br> Invercomes Sas. informacion</p>

          </div>


  `
    }

    this.mail.enviarcorreo(datos).subscribe(res => { // dispara el correo a traves del servicio
      this.correostatus = res

      if (this.correostatus.success == 1) {
        Notify.success('Se ha informado al area contable de tu pedido')
      } else {
        Notify.failure('Algo fallo, El correo no se envio')
      }


    })



  }


  creardetalleorden(id: any) { // funcion encargada de crear el detalle de la orden del cliente recibe el id de la orden ya creada en la bd

    this.ordenconex.creardetalleorden(this.cart, id).subscribe(res => { // envia la informacion al servicio

      if (res['success'] == 1) { // si el servidor contesta con 1 quiere decir que todo salio ok

        this.conexcart.reset() // resetea el carrito de compras
        Loading.remove();
        this.enviarcorreo(); // informa al cliente
        this.rutas.navigateByUrl('/payment/' + id) // redireccion para determinar la forma de pago




      } else { // el servidor contesta cualquier otra cosa y automaticamente se generan alertas
        alert("algo salio mal lo sentimos");
        this.conexcart.reset();
        this.rutas.navigateByUrl('/')
      }

    })
  }


  enviarcorreo() { // funcion para enviar correo


    let datos = {
      email: this.customer[0].email,
      asunto: `Orden de compra ${this.ordenid}`,
      mensaje: `

          <div style="background:#ccc; width:80%; margin:auto; padding:30px; border-radius:10px;  ">
          <img src="https://invercomes.com.co/img/Logo-Invercomes-Horizontal.png" style="width:100%">
          <h2 style="">Orden de compra #${this.ordenid}</h2>
          <p>Se ha generado una orden de compra por valor de $ ${this.totalvlr - this.pointsform}</p>
          <p>Nombre: ${this.customer[0].name} <br>
          Identificacion: ${this.customer[0].identificacion_cliente} <br>
            Telefono: ${this.customer[0].phone} <br>
            Direccion: ${this.customer[0].address + ' ' + this.customer[0].city}</p>
          <p>Cordialmente,</p>
          <p>Equipo MarketPlace <br> Invercomes Sas.</p>

          </div>


  `
    }// array q contiene la informacion que se enviara a la api para dispara el correo

    this.mail.enviarcorreo(datos).subscribe(res => { // conexion con el servicio para  enviar el correo
      this.correostatus = res

      if (this.correostatus.success == 1) { // confirma que el correo se envio
        Notify.success('Orden Genereda Correctamente, Correo enviado correctamente')
      } else {// fallo el correo al momento de enviarse
        Notify.failure('Algo fallo, El correo no se envio')
      }


    })



  }

  informarcredito(metpago: any) { // recibe el metodo de pago

    let email
    if (metpago == 2) { // dependiendo del metodo de pago asigna el correo correspondiente a la variable
      email = 'direcciontics@invercomes.com.co'   //su solucion comercial@susolucionsa.com.co
    } else if (metpago == 3) {
      email = 'ingeniero.ivanfr@gmail.com'   //femseapto femseapto@ganagana.com.co
    }


    let datos = { // archo con los datos del correo
      email: email,
      asunto: `Orden de compra ${this.ordenid}`,
      mensaje: `

              <div style="background:#ccc; width:80%; margin:auto; padding:30px; border-radius:10px;  ">
              <img src="https://invercomes.com.co/img/Logo-Invercomes-Horizontal.png" style="width:100%">
              <h2 style="">Orden de compra #${this.ordenid}</h2>
              <p>adjuntamos orden de compra para su respectiva validacion</p>
              <p>Se ha generado una orden de compra por valor de $ ${this.totalvlr - this.pointsform}</p>
              <p>Nombre: ${this.customer[0].name} <br>
              Identificacion: ${this.customer[0].identificacion_cliente} <br>
                Telefono: ${this.customer[0].phone} <br>
                Direccion: ${this.customer[0].address + ' ' + this.customer[0].city}</p>
              <p>Cordialmente,</p>
              <p>Equipo MarketPlace <br> Invercomes Sas.</p>

              </div>


`
    }

    this.mail.enviarcorreo(datos).subscribe(res => { // envia el correo a  traves del servicio
      this.correostatus = res

      if (this.correostatus.success == 1) {
        Notify.success('Se ha informado Correctamene para gestionar tu credito')
      } else {
        Notify.failure('Algo fallo, Comunicate con la entidad de credito')
      }


    })



  }


}
