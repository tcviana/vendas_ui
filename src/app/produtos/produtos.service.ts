import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../model/produto';
import { tap,delay, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, Subject, empty } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly uri = `${environment.uri}produto/`;
  error$ = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Produto[]>(this.uri)
      .pipe(
        //delay(2000),
        tap(console.log)
      );
  }

  get(id:number):Observable<Produto>{
    return this.http.get<Produto>(this.uri+id,httpOptions)
      .pipe(
        tap(console.log)
      );
  }

  put(produto:Produto):Observable<Produto>{
    return this.http.put<Produto>(this.uri,JSON.stringify(produto),httpOptions);
  }

  post(produto:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.uri,JSON.stringify(produto),httpOptions);
  } 
  
  delete(id:number):Observable<Produto>{
    
    return this.http.delete<Produto>(this.uri+id)
      .pipe(
        tap(console.log),
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        })        
      )
  }
}
