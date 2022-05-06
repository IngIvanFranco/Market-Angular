import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Path } from '../../config';
import { Loading } from 'notiflix';

@Component({
  selector: 'app-productssub',
  templateUrl: './productssub.component.html',
  styleUrls: ['./productssub.component.css']
})
export class ProductssubComponent implements OnInit {
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
  Loading.standard()
  this.id=this.datosrutas.snapshot.paramMap.get('id')//captura la categoria del producto por la url
  
  console.log(this.id);
  
  this.productosservicios.listarproductosubcategoria(this.id).subscribe(res=>{// consulta por el servicio los productos que pertenecen a esta categoria
   this.productos=res
   console.log(this.productos);
   
   
   Loading.remove()
  
  })
  
  this.cargue=true;
    }
  
    addcart(id:any,name:any,price:any,des:any,tipo:any){//funcion para cargar un producto al carrito de compras
  
      this.CartService.addcart(id,name,price,des,tipo)
    this.rutas.navigateByUrl('/viewcart')
  
    }
  
  
  
  }
  