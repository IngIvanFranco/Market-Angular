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

    this.formulariodeorden = this.formulario.group(
      {
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required],
        metodopago: ['', Validators.required],
        puntos: ['0', Validators.required]

      }
    )
  }

  ngOnInit(): void {

    let usr = sessionStorage.getItem('usr');
    this.usrid = usr
    this.clien.consultarusr(usr).subscribe(res => {
      this.customer = res
    });
    let cartstorage = localStorage.getItem('cart')
    let carok = JSON.parse(cartstorage)
    this.cart = this.conexcart.asignarcarrito(carok)
    this.totalvlr = this.conexcart.totalcarrito(this.cart)
    this.servicio.consultarcity().subscribe(res => {
      this.citys = res
    })



    this.points = localStorage.getItem('ggpoints')




  }


  validarpoints() {

    if (this.formulariodeorden.value.puntos <= this.points && this.formulariodeorden.value.puntos >= 0 && this.formulariodeorden.value.puntos <= (this.totalvlr - 1000)) {
      this.alerpoint = false
      this.pago = true
    }
    else {


      this.alerpoint = true
      this.pago = false

    }

  }



  crearorden() {

    if (this.cart.length == 0) {

      Notify.failure('No tienes Productos')
      this.rutas.navigateByUrl('viewcart')
    } else {

      if (this.formulariodeorden.valid) {
        this.pointsform = this.formulariodeorden.value.puntos
        this.metodopago = this.formulariodeorden.value.metodopago


        if (this.formulariodeorden.value.puntos > 0) {




          let mail =
          {
            asunto: 'Codigo de validacion',
            email: this.customer[0].email,
            mensaje: ''

          }

          this.ordenconex.generarcodigo(mail).subscribe(res => {
            this.codigo = res
          })


          Confirm.prompt(
            'Invercomes',
            'Te hemos enviado un codigo a tu correo, escribelo a continuacion',
            '',
            'Confirmar',
            'Cancelar',
            (respuesta) => {
              if (respuesta == this.codigo.Codigo) {
                Notify.success('Codigo validado')




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
              } else {
                Notify.warning('Codigo no coincide')
              }
            },
            (respuesta) => {
              Notify.info('Tranquilo tus puntos siguen intactos')
            }
          )

        } else {

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


      } else {
        Notify.failure('Datos erroneos')
        this.validacionform = true

      }
    }


  }



  informarcontabilidad() {


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

    this.mail.enviarcorreo(datos).subscribe(res => {
      this.correostatus = res

      if (this.correostatus.success == 1) {
        Notify.success('Se ha informado al area contable de tu pedido')
      } else {
        Notify.failure('Algo fallo, El correo no se envio')
      }


    })



  }






  creardetalleorden(id: any) {

    this.ordenconex.creardetalleorden(this.cart, id).subscribe(res => {
      console.log(res);

      if (res['success'] == 1) {

        this.conexcart.reset()
        Loading.remove();
        this.enviarcorreo();
        this.rutas.navigateByUrl('/payment/' + id)




      } else {
        alert("algo salio mal lo sentimos");
        this.conexcart.reset();
        this.rutas.navigateByUrl('/')
      }

    })
  }


  enviarcorreo() {


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
    }

    this.mail.enviarcorreo(datos).subscribe(res => {
      this.correostatus = res

      if (this.correostatus.success == 1) {
        Notify.success('Orden Genereda Correctamente, Correo enviado correctamente')
      } else {
        Notify.failure('Algo fallo, El correo no se envio')
      }


    })



  }

  informarcredito(metpago: any) {

    let email
    if (metpago == 2) {
      email = 'direcciontics@invercomes.com.co'   //su solucion comercial@susolucionsa.com.co
    } else if (metpago == 3) {
      email = 'ingeniero.ivanfr@gmail.com'   //femseapto femseapto@ganagana.com.co
    }


    let datos = {
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

    this.mail.enviarcorreo(datos).subscribe(res => {
      this.correostatus = res

      if (this.correostatus.success == 1) {
        Notify.success('Se ha informado Correctamene para gestionar tu credito')
      } else {
        Notify.failure('Algo fallo, Comunicate con la entidad de credito')
      }


    })



  }


}
