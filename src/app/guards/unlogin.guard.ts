import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnloginGuard implements CanActivate {

  canActivate() {
    if (sessionStorage.getItem('usr') === null) {
      
      return true
     } else {
      Notify.warning('No puedes ingresar con una sesion iniciada')
    return false;
     }
   }
  
}
