import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../services/orden.service';
import { Path } from '../../config';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
public order:any;
path:String = Path.url;
  constructor(
    private datorutas:ActivatedRoute,
    private ordenservice:OrdenService
  ) { }

  ngOnInit(): void {
    let idorder = this.datorutas.snapshot.paramMap.get('id')
    this.ordenservice.datosorden(idorder).subscribe(res=>{
      this.order=res;
      
    })

  localStorage.removeItem('ggpoints')
  
  }

}
