import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report, Notify } from 'notiflix';
import { LoginService } from 'src/app/services/login.service';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-respass',
  templateUrl: './respass.component.html',
  styleUrls: ['./respass.component.css']
})
export class RespassComponent implements OnInit {

  alerta:boolean
  alerta2:boolean
  formulariores:FormGroup
  customer:any


  constructor(
   public formulario:FormBuilder,
   private servicio:LoginService,
   private mailservicio:MailService
  ) {
this.formulariores = this.formulario.group( //asigna el grupo al formulario
  {
    identificacion:['',Validators.required],
    telefono:['',Validators.required]
  }
)

   }

  ngOnInit(): void {
  }


  verificar(){ // funcion para recuperar el pass
    if (this.formulariores.valid) {// valida que el formulario este completamente diligenciado
      this.alerta=false
      this.alerta2=false

      this.servicio.recuperarpass(this.formulariores.value).subscribe(res=>{//envia los datos al servicio para consultar si existen registros
        let respuesta = res

        if (respuesta['success']==0) {// si devuelve el 0 quiere decir q no hay regsitros
          Report.warning(
            'Invercomes Notificacion',
            'No tenemos registros con estos datos, pero puedes registrarte con nosotros ',
            'Ok'
          )
        }if (respuesta['success']==1) {// cuando devuelve el uno es por q hay mas de 1 usr con esos datos y no procederemos a continuar
          Report.failure(
            'Invercomes Notificacion',
            'Tenemos mas de una cuenta registrada con estos datos, comunicate con la direccion de tics direcciontics@invercomes.com.co',
            'Ok'
          )
        }else{ // de lo contrario efectivamente trae la informacion del usr crea el archivo de correo y lo envia a traves del servicio

this.customer=respuesta

    let datos = {
      email: this.customer[0].email,
      asunto: `Recperacion de Pass `,
      mensaje: `

          <div style="background:#ccc; width:80%; margin:auto; padding:30px; border-radius:10px;  ">
          <img src="https://invercomes.com.co/img/Logo-Invercomes-Horizontal.png" style="width:100%">
          <h2 style="">Recuperacion de pass</h2>
          <p>Esta informacion es unica y personal </p>
          <p>Nombre: ${this.customer[0].name} <br>
          Identificacion: ${this.customer[0].identificacion_cliente} <br>
            Telefono: ${this.customer[0].phone} <br>
            Direccion: ${this.customer[0].address + ' ' + this.customer[0].city}</p>
            Pass: ${this.customer[0].pass}</p>
          <p>Cordialmente,</p>
          <p>Equipo MarketPlace <br> Invercomes Sas.</p>

          </div>


  `
    }

this.mailservicio.enviarcorreo(datos).subscribe(res=>{// envia el archivo del correo para informar al cliente sus datos personales entre esos el pass
  let respuestamail = res
  if ( respuestamail['success'] == 1 ) {
    Report.success(
      'Invercomes Notificacion',
      'Te encontramos en nuestra base de datos, revisa tu bandeja de correo electronico con la que te resgistraste',
      'Ok'
    )

  }else{// si responde distinto el servidor dispara una alerta
    this.alerta=true
  }

}, err=>{// si el servidor devuelve un error se disparan las alertas

  this.alerta=true
  this.alerta2=false
})


        }

      }, err=>{// si efectivamente els ervidor devcuelve un error informamos al cliente
        Report.info(
          'Invercomes Notificacion',
          'ops creo q el servidor estallo... consulta en otra ocasion o comunicate con la direccion de tics direcciontics@invercomes.com.co',
          'Ok'
        )

      })

    }else{
      this.alerta2 = true
    }


  }

}
