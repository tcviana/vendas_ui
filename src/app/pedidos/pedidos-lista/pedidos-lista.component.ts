import { Component, OnInit } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { Pedido } from 'src/app/model/pedido';
import { PedidosService } from '../pedidos.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.scss'],
  preserveWhitespaces: true
})
export class PedidosListaComponent implements OnInit {

  pedidos$: Observable<Pedido[]>;
  error$ = new Subject<boolean>();

  constructor(private service: PedidosService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.pedidos$ = this.service.list()
      .pipe(
        catchError(erro => {
          console.error(erro);
          this.error$.next(true);
          return empty();
        })
      );
  }

  delete(id:number){
    console.log(id);
    //this.service.delete(id);
  }

}
