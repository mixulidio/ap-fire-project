import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { StockBrapi, StockRoot } from "../models/brapi.api.model";

const stk: StockRoot = {
  stocks: []
}

export class BrapiStore {

  private subject = new BehaviorSubject<StockRoot>(stk);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  public getStocksList(): Observable<StockBrapi[]> {
    return this.store.pipe(map(stor => stor.stocks));
  }

  set(name: string, stk: StockRoot) {
    this.subject.next(
      stk
    )
  }

  setRuimNaoFunciona(name: string, stk: StockRoot) {
    this.subject.next({
      ...this.value, [name]: stk
    })
  }
// teste 2
  public getDada(): Observable<StockRoot> {
    return this.subject.asObservable();
  }

  setData(stk : StockRoot){
    this.subject.next(stk)
  }

}
