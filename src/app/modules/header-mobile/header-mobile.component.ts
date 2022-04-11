import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

declare var jQuery:any;
declare var $:any;

import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

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

	constructor(private categoriesService: CategoriesService, 
    private subCategoriesService: SubCategoriesService) { }

	ngOnInit(): void {

		/*=============================================
		Tomamos la data de las categorías
		=============================================*/

		this.categoriesService.getData()
		.subscribe(resp => {
			
			this.categories = resp;

		})

		/*=============================================
		Activamos el efecto toggle en el listado de subcategorías
		=============================================*/


	}


					/*=============================================
					Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorías
					=============================================*/



			

			}
			
		

    