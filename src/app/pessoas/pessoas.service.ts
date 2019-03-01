import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators'
import { Pessoa } from '../model/pessoa';
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
export class PessoasService {

  readonly uri:string= `${environment.uri}pessoa/`;
  error$ = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  list():Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.uri)   
      .pipe(
        tap(console.log)
      );
  }

  put(pessoa:Pessoa):Observable<Pessoa>{
    return this.http.put<Pessoa>(this.uri,JSON.stringify(pessoa),httpOptions);
  }

  post(pessoa:Pessoa):Observable<Pessoa>{
    return this.http.post<Pessoa>(this.uri,JSON.stringify(pessoa),httpOptions);
  }  

  delete(id:number):Observable<Pessoa>{

    return this.http.delete<Pessoa>(this.uri+id)
      .pipe(
        tap(console.log),
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();        
        })
      );
  }

  get(id:number):Observable<Pessoa>{
    
    return this.http.get<Pessoa>(this.uri+id)
      .pipe(
        tap(console.log)
      );
  }
}
