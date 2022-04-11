import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Loading, Confirm, Report, Notify } from 'notiflix';
import { Path } from '../../config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  path:String = Path.url;
  grupoformlogin:FormGroup
  customer:any
  alerta:boolean=false
  sessionini:boolean
  idus:any

  constructor(
    public FormBuilder:FormBuilder,
    private rutas:Router,
    private servicio:LoginService

  ) {
this.grupoformlogin=this.FormBuilder.group({
  usr:[''],
  pass:['']
});


   }

  ngOnInit(): void {
if ( sessionStorage.getItem('usr') === null ) {
  this.sessionini= false
}else{
this.sessionini=true
this.idus=sessionStorage.getItem('usr');
this.servicio.consultarusr(this.idus).subscribe(res=>{
 this.customer=res





});





}


  }


  logear():any{

 this.servicio.login(this.grupoformlogin.value).subscribe(res=>{
this.customer=res
let variable = JSON.stringify( this.customer)

if (this.customer['success']==0) {
  this.alerta=true
  Notify.warning('Error en los datos')
}else{
  sessionStorage.removeItem('usr')
  this.alerta=false;
this.sessionini=true
sessionStorage.setItem('usr',this.customer[0].id)
Notify.info(

  `Bienvenido ${this.customer[0].name}`,

)
this.rutas.navigateByUrl('/viewcart');
}
})

  }


  cerrarsesion(){
    Loading.standard('Cerrando sesion')
    sessionStorage.removeItem('usr')
    this.sessionini=false
    Loading.remove(1023)
  }



}
