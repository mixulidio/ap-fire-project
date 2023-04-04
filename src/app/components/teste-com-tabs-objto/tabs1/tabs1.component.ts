import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TickerTag } from 'src/app/models/ticker-tag.model';

@Component({
  selector: 'app-tabs1',
  templateUrl: './tabs1.component.html',
  styleUrls: ['./tabs1.component.scss']
})
export class Tabs1Component implements OnInit {

  private _obj: TickerTag;

  @Input()
  set obj(valor: TickerTag) {
    this._obj = valor;
    this.objChange.emit(valor);
  }

  @Output()
  objChange: EventEmitter<TickerTag> = new EventEmitter<TickerTag>();

  get obj() {
    return this._obj;
  }

  onValorChanged(event: any) {
    this.obj.nome = event;
  }

  ngAfterViewInit(){

  }

  constructor() {
    this.obj = { nome: 'paulo pais'}
  }

  ngOnInit(): void {
  }

}
