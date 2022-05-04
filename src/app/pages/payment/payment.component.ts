import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenService } from '../../services/orden.service';
import { Path } from '../../config';
import { Report } from 'notiflix';


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
    private ordenservice: OrdenService,
    private rutas:Router
  ) { }

  ngOnInit(): void {
    let idorder = this.datorutas.snapshot.paramMap.get('id')
    this.ordenservice.datosorden(idorder).subscribe(res => {
      this.order = res;



      if (this.order[0].puntos > 0 && this.order[0].status == 1) {
        this.ordenservice.archivoggpoints(idorder).subscribe(res=>{
       this.archivoggpoints=res

       this.ordenservice.contestacionggpoints(this.archivoggpoints).subscribe(res=>{
         let respuesta = res


         if (respuesta['SUCCESS'] == 0){

          this.ordenservice.revertirproceso(idorder).subscribe(res=>{
            respuesta = res
            if (respuesta['success']==1) {
              Report.failure(
                'Invercomes Noticia',
                'El servidor de GGpoint no respondio de la manera adecuada, asegurate de tener los puntos y vuelve a generar la orden compra.',
                'Ok',
              )
              this.rutas.navigateByUrl('/')
            }else{
              Report.failure(
                'Invercomes Noticia',
                'Algo salio mal, valida en tu historial si tu orden se genero bajo el numero: '+idorder,
                'Ok',
              )
              this.rutas.navigateByUrl('/')
            }
          },err=>{})

         }else{
           console.log('respuesta es '+ respuesta['SUCCESS']);

         }




       }, err =>{
         console.log(err.error);

       })

        })
      }


    })




    localStorage.removeItem('ggpoints')



  }

}
