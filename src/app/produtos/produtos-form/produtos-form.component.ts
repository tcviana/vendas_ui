import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit {

  formulario: FormGroup;
  produto: Produto;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutosService,
    private activetedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clearForm();

    this.activetedRoute.params.subscribe(param => {
      if (param["id"] != undefined) {
        this.edit(param["id"]);
      }
    })
  }

  clearForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      valor: [0]
    });
  }

  edit(id: number) {
    this.service.get(id)
      .subscribe(data => {
        this.produto = data;
        this.formulario.setValue({
          id: this.produto.id,
          nome: this.produto.nome,
          valor: this.produto.valor
        })
      },
        erro => console.error(erro),
        () => "Produto carregado"
      );
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

  post() {
    return this.service.post(this.formulario.value)
      .subscribe(dados => {
        console.log(dados);
      });
  }

  put() {
    return this.service.put(this.formulario.value)
      .subscribe(dados => {
        console.log(dados);
      });
  }

  reset() {
    this.formulario.reset();
  }

  verificaValidacoesForm(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = this.formulario.get(campo);
      controle.markAsDirty();

      // recursividade para pegar sub objects
      if (controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    })
  }

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }  

}
