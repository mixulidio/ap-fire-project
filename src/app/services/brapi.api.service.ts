import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrapiModel, ParamsBrapi, StockBrapi, StockRoot } from '../models/brapi.api.model';
import { BrapiStore } from './brapi.api.store';
import { HttpEvent, HttpEventType } from '@angular/common/http'; // Importar o HttpEventType

@Injectable({
  providedIn: 'root'
})
export class BrapiApiService {

  protected urlApi: string = environment.apiBrapi;

  constructor(private http: HttpClient,
    private store: BrapiStore,
    ) { }

  obterDados(tickers: string[], params: ParamsBrapi): Observable<BrapiModel> {
    return this.http
      .get<BrapiModel>(`${this.urlApi}/quote/${tickers.toString()}`, { params: { ...params }})
  }

  getStockList$: Observable<StockRoot> =
    this.http.get<StockRoot>(`${this.urlApi}/quote/list`)
    .pipe(
      tap(next => {
        this.store.set('stockList', next)
        localStorage.setItem('stocks', JSON.stringify(next))
        console.log(next, "next")
    })
    )

    getStockListStore(): Observable<StockRoot> {
      const stoks = localStorage.getItem('stocks')
      if(!stoks){
        return this.getStockList$
      } else {
         return of(JSON.parse(stoks))
      }
    }


}

