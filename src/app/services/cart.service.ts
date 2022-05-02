import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  public carrito: any[]=[];
  public totalcart:any;
  validacion:any;


  constructor(

  ) { }


  asignarcarrito(cart:any[]){
   return this.carrito=cart
  }


  totalcarrito(cart:any[]){
    this.totalcart=0
    for (let i = 0; i < cart.length; i++) {
      const element =cart[i];
           this.totalcart += Number( element.qty) * Number(element.price)
    }

    return this.totalcart
  }

addcart(id:any,name:any,price:any,des:any,tipo:any ){
 localStorage.removeItem('cart')

this.validacion= this.carrito.find( item=> item.id==id)
  if (this.validacion === undefined ) {
    this.carrito.push({
      id,
      name,
      price,
      qty:1,
      des,
      tipo,
      talla:''
    })

  }else{
    let index = this.carrito.map(item=>item.id).indexOf(id)
    let canti = this.carrito[index].qty;
    let cantidadtotal = Number(canti) + 1;
    this.cambiarcantidad(cantidadtotal,index)
  }

  localStorage.setItem('cart',JSON.stringify(this.carrito))

  return this.carrito




}


cambiarcantidad(cantidad:any,id:any){
  if (cantidad > 0) {
    localStorage.removeItem('cart')
  this.carrito[id].qty=cantidad
  localStorage.setItem('cart',JSON.stringify(this.carrito))
  return this.carrito
  }else{

    return false
  }
  }

  eliminarcartitem(id:any){
    localStorage.removeItem('cart')
    this.carrito.splice(id,1);
    localStorage.setItem('cart',JSON.stringify(this.carrito))

    return this.carrito
  }

  reset(){
    localStorage.removeItem('cart');
    this.carrito =[];
    localStorage.setItem('cart',JSON.stringify(this.carrito))
    this.totalcart=0;

    }


    cambiartalla(id:any,talla:string){
      localStorage.removeItem('cart')
      this.carrito[id].talla=talla
      localStorage.setItem('cart',JSON.stringify(this.carrito))
      return this.carrito
    }

}
