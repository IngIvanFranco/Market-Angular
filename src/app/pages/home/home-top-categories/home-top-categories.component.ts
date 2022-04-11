import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';


import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css']
})
export class HomeTopCategoriesComponent implements OnInit {

	
	categories:any;
	path:String = Path.url;

	constructor(private categoriesService: CategoriesService) { }

	ngOnInit(): void {
      this.categoriesService.getData().subscribe(respuesta=>{
        this.categories=respuesta
      })
	}

}
