import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading, Notify } from 'notiflix';
import { OrdenService } from 'src/app/services/orden.service';
import { Path } from '../../config';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  detalleorden:any
  ordenid:any
  path:String = Path.url;
  constructor(
    private servicio:OrdenService,
    private datosrutas:ActivatedRoute,
    private rutas:Router
  ) { }

  ngOnInit(): void {
    Loading.standard('Cargando')
    this.ordenid = this.datosrutas.snapshot.paramMap.get('id')

    this.servicio.detalleorden(this.ordenid).subscribe(res=>{
      this.detalleorden=res

if (this.detalleorden.success==0) {
  Loading.remove()
  
  this.rutas.navigateByUrl('/profile')
  Notify.warning('No tenemos Datos de esa orden');
}else{
          Loading.remove();
         
     } })

  }

}
