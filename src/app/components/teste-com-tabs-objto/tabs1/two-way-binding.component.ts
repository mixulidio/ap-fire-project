// import { Component, EventEmitter, Input, Output } from '@angular/core';

// // @Component({
// //   selector: 'app-tabs001',
// //   templateUrl: './tabs1.component.html',
// //   styleUrls: ['./tabs1.component.scss']
// // })
// export abstract class TwoWayBindingComponent<T> {
//   // private _value: T;
//   // get value(): T {
//   //   return this._value;
//   // }
//   // set value(value: T) {
//   //   this._value = value;
//   //   this.valueChange.emit(value);
//   // }
//   // valueChange = new EventEmitter<T>();
//   // onValueChanged(value: T) {
//   //   this.value = value;
//   // }
//   private _obj: any;

//   @Input()
//   set obj(valor: any) {
//     this._obj = valor;
//     this.objChange.emit(valor);
//   }
//   @Output() objChange: EventEmitter<any> = new EventEmitter<any>();

//   get obj() {
//     return this._obj;
//   }

//   onValorChanged(event: any) {
//     this.obj = event;
//   }

// }
