import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Path } from '../../config';



import { CategoriesService } from '../../services/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})

export class HeaderMobileComponent implements OnInit {

	path:String = Path.url;
	categories:Object = null;
	render:Boolean = true;
	categoriesList:Array<any> = [];
  cart:any[]=[];
  totalcart:any;
fomrmularioconsulta:FormGroup;

	constructor(
    private categoriesService: CategoriesService,
    private fomulario: FormBuilder,
    private rutas:Router,
    public cartconex:CartService) {

      this.fomrmularioconsulta= this.fomulario.group(
        {
          q:['',Validators.required]
        }
      )
    }

	ngOnInit(): void {

		/*=============================================
		Tomamos la data de las categorías
		=============================================*/

		this.categoriesService.getData()
		.subscribe(resp => {

			this.categories = resp;

		})


    if (localStorage.getItem("cart") === null) {

      localStorage.setItem("cart","")

    }else{


    let cartstorage = localStorage.getItem('cart')
    let carok = JSON.parse(cartstorage)
    this.cartconex.asignarcarrito(carok)
    this.cart = this.cartconex.carrito



    }




	}

          recibirconsulta(){


                    if (this.rutas.url!=`/search/${this.fomrmularioconsulta.value.q}`) {

                      document.location.href=`#/search/${this.fomrmularioconsulta.value.q}`
                      }

                      window.location.reload()

                      this.totalcart = this.cartconex.totalcarrito(this.cart);


            }


            consultarcategoria(id:any){
              if (this.rutas.url!=`/products/${id}`) {
            
                document.location.href=`#/products/${id}`
                }
            
                window.location.reload()
            }
            



            elimaritem(id:any){

              this.cart=this.cartconex.eliminarcartitem(id)
              this.totalcart = this.cartconex.totalcarrito(this.cart);

            }


            volver(){
              this.rutas.navigateByUrl('')


            }



			}



