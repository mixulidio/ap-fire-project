import { CarteiraTicker } from "./carteira.model"

  export interface TickerTag {
  _id?: string
  nome: string
  tags?: string[]
  precoMedio?: number
  showEdit?: boolean
  modified?: boolean
  originalTags?: string[]
  quantidadeAtual?: number
  precoAtual?: number
  rentabilitadeAtual?: number
  cotacaoAtual?: number
  percentualDesejadoAtual?: number
  percentualAtual?: number
  carteiraTickerAux?: CarteiraTicker
}
