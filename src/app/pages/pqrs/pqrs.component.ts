import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Loading, Notify } from 'notiflix';
import { Router } from '@angular/router';

import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PqrsComponent implements OnInit {
  formulariopqr:FormGroup;
  estatusmail:any
  validator:boolean=false

  constructor(private mail:MailService,
    public formulario:FormBuilder,
    private rutas:Router) {
      this.formulariopqr=this.formulario.group({
        nombre:['',Validators.required],
        identificacion:['',Validators.required],
        email:['',Validators.email],
        celular:['',Validators.required],
        peticion:['',Validators.required]
      })
    }

  ngOnInit(): void {
  }


  validacion(){

    if (this.formulariopqr.valid) {

      Loading.pulse('Enviando correo')
      let datos={
        email:'direccionoperativa@invercomes.com.co',
        asunto:'Pqrs Martketplace Invercomes',
        mensaje:`
        <div style="background:#ccc; width:80%; margin:auto; padding:30px; border-radius:10px;  ">
  <img src="https://invercomes.com.co/img/Logo-Invercomes-Horizontal.png" style="width:100%">
          <p>
          a traves de pagina web, un cliente que se identifico como: <br>
           Nombre: ${this.formulariopqr.value.nombre} <br>
           Identificacion: ${this.formulariopqr.value.identificacion}<br>
           Correo: ${this.formulariopqr.value.email}<br>
           Celular: ${this.formulariopqr.value.celular} <br>
           tiene la siguiente peticion: <br>
           ${this.formulariopqr.value.peticion}<br><br>
           Cordialmente,<br>
           Equipo Marketplace Invercomes
          </p>
  </div>
        `

      }

      this.mail.enviarcorreo(datos).subscribe(res=>{
this.estatusmail = res
        if (this.estatusmail.success==1) {
          Loading.remove()
          Notify.success('Pqrs enviada con exito')
          this.rutas.navigateByUrl('/')
        }
      })

    }else{
      Loading.remove()
          Notify.failure('Pqrs No pudo ser entregado')
          this.validator=true

    }



  }



}
