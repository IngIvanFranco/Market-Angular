import { Component, OnInit } from '@angular/core';
import { ProductosdescuentosService } from 'src/app/services/productosdescuentos.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Path } from '../../../config';

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css']
})
export class HomeShowcaseComponent implements OnInit {

  productos:any;
  path:String = Path.url;
  filterhome:string = ''


   	constructor(
       private producdes:ProductosdescuentosService,
       private conexcart:CartService,
       private rutas:Router
     ) { }

	ngOnInit(): void {
  this.producdes.productosdescuentos().subscribe(respuesta=>{
    this.productos=respuesta




  })

	}



 public async addcart(id:any,name:any,price:any,des:any,tipo:any,cate,subcate,opccate ){

let carrito =    this.conexcart.addcart(id,name,price,des,tipo,cate,subcate,opccate)
   this.conexcart.totalcarrito(carrito)


this.rutas.navigateByUrl('/viewcart')

  }
}

