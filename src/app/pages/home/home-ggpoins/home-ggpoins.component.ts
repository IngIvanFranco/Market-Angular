import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Path } from '../../../config';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home-ggpoins',
  templateUrl: './home-ggpoins.component.html',
  styleUrls: ['./home-ggpoins.component.css']
})
export class HomeGgpoinsComponent implements OnInit {

  products:any;
  path:String = Path.url;

  constructor(
    private servicio:ProductsService,
    private conexcart:CartService,
    private rutas:Router
    ) { }

  ngOnInit(): void {
    this.servicio.listarproductosggpromo().subscribe(res=>{
      this.products = res


    })
  }



 public  addcart(id:any,name:any,price:any,des:any,tipo:any,cate,subcate,opcate ){

  let carrito =    this.conexcart.addcart(id,name,price,des,tipo,cate,subcate,opcate)
     this.conexcart.totalcarrito(carrito)


  this.rutas.navigateByUrl('/viewcart')

    }

}
