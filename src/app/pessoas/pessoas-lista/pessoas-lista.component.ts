import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';
import { Pessoa } from 'src/app/model/pessoa';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/public_api';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-pessoas-lista',
  templateUrl: './pessoas-lista.component.html',
  styleUrls: ['./pessoas-lista.component.scss'],
  preserveWhitespaces: true // mantem espaçamento entre os botões
})
export class PessoasListaComponent implements OnInit {

  //pessoas:Pessoa[];

  pessoas$: Observable<Pessoa[]>;
  error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef;

  constructor(
    private service:PessoasService,
    private router: Router) { }
    //private modalService: BsModalService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh(){
    this.pessoas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    ); 
  }

  delete(id:number){
    console.log("delete id: "+id);
    return this.service.delete(id)
      .subscribe(res => {
        console.log(res);
        this.onRefresh();
      });
  }

  edit(id:number){
    console.log(id);
    this.router.navigate(["/pessoas/formulario",id]); 
  }

  /*
  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar, tente novamente mais tarde.';
  }
  */
}
