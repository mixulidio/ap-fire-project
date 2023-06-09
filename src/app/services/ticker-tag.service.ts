import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TickerTag } from '../models/ticker-tag.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class TickerTagService extends BaseCrudService<TickerTag>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrlv1}tickerTag`);
  }

  consultaPorTicker(ticker: string): Observable<TickerTag> {
    return this.httpClient.get<TickerTag>(this.apiUrl + "/busca?ticker=" + ticker)
  }

  // listarTags(ticker: string): Observable<TickerTag> {
  //   return this.httpClient.get<TickerTag>(this.apiUrl + "/listar-tags")
  // }

  atualizaOuIncluiSimples(ticker: TickerTag): Observable<TickerTag> {
    return this.httpClient.post<TickerTag>(this.apiUrl + "/atualizaOuIncluiSimples", ticker)
  }
}
