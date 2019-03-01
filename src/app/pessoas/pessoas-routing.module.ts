import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasListaComponent } from './pessoas-lista/pessoas-lista.component';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';

const routes: Routes = [
  { 
    path: '', component: PessoasListaComponent 
  },
  {
    path: 'formulario', component: PessoasFormComponent
  },
  {
    path: 'formulario/:id', component: PessoasFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
