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
   private rutas:Router) {
      this.idusr = atob(sessionStorage.getItem('usr'))// decodifica el usr


   this.servicio.consultarusr(this.idusr).subscribe(res=>{ // consulta los datos del usr y los trae a traves del servicio
   this.customer= res

      this.formularioedicion.setValue( // asigna valores a los input de el formulario
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




   this.formularioedicion = this.formulario.group({ //crea el grupo del formulario y genera validaciones

     identificacion: ['', Validators.required],
     nombre: ['', Validators.required],
     direccion: ['', Validators.required],
     ciudad: ['', Validators.required],
     celular: ['', Validators.required],
     postal: ['', Validators.required],
     email: ['', Validators.email],
   })}

  ngOnInit(): void {

    this.servicio2.consultarcity().subscribe(res => { // trae las ciudades para el select del formulario
      this.citys = res

    })


  }


  editar(){ // funcion para procesar los datos del formulario

    if (this.formularioedicion.valid) { // valida que los input esten diligenciados
      Loading.standard('Editando Usuario')
      this.servicio2.editarcustomer(this.idusr,this.formularioedicion.value).subscribe(res=>{// envia el formulario al servicio para luego enviar la informacion a la api
let resultado = res
        if (resultado['success'] == 1 ) {// respuesta acertada quiere decir que la informacion se actualizo correctamente
          Loading.remove()
          Notify.success('Tu perfil se ha editado correctamente')
          Report.success(
            'Invercomes Notificacion',
            'Recuerda que si cambiaste tu email, tambian cambiaste de usuario asi que la proxima vez que inicies sesion deberas de hacerlo con este nuevo email',
            'Yeah'
          )
          this.rutas.navigateByUrl('login')// nos redirije al login
        }else{ // de lo contrario infroma que algo sucedio
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
    }else{ // si el formulario no cumple con la validacion dispara las alarmas
      Notify.failure('Revisa Tus Datos')
      this.alerta=true
    }

  }

}
