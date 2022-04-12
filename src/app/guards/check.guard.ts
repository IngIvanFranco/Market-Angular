import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckGuard implements CanActivate {


  cart:any
constructor(
  private cartservice:CartService
){}

  canActivate(){
this.cart=this.cartservice.carrito


if (this.cart.length == 0) {
  Notify.warning('No cuentas con articulos en el carrito de compras')
  return false
}else{
  return true;
}


  }

}
