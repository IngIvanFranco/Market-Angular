import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { login } from './login';
import { Res } from './respass'
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api:String = Api.url;
 private ggpoin:String = 'http://186.115.218.51:85/api.ggpoints/';
 public ponits:any
  constructor(
    private conexlogin:HttpClient
  ) { }

login(datosusr:login):Observable<any>{
  return this.conexlogin.post(`${this.api}?login=1`,datosusr)
}


consultarusr(id:any){
  return this.conexlogin.get(`${this.api}?consultarcustomers=${id}`)
}


consultartokenggpoint(){
 return this.conexlogin.get(this.ggpoin+'?u53r=4dm1n&p455=4dm1n1nv3rc0m35')
}

consultarggpoint(token:any,id:any){
return this.conexlogin.get(this.ggpoin+'?ced='+id+'&token='+token)


}


asignarpoint(points:any){
localStorage.setItem('ggpoints', points)
this.ponits = points;
return this.ponits

}

recuperarpass(form:Res){

return this.conexlogin.post(this.api+"?respass=1",form)


}


}
