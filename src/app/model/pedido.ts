import { Pessoa } from './pessoa';
import { PedidoItens } from './pedidoItens';

export interface Pedido{
    id:number;
    pessoa: Pessoa;
    pedidoItens: PedidoItens;
    
}