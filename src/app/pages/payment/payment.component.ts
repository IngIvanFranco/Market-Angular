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
  public order: any;
  path: String = Path.url;
  archivoggpoints :any
  constructor(
    private datorutas: ActivatedRoute,
    private ordenservice: OrdenService
  ) { }

  ngOnInit(): void {
    let idorder = this.datorutas.snapshot.paramMap.get('id')
    this.ordenservice.datosorden(idorder).subscribe(res => {
      this.order = res;


      if (this.order[0].puntos > 0) {
        this.ordenservice.archivoggpoints(idorder).subscribe(res=>{
       this.archivoggpoints=res

       this.ordenservice.contestacionggpoints(this.archivoggpoints)

        })
      }


    })




    localStorage.removeItem('ggpoints')



  }

}
