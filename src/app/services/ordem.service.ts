import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ordem } from '../models/ordem.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemService extends BaseCrudService<Ordem>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrlv1}ordem`);
  }

  listarPorTicket(ticker : string): Observable<Ordem[]> {
    return this.httpClient.get<Ordem[]>(this.apiUrl + "/busca?ticker=" + ticker)
  }

  incluirOrdens(t: Ordem[]): Observable<Ordem[]> {
    return this.httpClient.post<Ordem[]>(`${environment.apiUrlv1}ordens`, t);
  }
}
