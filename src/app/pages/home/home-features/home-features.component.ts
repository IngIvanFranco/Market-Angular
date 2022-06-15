import { Component, OnInit } from '@angular/core';
import {Path} from '../../../../app/config.js'

@Component({
  selector: 'app-home-features',
  templateUrl: './home-features.component.html',
  styleUrls: ['./home-features.component.css']
})
export class HomeFeaturesComponent implements OnInit {
path:string =Path.url
  constructor() { }

  ngOnInit(): void {
  
  }
 

}
