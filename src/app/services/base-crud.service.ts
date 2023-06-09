import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

// Base CRUD rest
export abstract class BaseCrudService<T> {

  constructor(protected httpClient: HttpClient, protected apiUrl: string) { }

  incluir(t: T): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl, t);
  }

  atualizar(id: string, t: T): Observable<T> {
    return this.httpClient.put<T>(this.apiUrl + "/" + id, t, {});
  }

  consultar(id: string): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + "/" + id);
  }

  // listar(): Observable<T[]> {
  //   return this.httpClient.get<T[]>(this.apiUrl)
  // }

  listar(id: string = ''): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiUrl}/${id}`)
  }

  excluir(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + '/' + id);
  }
}
