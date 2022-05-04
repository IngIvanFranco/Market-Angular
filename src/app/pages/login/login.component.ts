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
  path: String = Path.url;
  grupoformlogin: FormGroup
  customer: any
  alerta: boolean = false
  sessionini: boolean
  idus: any
  token: any
  respuesta:any

  constructor(
    public FormBuilder: FormBuilder,
    private rutas: Router,
    private servicio: LoginService

  ) {
    this.grupoformlogin = this.FormBuilder.group({ // asigna el grupo al fomrulario
      usr: [''],
      pass: ['']
    });


  }

  ngOnInit(): void {
    if (sessionStorage.getItem('usr') === null) {// valida si hay una sesion inciada
      this.sessionini = false
    } else {
      this.sessionini = true
      this.idus = atob(sessionStorage.getItem('usr'));// si la sesion esta iniciada decodifica el usr y lo asigna a la variable


      this.servicio.consultarusr(this.idus).subscribe(res => {// trae toda la informacion del cliente
        this.customer = res

      });



    }


  }


  logear(): any {// funcion para capturar los datos y enviarlos al servicio

    this.servicio.login(this.grupoformlogin.value).subscribe(res => {// evnia los datos al servicio
      this.customer = res
      let variable = JSON.stringify(this.customer)

      if (this.customer['success'] == 0) {// si la respuesta es erronea dispara las alertas
        this.alerta = true
        Notify.warning('Error en los datos')
      } else {// la respuesta es positiva quiere decir que q si existe el usr
        sessionStorage.removeItem('usr')
        this.alerta = false;
        this.sessionini = true
        let custom = btoa(this.customer[0].id) // codifica el id del usuario
        sessionStorage.setItem('usr', custom)

        this.consultarggpoin(this.customer[0].identificacion_cliente) // consultamos si el usr es un cliente gana gana
        Notify.info(

          `Bienvenido ${this.customer[0].name}`,

        )


        this.rutas.navigateByUrl('/viewcart');//nos redirije al carrito de compras
      }
    })

  }


  cerrarsesion() { // borra todos los archivos relacionados con la sesion
    Loading.standard('Cerrando sesion')
    sessionStorage.removeItem('usr')
    this.sessionini = false
    Loading.remove(1023)
    localStorage.removeItem('ggpoints')
  }




  consultarggpoin(id: any) { //recibe el identificador del cliente y lo consulta en el ws de gana gana


    this.servicio.consultartokenggpoint().subscribe(res => {// consulta un token para poder hacer uso del ws
      this.token = res

      this.servicio.consultarggpoint(this.token.token, id).subscribe(res => {// consulta si efectivamente el usr es cliente gana gana
this.respuesta = res
console.log(this.respuesta);

        if (!res)  {// si no existe asigna un flase a la variable ggpoints
          this.servicio.asignarpoint(false)

        }

        else { // asigna la equivalencia a la variable ggpoints haciendo uso del servicio

         let puntos = this.respuesta.EQUIVALENCIA
         this.servicio.asignarpoint(puntos)
         Report.success(
          'Eres un cliente Gana-Gana',
          `Cuentas con:  ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(puntos)} en GGPOINTS para redimir en nuestra market`,
          'Yeah');
        }

      })

    })
  }


}
