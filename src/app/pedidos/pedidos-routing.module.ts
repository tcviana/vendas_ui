import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';

const routes: Routes = [
  {
    path: '', component: PedidosListaComponent
  },
  {
    path: 'formulario', component: PedidosFormComponent
  },
  {
    path: 'formulario/:id', component: PedidosFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
