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
    this.ordenservice.datosorden(idorder).subscribe(res => {//  captura el id de la orden q viene por la ruta y consulta su informacion
      this.order = res;

      if (this.order[0].puntos > 0 && this.order[0].status == 1) {// valida si la orden esta pendiente de pago y redimio puntos
        this.ordenservice.archivoggpoints(idorder).subscribe(res=>{// prepara el archivo a enviar al ws de ganagana e informar los puntos q redimio
       this.archivoggpoints=res
       this.ordenservice.contestacionggpoints(this.archivoggpoints).subscribe(res=>{//envia el archivo al ws de ganagana
         let respuesta = res


         if (respuesta['SUCCESS'] == 0){// si el servidor responde con el 0 automaticamente se revierte toda la operacion

          this.ordenservice.revertirproceso(idorder).subscribe(res=>{// envia el id de la orden para revertirla
            respuesta = res
            if (respuesta['success']==1) {// si se revierte la orden de manera adecuada informaremos al cliente que algo salio mal
              Report.failure(
                'Invercomes Noticia',
                'El servidor de GGpoint no respondio de la manera adecuada, asegurate de tener los puntos y vuelve a generar la orden compra.',
                'Ok',
              )
              this.rutas.navigateByUrl('/')
            }else{// si no se revierte la operacion le diremos al clioente q valide si se registro o no la operacion
              Report.failure(
                'Invercomes Noticia',
                'Algo salio mal, valida en tu historial si tu orden se genero bajo el numero: '+idorder,
                'Ok',
              )
              this.rutas.navigateByUrl('/')
            }
          },err=>{})

         }else{// si el servidor no contesta con el 0 el proceso continua comun y corriente
           console.log('respuesta es '+ respuesta['SUCCESS']);

         }




       }, err =>{
         console.log(err.error);//valida si hay errores

       })

        })
      }


    })




    localStorage.removeItem('ggpoints')// elimina los ggpoints que estan en el localstorage



  }

}
