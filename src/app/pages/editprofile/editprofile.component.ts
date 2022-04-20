import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { Loading, Notify, Report } from 'notiflix';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  formularioedicion:FormGroup
  idusr:any
  customer:any
  citys: any
  alerta:boolean = false

  constructor(
   private servicio:LoginService,
   public formulario:FormBuilder,
   private servicio2:RegisterService,
   private rutas:Router) {  this.idusr = sessionStorage.getItem('usr')


   this.servicio.consultarusr(this.idusr).subscribe(res=>{
   this.customer= res
      console.log(this.customer);
      this.formularioedicion.setValue(
        {

          identificacion: this.customer[0].identificacion_cliente,
          nombre: this.customer[0].name,
          direccion: this.customer[0].address,
          ciudad: this.customer[0].city,
          celular: this.customer[0].phone,
          postal: this.customer[0].codigo_postal,
          email: this.customer[0].email,
        }
      )

   })




   this.formularioedicion = this.formulario.group({

     identificacion: ['', Validators.required],
     nombre: ['', Validators.required],
     direccion: ['', Validators.required],
     ciudad: ['', Validators.required],
     celular: ['', Validators.required],
     postal: ['', Validators.required],
     email: ['', Validators.email],
   })}

  ngOnInit(): void {

    this.servicio2.consultarcity().subscribe(res => {
      this.citys = res

    })


  }


  editar(){

    if (this.formularioedicion.valid) {
      Loading.standard('Editando Usuario')
      this.servicio2.editarcustomer(this.idusr,this.formularioedicion.value).subscribe(res=>{
let resultado = res
        if (resultado['success'] == 1 ) {
          Loading.remove()
          Notify.success('Tu perfil se ha editado correctamente')
          Report.success(
            'Invercomes Notificacion',
            'Recuerda que si cambiaste tu email, tambian cambiaste de usuario asi que la proxima vez que inicies sesion deberas de hacerlo con este nuevo email',
            'Yeah'
          )
          this.rutas.navigateByUrl('login')
        }else{
          Loading.remove()
          Notify.failure('algo sucedio')
          Report.failure(
            'Invercomes Notificacion',
            'No Pudimos editar tu perfil, intenta a mas tarde o comunicate con nosotros',
            'Yeah'
          )
        }

      }
      )
    }else{
      Notify.failure('Revisa Tus Datos')
      this.alerta=true
    }

  }

}
