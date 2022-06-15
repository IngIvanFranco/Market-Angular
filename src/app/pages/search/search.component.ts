import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosdescuentosService } from 'src/app/services/productosdescuentos.service';
import { CartService } from 'src/app/services/cart.service';
import { Loading, Confirm, Report } from 'notiflix';
import { Path } from '../../config';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  path:String = Path.url;
  productos:any
q:any
carga:boolean=false



  constructor(
    private datosrutas:ActivatedRoute,
    private conex:ProductosdescuentosService,
    private conexcart:CartService,
    private rutas:Router
  ) {


   }

  ngOnInit(): void {

this.cargarconsulta()

  }

cargarconsulta(){
  Loading.standard('Cargando Pagina')
  this.q = this.datosrutas.snapshot.paramMap.get('q')//asigna el dato que viene por la ruta a una variable
  this.conex.productosconsulta(this.q).subscribe(arg => {// envia la variable al servicio para consultar que productos concuerdan con la consulta
    this.productos = arg

    Loading.remove();
  });
  this.carga=true
}


  addcart(id:any,name:any,price:any,des:any,tipo:any,cate,subcate,opccate ){// funcion para agregar el producto al carrito de compra

     this.conexcart.addcart(id,name,price,des,tipo,cate,subcate,opccate)


this.rutas.navigateByUrl('/viewcart')


   }

}
