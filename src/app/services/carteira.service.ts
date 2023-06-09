import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carteira } from '../models/carteira.model';
import { BaseCrudService } from './base-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService extends BaseCrudService<Carteira> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrlv1}carteira`);
  }

}
