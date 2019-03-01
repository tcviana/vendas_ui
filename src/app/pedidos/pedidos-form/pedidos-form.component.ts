import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from '../pedidos.service';
import { Observable, Subject, empty } from 'rxjs';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/model/pedido';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss'],
  preserveWhitespaces: true
})
export class PedidosFormComponent implements OnInit {

  formulario: FormGroup;
  //pessoas$: Observable<Pessoa[]>;
  //error$ = new Subject<boolean>();
  pedido: Pedido;

  constructor(
    private formBuilder: FormBuilder,
    private service: PedidosService,
    //private servicePessoa: PessoasService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clearForm();
    //this.getPessoas();

    this.activatedRoute.params.subscribe(parametro => {
      if (parametro["id"] != undefined) {
        this.edit(parametro["id"]);
      }
    });
  }

  clearForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      pessoa: this.formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        endereco: [null],
        cpf: [null],
        ativo: [null]
      }),
      pedidoItens: this.formBuilder.group({
        id: [null],
        quantidade: [null, Validators.required],
        produto: this.formBuilder.group({
          id: [null],
          nome: [null, Validators.required],
          valor: [0]
        })
      })
    });

    /*
    this.formulario = this.formBuilder.group({
      id: [this.pedido.id],
      pessoa: this.formBuilder.group({
        id: [this.pedido.pessoa.id],
        nome: [this.pedido.pessoa.nome, Validators.required],
        endereco: [this.pedido.pessoa.endereco],
        cpf: [this.pedido.pessoa.cpf],
        ativo: [this.pedido.pessoa.ativo]
      }),
      pedidoItens: this.formBuilder.group({
        id: [this.pedido.pedidoItens.id],
        quantidade: [this.pedido.pedidoItens.quantidade, Validators.required],
        produto: this.formBuilder.group({
          id: [this.pedido.pedidoItens.produto.id],
          nome: [this.pedido.pedidoItens.produto.nome, Validators.required],
          valor: [this.pedido.pedidoItens.produto.id]
        })
      })
    });
    */
  }

  edit(id: number) {

    this.service.get(id).subscribe(
      data => {
        this.pedido = data;
        this.formulario.setValue({
          id: this.pedido.id,
          pessoa: this.pedido.pessoa,
          pedidoItens: this.pedido.pedidoItens
        })
      },
      err => console.error(err),
      () => console.log("Pedido carregado com sucesso.")
    );

    //console.log(this.formulario.value.id);
  }

  getPessoas() {
    //this.pessoas$ = this.servicePessoa.list()
    //.pipe(
    //catchError(error => {
    //console.error(error);
    //this.error$.next(true);
    ///return empty();
    //})
    //); 
  }

  reset() {
    this.formulario.reset();
  }

  onSubmit() {
    if (this.formulario.valid) {
      if (this.formulario.value.id > 0) {
        this.put();
      } else {
        this.post();
      }
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  put() {
    this.service.put(this.formulario.value)
      .subscribe(dados => {
        console.log(dados)
      });
  }

  post() {
    console.log(this.formulario.value);
    this.service.post(this.formulario.value)
      .subscribe(dados => {
        console.log(dados)
      });
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = this.formulario.get(campo);
      controle.markAsDirty();
      // recursividade para objetos dentro de objetos
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }
}