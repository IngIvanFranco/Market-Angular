import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  	private api:String = Api.url;

  	constructor(private http:HttpClient) { }

  	consultarsubcategorias(){

		return this.http.get(`${this.api}?consultarsubcategorias`);

	}
}
