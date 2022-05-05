import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Loading, Confirm, Report } from 'notiflix';
import { Path } from '../../config';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  cart:any[]=[]
  render:boolean=false
  vlrtotal:any
  path:String = Path.url;


  constructor(
    private rutas:Router,
    private conexcart:CartService
  ) { }

  ngOnInit(): void {
    Loading.standard('Cargando Pagina')
    let cartstorage = localStorage.getItem('cart')// captura el carrito que esta en el localstorage  y lo asigna a una variable
    let carok = JSON.parse(cartstorage)//convierte la variable en un archivo json
    this.cart = this.conexcart.asignarcarrito(carok)//envia el carrito al servicio
    this.render=true
    this.valortotal(this.cart)//totaliza el valor del carrito
    this.cargue()


  }

cambiar(id:any){// funcion q captura el evento si hay un cambio de la cantidad del producto

let can = <HTMLInputElement> document.getElementById(`cantidad${id}`);
var cantidad = can.value
let res = this.conexcart.cambiarcantidad(cantidad,id)

if (res == false) {
 Report.failure('Invercomes','No puedes asignar un valor negativo','OK')


}else{


  this.cart = res
  this.valortotal(this.cart)
}




}


valortotal(car:any[]){ // funcion para determinar el valor total del carrito de compras
let total=0
  for (let i = 0; i < car.length; i++) {
    const element = car[i];

total += element.qty * element.price

  }

  this.vlrtotal=total


}

eliminaritem(id:any){// funcion que elimina un item del carrito de compras a traves del servicio

this.cart = this.conexcart.eliminarcartitem(id)
this.valortotal(this.cart)

}

cargue(){

  Loading.remove()
}



cambiartalla(id:any,talla:string){// funcion que modifica la talla del producto siempre y cuando sea un producto tipo ropa

this.cart= this.conexcart.cambiartalla(id,talla)
}

}
