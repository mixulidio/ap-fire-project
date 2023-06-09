import { Operacao, Ordem } from "src/app/models/ordem.model";

export function calculaMedia(ordens: Ordem[]): { precoMedio: number, somaTotal: number } {
  let somaQtd = 0
  let somaVal = 0
  let media = 0;
  ordens.forEach(o => {
    if (o.operacao == Operacao.Compra) {
      somaVal += (o.quantidade * o.valor) + ((o.emoluentos ?? 0) + (o.liquidacao ?? 0))
      somaQtd += o.quantidade
    } else {
      media = somaVal / somaQtd
      somaVal -= media * o.quantidade
      somaQtd -= o.quantidade
    }
  })
  if (somaQtd == 0) {
    return { precoMedio: 0, somaTotal: 0}
  }
  const precoMedio = somaVal / somaQtd
  return { precoMedio, somaTotal: somaQtd}
}
