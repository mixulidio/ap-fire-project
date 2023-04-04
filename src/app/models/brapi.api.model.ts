export interface BrapiModel {
  results: Result[]
  requestedAt: string
}

export interface Result {
  percent?: number
  symbol: string
  shortName: string
  longName: string
  currency: string
  regularMarketPrice: number
  regularMarketDayHigh: number
  regularMarketDayLow: number
  regularMarketDayRange: string
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketTime: string
  marketCap: number
  regularMarketVolume: number
  regularMarketPreviousClose: number
  regularMarketOpen: number
  averageDailyVolume10Day: number
  averageDailyVolume3Month: number
  fiftyTwoWeekLowChange: number
  fiftyTwoWeekLowChangePercent: number
  fiftyTwoWeekRange: string
  fiftyTwoWeekHighChange: number
  fiftyTwoWeekHighChangePercent: number
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  twoHundredDayAverage: number
  twoHundredDayAverageChange: number
  twoHundredDayAverageChangePercent: number
  validRanges: string[]
  historicalDataPrice: HistoricalDataPrice[]
  priceEarnings?: number
  earningsPerShare: number
  logourl: string
}

export interface HistoricalDataPrice {
  date: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface ParamsBrapi {
  range: string,
  interval: string,
  fundamental: boolean
}

export interface StockRoot {
  stocks: StockBrapi[]
}

export interface StockBrapi {
  stock: string
  name: string
  close: number
  change: number
  volume: number
  market_cap: any
  logo: string
  sector: any
}
