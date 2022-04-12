import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  canActivate(){
    if (sessionStorage.getItem('usr') === null) {
      Notify.warning('Debes inciar sesion')
      return false
     } else {
    return true;
     }
  }

}
