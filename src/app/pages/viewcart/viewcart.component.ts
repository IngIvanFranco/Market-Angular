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
    let cartstorage = localStorage.getItem('cart')
    let carok = JSON.parse(cartstorage)
    this.cart = this.conexcart.asignarcarrito(carok)
    this.render=true
    this.valortotal(this.cart)
    this.cargue()

  }

cambiar(id:any){

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


valortotal(car:any[]){
let total=0
  for (let i = 0; i < car.length; i++) {
    const element = car[i];

total += element.qty * element.price

  }

  this.vlrtotal=total


}

eliminaritem(id:any){

this.cart = this.conexcart.eliminarcartitem(id)
this.valortotal(this.cart)

}

cargue(){
  Loading.remove()
}

}
