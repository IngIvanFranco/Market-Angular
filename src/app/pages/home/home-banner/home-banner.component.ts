import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';




@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

	path:String = Path.url;	


	constructor() { }

	ngOnInit(): void {

	}

}
