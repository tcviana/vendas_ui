import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoasService } from '../pessoas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.scss'],
  preserveWhitespaces:false
})
export class PessoasFormComponent implements OnInit {

  formulario: FormGroup;  
  pessoa: Pessoa;
  
  constructor(
    private formBuilder: FormBuilder,
    private service: PessoasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // inicializa form
    this.clearForm();    
    
    this.activatedRoute.params.subscribe(parametro=>{
                
      // preenchimento em caso de edição
      if(parametro["id"] != undefined){
        this.edit(Number(parametro["id"]));
      }
    });   
  }  

  edit(id:number){

    this.service.get(id).subscribe(
      data => {
        this.pessoa = data;
        this.formulario.setValue({
          id: this.pessoa.id,
          nome: this.pessoa.nome,
          cpf: this.pessoa.cpf,
          endereco: this.pessoa.endereco
        })
      },
      err => console.error("Errinho: "+err),
      () => console.log('Pessoa carregada')
    )
  }
  
  clearForm(){
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      cpf: [null, Validators.required],
      endereco: [null]
    });    
  }

  onSubmit(){
    if (this.formulario.valid){
      if (this.formulario.value.id > 0){
        this.put();
      }else{
        this.post();
      }
    }else{
      this.verificaValidacoesForm(this.formulario);
    }          
  }

  post(){
    return this.service.post(this.formulario.value)
    .subscribe(dados =>{
      console.log(dados); 
      // reseta o form
      this.reset();
    },
    (error:any)=>alert('erro'));    
  }

  put(){
    return this.service.put(this.formulario.value)
    .subscribe(dados =>{
      console.log(dados); 
      // volta a consulta
      this.router.navigate(['pessoas']);
    },
    (error:any)=>alert('erro'));    
  }

  verificaValidacoesForm(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = this.formulario.get(campo);
      controle.markAsDirty();
      // recursividade para objetos dentro de objetos
      if (controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }

  reset(){
    this.formulario.reset();
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
