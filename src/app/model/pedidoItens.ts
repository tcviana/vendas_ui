import { Produto } from './produto';

export interface PedidoItens {

    id: number;
    quantidade: number;
    produto: Produto;
}
