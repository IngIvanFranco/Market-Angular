import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { login } from './login';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api:String = Api.url;
 
  constructor(
    private conexlogin:HttpClient
  ) { }

login(datosusr:login):Observable<any>{
  return this.conexlogin.post(`${this.api}?login=1`,datosusr)
}


consultarusr(id:any){
  return this.conexlogin.get(`${this.api}?consultarcustomers=${id}`)
}




}
