import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrdenService } from '../../services/orden.service';
import { Orden } from '../../services/orden';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { MailService } from 'src/app/services/mail.service';
import { Loading, Confirm, Report, Notify } from 'notiflix';
import { mail } from '../../services/mail';



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
  correostatus:any
  points:any
  codigo:any
 
  

  formulariodeorden: FormGroup;
  constructor(
    private conexcart: CartService,
    private servicio: RegisterService,
    private clien: LoginService,
    private rutas: Router,
    private formulario: FormBuilder,
    private ordenconex: OrdenService,
    private mail:MailService
  ) {

    this.formulariodeorden = this.formulario.group(
      {
        ciudad: ['', Validators.required],
        direccion: ['', Validators.required],
        metodopago: ['', Validators.required],

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


      
        this.points= localStorage.getItem('ggpoints')
      

    }





    crearorden(){

  if (this.cart.length == 0) {

    Notify.failure('No tienes Productos')
    this.rutas.navigateByUrl('viewcart')
} else {

if (this.formulariodeorden.valid) {

 if(this.formulariodeorden.value.metodopago==5){

  
  
 let  mail=
  {
  asunto:'Codigo de validacion',
  email:this.customer[0].email,
  mensaje:''

    }

this.ordenconex.generarcodigo(mail).subscribe(res=>{
this.codigo = res
})


Confirm.prompt(
  'Invercomes',
  'Te hemos enviado un codigo a tu correo, escribelo a continuacion',
  '',
  'Confirmar',
  'Cancelar',
  (respuesta)=>{
    if (respuesta == this.codigo.Codigo) {
     Notify.success('Codigo validado')
     Loading.standard('Generando orden')
     this.ordenconex.crearorden(this.formulariodeorden.value, this.totalvlr, this.usrid).subscribe(res => {
       this.ordenid = res['orden'];
       this.creardetalleorden(this.ordenid)
       console.log(this.ordenid);
       Loading.remove()
     })
    }else{
      Notify.warning('Codigo no coincide')
    }
  },
  (respuesta)=>{
    Notify.info('Tranquilo tus puntos siguen intactos')
  }
)

 }else{

  Loading.standard('Generando orden')
    this.ordenconex.crearorden(this.formulariodeorden.value, this.totalvlr, this.usrid).subscribe(res => {
      this.ordenid = res['orden'];
      this.creardetalleorden(this.ordenid)
      console.log(this.ordenid);
      Loading.remove()
    })
 

}
} else {
 Notify.failure('Datos erroneos')
 this.validacionform = true

}
}
  

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


enviarcorreo(){


let datos={
  email:this.customer[0].email,
  asunto:`Orden de compra ${this.ordenid}`,
  mensaje:`

  <div style="background:#ccc; width:80%; margin:auto; padding:30px; border-radius:10px;  ">
  <img src="https://invercomes.com.co/img/Logo-Invercomes-Horizontal.png" style="width:100%">
  <h2 style="">Orden de compra #${this.ordenid}</h2>
  <p>Se ha generado una orden de compra por valor de $ ${this.totalvlr}</p>
  <p>Nombre: ${this.customer[0].name} <br>
     Telefono: ${this.customer[0].phone} <br>
     Direccion: ${this.customer[0].address+' '+this.customer[0].city}</p>
  <p>Cordialmente,</p>
  <p>Equipo MarketPlace <br> Invercomes Sas.</p>

  </div>


  `
}

this.mail.enviarcorreo(datos).subscribe(res => {
  this.correostatus=res




  if (this.correostatus.success==1) {
   Notify.success('Orden Genereda Correctamente, Correo enviado correctamente')
  }else{
    Notify.failure('Algo fallo, El correo no se envio')
  }


})



}



}
