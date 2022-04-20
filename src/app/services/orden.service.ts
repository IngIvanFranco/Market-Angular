import { Injectable } from '@angular/core';
import { Orden } from './orden';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private api: String = Api.url;

  constructor(
    private cliente: HttpClient
  ) { }

  crearorden(entrega: Orden, vlr: any, usr: any) {

    return this.cliente.post(this.api + "?usr=" + usr + "&valor=" + vlr, entrega)



  }

  creardetalleorden(detalle: any, idorden: any) {
    return this.cliente.post(this.api + "?orderid=" + idorden, detalle)
  }

  datosorden(id: any) {
    return this.cliente.get(this.api + "?datosorder=" + id)
  }

  listadoordenescliente(id: any) {
    return this.cliente.get(this.api + "?ordenescustomer=" + id)
  }

  detalleorden(id: any) {
    return this.cliente.get(this.api + "?detalleorden=" + id)
  }


  generarcodigo(mail) {
    return this.cliente.post(this.api + "?Validacion=1", mail)
  }


  archivoggpoints(id: any) {
    return this.cliente.get(this.api + "?ggpoints=" + id)
  }

  contestacionggpoints(datos: any) {
    return this.cliente.post(`http://186.115.218.51:85/api.ggpoints/?registro=1`, datos)
  }

  revertirproceso(id:any){
    return this.cliente.get(this.api+"?revertirorden="+id)
  }


}
