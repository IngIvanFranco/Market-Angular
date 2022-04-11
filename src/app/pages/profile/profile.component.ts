import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/services/orden.service';
import { Router } from '@angular/router';
import { Loading, Confirm, Report, Notify } from 'notiflix';
import { Path } from '../../config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ordenes:any
  customer:any



  constructor(
    private servicio:OrdenService,
    private rutas:Router) { }

  ngOnInit(): void {
    Loading.standard('cargando')
   
    if ( sessionStorage.getItem('usr') === null ) {
      Loading.remove()
      this.rutas.navigateByUrl('/login')
      Notify.warning('Debes Iniciar Sesion primero')
      
    }else{
      
    this.customer=sessionStorage.getItem('usr');
    this.servicio.listadoordenescliente(this.customer).subscribe(res=>{
      this.ordenes=res
     console.log(this.ordenes);
     Loading.remove()
    })
   
    }


  }



 

}
