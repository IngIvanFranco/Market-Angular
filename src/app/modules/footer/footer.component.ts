import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

declare var jQuery:any;
declare var $:any;

import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	path:String = Path.url;	
	categories:Object = null;
	render:Boolean = true;
	categoriesList:Array<any> = [];

	constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

	ngOnInit(): void {

	
	}
}