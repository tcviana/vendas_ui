import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';

const routes: Routes = [
  { 
    path: '', component: ProdutosListaComponent 
  },
  {
    path: 'formulario', component: ProdutosFormComponent
  },
  {
    path: 'formulario/:id', component: ProdutosFormComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
