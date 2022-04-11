import { Injectable } from '@angular/core';
import { Api } from '../config';



import { mail } from './mail';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailService {
  private api:String = Api.url;

  constructor(
    private conexionmail:HttpClient
    ) { }




enviarcorreo(datos:mail){
return this.conexionmail.post(this.api+'?correo=1',datos)
}
}

