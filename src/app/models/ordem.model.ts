export interface Ordem {
  _id?: string,
  ticker: string,
  quantidade: number,
  valor: number,
  operacao: Operacao,
  emoluentos?: number,
  liquidacao?: number,
  data: any,
  tags? : string[],
  precoMedio?: number,
  quantidadeAtual?: number,
}

export enum Operacao {
  Compra = 'C',
  Venda = 'V'
}
