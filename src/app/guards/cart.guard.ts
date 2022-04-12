import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  canActivate(){

if(!localStorage.getItem('cart')){
  Notify.warning('No tienes Productos en el carrito')
return false
}else{
  return true;
}


  }

}
