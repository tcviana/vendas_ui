import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Produto } from 'src/app/model/produto';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.scss'],
  preserveWhitespaces:true
})
export class ProdutosListaComponent implements OnInit {

  produtos$: Observable<Produto[]>;
  error$ = new Subject<boolean>();

  constructor(private service:ProdutosService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh(){
    this.produtos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    ); 
  }  

  delete(id:number){
    this.service.delete(id)
      .subscribe(res => {
        console.log(res);
        this.onRefresh();
      })
  }

}
