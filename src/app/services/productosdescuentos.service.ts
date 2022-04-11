import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config'

@Injectable({
  providedIn: 'root'
})
export class ProductosdescuentosService {
private api:string = Api.url
  constructor(
    private consult:HttpClient
  ) {  }

productosdescuentos(){
  return this.consult.get(`${this.api}?productosdescuento=1`)
}


productosconsulta(q:any){
  return this.consult.get(`${this.api}?consultarproductos=${q}`)
}

}
