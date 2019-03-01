import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido } from '../model/pedido';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private uri = `${environment.uri}pedido/`;
  private error$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }  

  list():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.uri)
      .pipe(
        tap(console.log)
      );
  }

  get(id:number):Observable<Pedido>{
    return this.http.get<Pedido>(this.uri+id)
      .pipe(
        tap(console.log)
      )
  }

  post(pedido:Pedido):Observable<Pedido>{
    return this.http.post<Pedido>(this.uri,pedido)
      .pipe(
        tap(console.log),
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();

        })
      );
  }

  put(pedido:Pedido):Observable<Pedido>{
    return this.http.put<Pedido>(this.uri,pedido)
      .pipe(
        tap(console.log),
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();

        })
      );
  }  
}
