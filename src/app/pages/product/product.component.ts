import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from '../../services/cart.service';
import { Loading, Confirm, Report } from 'notiflix';
import { Path } from '../../config';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id:any;
  producto:any;
  path:String = Path.url;

  constructor(
    private datosrutas:ActivatedRoute,
    private conex:ProductsService,
    private cart:CartService,
    private rutas:Router
  ) { }

  ngOnInit(): void {
    Loading.standard('Cargando Pagina')
    this.id=this.datosrutas.snapshot.paramMap.get('id')// captura el id del producto que va por la ruta
    this.conex.verproducto(this.id).subscribe(respuesta=>{// consulta a traves del servicio los datos de ese producto
      this.producto=respuesta;

      Loading.remove()

    })




  }



  addcart(id:any,name:any,price:any,des:any,tipo:any ){//funcion para agregar un producto al carrito de compras
   this.cart.addcart(id,name,price,des,tipo);
   this.rutas.navigateByUrl('/viewcart')
  }

}
