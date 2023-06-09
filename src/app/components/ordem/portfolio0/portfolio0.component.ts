
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ParamsBrapi } from 'src/app/models/brapi.api.model';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { BrapiApiService } from 'src/app/services/brapi.api.service';
import { BrapiStore } from 'src/app/services/brapi.api.store';
import { OrdemService } from 'src/app/services/ordem.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';

@Component({
  selector: 'app-portfolio0',
  templateUrl: './portfolio0.component.html',
  styleUrls: ['./portfolio0.component.scss']
})
export class Portfolio0Component implements OnInit {

    list: TickerTag[];

    constructor(
      private formBuilder: FormBuilder,
      private elRef: ElementRef,
      private ordemService: OrdemService,
      private tickerTagService: TickerTagService,
      private brapiService: BrapiApiService,
      private brapiStore: BrapiStore,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {
        this.carregarLista()
    }

    private carregarLista(){
      this.tickerTagService.listar().subscribe(a => {
        this.list = a
        this.precoMercado(this.list);
      })
    }

    precoInvestido(item: TickerTag ) {
      if (item.quantidadeAtual && item.precoMedio)
        return item.quantidadeAtual * item.precoMedio
      return null
    }

    precoMercado(itens: TickerTag[]) {
      let params1: ParamsBrapi = {
        range: '1d',
        interval: '1d',
        fundamental: false
      }
      this.brapiService.obterDados(itens.map(a=>a.nome), params1).subscribe(r => {
        r.results.forEach(b=>{
          let item = itens.find(c => c.nome == b.symbol)
          if (item?.quantidadeAtual && b.regularMarketPrice && item.precoMedio) {
            item.precoAtual = b.regularMarketPrice * item.quantidadeAtual
            item.rentabilitadeAtual = ((b.regularMarketPrice - item.precoMedio) / item.precoMedio)
            item.cotacaoAtual = b.regularMarketPrice
          }
        })
      })
    }

  }

