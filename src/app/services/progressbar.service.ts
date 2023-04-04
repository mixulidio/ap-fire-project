import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressbarService {

  private subject = new BehaviorSubject<string>('determinate');

  mode$ = this.subject.asObservable()

  constructor() { }

  iniciar() {
    this.subject.next('indeterminate')
    //this.mode = 'indeterminate'; // muda o modo para indeterminado
  }

  parar() {
    this.subject.next('determinate')

   // this.mode = 'determinate'; // muda o modo para determinado
  }

}
