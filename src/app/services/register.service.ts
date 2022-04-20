import { Injectable } from '@angular/core';
import { Register } from './register';
import { Api } from '../config';
import {Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private api:String = Api.url;
  constructor(
    private cliente:HttpClient
  ) { }


crearcustomer(customer:Register):Observable<any>{
return this.cliente.post(this.api+"?register=1",customer);
}

consultarcity(){
  return this.cliente.get(this.api+"?consultarcitys=1")
}

editarcustomer(id:any,customer:Register){

return this.cliente.post(this.api+"?editcustomer="+id,customer)

}


}
