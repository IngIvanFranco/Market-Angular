import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  	private api:String = Api.url;

  	constructor(private http:HttpClient) { }

  	getFilterData(orderBy:String, equalTo:String){

		return this.http.get(`${this.api}sub-categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

	}
}
