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

addcart(id:any,name:any,price:any,des:any,tipo:any, catee:any ,subcate:any,opccate:any ){
  localStorage.removeItem('cart')
  var fecha = new Date();
  var diasiniva = new Date(2022,5,17)


  if (fecha.getDate() == diasiniva.getDate()) {//es dia sin iva?? 
   
    if (  (opccate== 35 && price<=1815400 && id != 13 && id != 241 && id != 3632 && id != 3605  && id != 3604 )
    || (opccate== 120 || opccate== 24 || opccate== 25 || opccate== 23 
    || opccate== 28 || opccate== 27) 
    || (id== 4927  )
    
    || (catee== 1 || catee== 3 || catee== 4 
    || catee== 6 || catee== 7 || catee== 8 
    || catee== 9 || catee== 11 || catee== 10 )
    || (subcate== 2 || subcate== 15  || subcate== 28)
    )  {

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

      //aqui entran los productos q no tienen descuento del dia sin iva asi q se agregan comun y corriente al carrito
    }else{

let precio = price/1.19
      this.validacion= this.carrito.find( item=> item.id==id)
      if (this.validacion === undefined ) {
        this.carrito.push({
          id,
          name,
          price:precio,
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

   
   
   
      //aqui entran los productos q si tienen descuento del dia sin iva asi q se les modifica el valor
    }


  }else{//no es dia si iva
     

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
