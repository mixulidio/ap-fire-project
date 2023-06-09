import { Component, OnDestroy, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-basic',
  templateUrl: './menu-basic.component.html',
  styleUrls: ['./menu-basic.component.scss']
})
export class MenuBasicComponent implements OnInit, OnDestroy {

  items: MegaMenuItem[];

  constructor() { }

  ngOnInit() {
      this.items = [
          {label: 'brapi1',  routerLink:['brapi1'] },
          {label: 'Ordem',  routerLink:['ordem'] },
          {label: 'Listar',  routerLink:['ordem-list'] },
          {label: 'Tickers e Tags',  routerLink:['ticker-tag-list']},
          {label: 'Portfólio',  routerLink:['portfolio0']},
          {label: 'Carteiras',  routerLink:['carteiras']},
      ];
  }

  ngOnDestroy(): void {
    console.log("Menu DESTROYYYYYYYYY");

  }
}
