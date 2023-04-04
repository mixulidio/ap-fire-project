import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventShareService {
  constructor() { }

//1
  // private subject = new BehaviorSubject<any>(null);
  // data$ = this.subject.asObservable()
  // setData(newData: any) {
  //   this.subject.next(newData);
  // }
//2
  // dataChanged = new EventEmitter<{ eventName: string, data: any }>();
  // setDataEventEmitter(eventName: string, newData: any) {
  //   this.dataChanged.emit({ eventName, data: newData });
  // }

  // 3  =  this.eventShareService.subscribe( "nameChanged", this.evento)
  // private events: { [name: string]: EventEmitter<any> } = {};
  // subscribe(name: string, handler: any) {
  //   if (!this.events[name]) {
  //     this.events[name] = new EventEmitter();
  //   }
  //   return this.events[name].subscribe(handler);
  // }
  // unsubscribe(name: string) {
  //   if (this.events[name]) {
  //     this.events[name].unsubscribe();
  //   }
  // }
  // emit(name: string, data?: any) {
  //   if (this.events[name]) {
  //     this.events[name].emit(data);
  //   }
  // }


}
