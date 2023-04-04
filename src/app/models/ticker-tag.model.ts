export interface TickerTag {
  _id?: string
  nome: string
  tags?: string[]
  precoMedio?: number
  showEdit?: boolean
  modified?: boolean
  originalTags?: string[]
}
