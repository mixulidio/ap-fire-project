import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  protected UrlServiceV1: string = environment.apiUrlv1;

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<Pessoa[]> {
    return this.http
      .get<Pessoa[]>(this.UrlServiceV1 + "pessoas")
    // .pipe(catchError(super.serviceError));
  }
}
