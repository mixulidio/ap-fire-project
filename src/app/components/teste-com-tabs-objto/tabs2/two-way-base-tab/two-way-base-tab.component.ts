import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-two-way-base-tab',
  templateUrl: './two-way-base-tab.component.html',
  styleUrls: ['./two-way-base-tab.component.scss']
})
export class TwoWayBaseTabComponent<T> {

  private _obj: T;

  @Input()
  set obj(valor: T) {
    this._obj = valor;
    this.objChange.emit(valor);
  }

  @Output()
  objChange: EventEmitter<T> = new EventEmitter<T>();

  get obj() {
    return this._obj;
  }

  onValorChanged(event: any) {
    this.obj = event;
  }

  constructor() { }

  getDadosForm(formValue:any): T {
    const obj: T = Object.assign({}, formValue);
    return obj;
  }
}
