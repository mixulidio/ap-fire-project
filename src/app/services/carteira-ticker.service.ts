import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarteiraTicker } from '../models/carteira.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CarteiraTickerService extends BaseCrudService<CarteiraTicker> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrlv1}carteiraTicker`);
  }
}
