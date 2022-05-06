import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

	private api:String = Api.url;
  product: any[]=[{}]
	constructor(private http:HttpClient ) { }

verproducto(id:any){
  return this.http.get(this.api+"?consultarproducto="+id);
}


listarproductocategoria(id:any){
  return this.http.get(this.api+"?listarproductos="+id)
}

listarproductosubcategoria(id:any){
  return this.http.get(this.api+"?prodsubcate="+id)
}



getData(){
  return this.product
}
getFilterData(){
  return this.product
}
}
