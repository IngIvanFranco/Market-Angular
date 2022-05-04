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
    this.customer=  atob(sessionStorage.getItem('usr'));
    this.servicio.listadoordenescliente(this.customer).subscribe(res=>{
      this.ordenes=res

     Loading.remove()
    })




  }





}
