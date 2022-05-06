import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

constructor(private rutas:Router){

}

  canActivate(){
    if (sessionStorage.getItem('usr') === null) {
      Notify.warning('Debes inciar sesion')
      this.rutas.navigateByUrl('/login')
      
      return false
     } else {
    return true;
     }
  }

}
