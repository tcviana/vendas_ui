import { Produto } from '../../../../app-site/src/app/services/produto';

export interface PedidoItens{

    id:number,
    quantidade:number,
    produto:Produto
}