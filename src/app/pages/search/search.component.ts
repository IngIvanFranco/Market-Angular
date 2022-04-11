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
    Loading.standard('Cargando Pagina')
 this.q = this.datosrutas.snapshot.paramMap.get('q')
 this.conex.productosconsulta(this.q).subscribe(arg => {
   this.productos = arg

   Loading.remove();
 });
 this.carga=true


  }




  addcart(id:any,name:any,price:any,des:any,tipo:any ){

     this.conexcart.addcart(id,name,price,des,tipo)


this.rutas.navigateByUrl('/viewcart')


   }

}
