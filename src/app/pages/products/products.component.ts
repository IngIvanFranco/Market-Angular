import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Path } from '../../config';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
id:any
productos:any
cargue:boolean
path:String = Path.url;
  constructor(
    private datosrutas:ActivatedRoute,
    private productosservicios:ProductsService,
    private CartService:CartService,
    private rutas:Router
  ) { 
    this.cargue=false
  }

  ngOnInit(): void {

this.id=this.datosrutas.snapshot.paramMap.get('id')

console.log(this.id);

this.productosservicios.listarproductocategoria(this.id).subscribe(res=>{
 this.productos=res
   
})

this.cargue=true;
  }

  addcart(id:any,name:any,price:any,des:any,tipo:any){

    this.CartService.addcart(id,name,price,des,tipo)
  this.rutas.navigateByUrl('/viewcart')

  }



}
