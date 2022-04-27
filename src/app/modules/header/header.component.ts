import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';


import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path:String = Path.url;
	categories:Object = null;
	render:Boolean = true;
  cart:any[]=[];
  totalcart:any;
  sessionini:boolean=false


	constructor(
    public categoriesService: CategoriesService,
    private rutas:Router,
    public cartconex:CartService
    ) {  }

	ngOnInit(): void {
    if (localStorage.getItem("cart") === null) {

      localStorage.setItem("cart","")

    }else{


    let cartstorage = localStorage.getItem('cart')
    let carok = JSON.parse(cartstorage)
    this.cartconex.asignarcarrito(carok)
    this.cart = this.cartconex.carrito

		this.categoriesService.getData()
		.subscribe(resp => {

			this.categories = resp;

		})


  }

	}




  recibirconsulta(){
let q = <HTMLInputElement> document.getElementById('q');
let consulta = q.value

this.rutas.navigateByUrl(`search/${consulta}`)
this.totalcart = this.cartconex.totalcarrito(this.cart);

}





elimaritem(id:any){

  this.cart=this.cartconex.eliminarcartitem(id)
  this.totalcart = this.cartconex.totalcarrito(this.cart);

}


volver(){
  this.rutas.navigateByUrl('')


}



}















