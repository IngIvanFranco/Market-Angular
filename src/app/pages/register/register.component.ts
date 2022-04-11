import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fomrularioderegistro: FormGroup;
  citys: any
  validacion: boolean = false


  constructor(
    public formulario: FormBuilder,
    private servicio: RegisterService,
    private rutas: Router
  ) {

    this.fomrularioderegistro = this.formulario.group(
      {
        tipoiden: ['', Validators.required],
        identificacion: ['', Validators.required],
        nombre: ['', Validators.required],
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        celular: ['', Validators.required],
        postal: ['', Validators.required],
        email: ['', Validators.email],
        pass: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.servicio.consultarcity().subscribe(res => {
      this.citys = res

    })
  }


  register() {
Loading.standard('Creando Usuario')
    if (this.fomrularioderegistro.valid) {
Loading.remove()
      this.servicio.crearcustomer(this.fomrularioderegistro.value).subscribe(
        res => {

          this.rutas.navigateByUrl('/login')
          Notify.success('Usuario creado correctamente')
        }
      );

    } else {
      Loading.remove()
      Notify.failure('algo Salio mal, revisa tus datos')

      this.validacion = true
    }




  }

}
