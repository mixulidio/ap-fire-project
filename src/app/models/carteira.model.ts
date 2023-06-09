import { TickerTag } from "./ticker-tag.model";

export interface Carteira {
  _id?: string;
  nomeCarteira: string;
}

export interface CarteiraTicker {
  _id?: string;
  carteira: Carteira
  tickerTag: TickerTag
  peso?: number
}
