import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'pessoas',
    loadChildren: './pessoas/pessoas.module#PessoasModule'
  },
  {
    path: 'produtos',
    loadChildren: './produtos/produtos.module#ProdutosModule'
  },
  {
    path: 'pedidos',
    loadChildren: './pedidos/pedidos.module#PedidosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
