import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasListaComponent } from './pessoas-lista/pessoas-lista.component';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PessoasListaComponent, 
    PessoasFormComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PessoasModule { }
