import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';



@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.css']
})
export class HomePromotionsComponent implements OnInit {

	path:String = Path.url;

  	constructor() { }

  	ngOnInit(): void {

	}

}
