import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

	path:String = Path.url;
	top_banner:Object = null;


	preload:Boolean = false;

	constructor(private productsService: ProductsService ) { }

	ngOnInit(): void {

		this.preload = true;







	}

}
