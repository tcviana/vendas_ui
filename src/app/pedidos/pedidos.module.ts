import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PedidosListaComponent, PedidosFormComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PedidosModule { }
