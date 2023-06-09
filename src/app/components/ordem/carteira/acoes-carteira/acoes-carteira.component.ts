import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamsBrapi } from 'src/app/models/brapi.api.model';
import { CarteiraTicker } from 'src/app/models/carteira.model';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { BrapiApiService } from 'src/app/services/brapi.api.service';
import { CarteiraTickerService } from 'src/app/services/carteira-ticker.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';

@Component({
  selector: 'app-acoes-carteira',
  templateUrl: './acoes-carteira.component.html',
  styleUrls: ['./acoes-carteira.component.scss']
})
export class AcoesCarteiraComponent implements OnInit {

  id: string;
  list: CarteiraTicker[]
  display = false
  selected: any = {}
  nomeCarteira: string
  isEditando: boolean = false;
  valorOriginal: string;

  @ViewChild('inputNomeCarteira', { static: false }) inputNomeCarteira: ElementRef;


  constructor(private route: ActivatedRoute,
    // private carteiraService: CarteiraService,
    private carteiraTickerService: CarteiraTickerService,
    private tickerTagService: TickerTagService,
    private renderer: Renderer2,
    private brapiService: BrapiApiService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    // TODO tem que pegar o nome de uma melhor forma
    this.nomeCarteira = this.route.snapshot.params.nomeCarteira;
    this.loadList();
  }

  private loadModal(idSelecionado: any = null) {
    // TODO melhorar - toda vez que abre a modal, carrega esta lista,
    this.selected.tickersList = []
    this.tickerTagService.listar().subscribe(res => {
      this.selected.tickersList = res;
    })
  }

  private loadList() {
    this.carteiraTickerService.listar(this.id).subscribe(r => {
      this.list = r
      this.precoMercado(this.list);
    })
  }

  precoMercado(carteira: CarteiraTicker[]) {
    const itens = carteira.map(a=> {
      a.tickerTag.carteiraTickerAux = a
      return a.tickerTag})
    let params1: ParamsBrapi = {
      range: '1d',
      interval: '1d',
      fundamental: false
    }
    const somaPesos = this.list.reduce((acumulador, elemento) => acumulador + (elemento.peso || 0), 0);
    this.brapiService.obterDados(itens.map(a=>a.nome), params1).subscribe(r => {
      r.results.forEach(b=>{
        let item = itens.find(c => c.nome == b.symbol)
        if (item?.quantidadeAtual && b.regularMarketPrice && item.precoMedio) {
          item.precoAtual = b.regularMarketPrice * item.quantidadeAtual
          item.rentabilitadeAtual = ((b.regularMarketPrice - item.precoMedio) / item.precoMedio)
          item.cotacaoAtual = b.regularMarketPrice
          item.percentualDesejadoAtual = (item.carteiraTickerAux?.peso ?? 0) * 100 / somaPesos
        }
      })
      const somaValor = this.list.reduce((acumulador, elemento) => acumulador + (elemento.tickerTag.precoAtual || 0), 0);
      r.results.forEach(b=>{
        let item = itens.find(c => c.nome == b.symbol)
        if (item?.quantidadeAtual && b.regularMarketPrice && item.precoMedio && item.precoAtual) {
          item.percentualAtual = item.precoAtual * 100 / somaValor
        }
      })
    })
  }

  adicionar() {
    this.selected = {}
    this.loadModal();
    this.display = true;
  }

  showDialog(item: any) {
    this.selected = item
    this.selected.idTicker = item.tickerTag._id
    this.loadModal(item.tickerTag._id);
    this.display = true;
  }

  closeDialog(obj: any) {
    this.incluir(obj);
    this.display = false;
    this.selected = {}
  }

  private incluir(obj: any) {
    obj.idcart = this.id;
    delete obj.tickersList
    this.carteiraTickerService.incluir(obj).subscribe(r => {
      this.loadList();
    })
  }

  iniciaEdicaoNomeCarteira() {
    this.isEditando = true;
    this.valorOriginal = this.nomeCarteira;
    setTimeout(() => {
      this.renderer.selectRootElement(this.inputNomeCarteira.nativeElement).focus();
    }, 0);
  }

  salvaNomeCarteira() {
    // TODO atualiza nome carteira
    console.log(this.nomeCarteira);
    this.isEditando = false;
  }

  cancelarEdicao() {
    this.isEditando = false;
    this.nomeCarteira = this.valorOriginal;
    this.selected = {}
  }

  excluirAcaoDaacarteira(item: any) {
    this.carteiraTickerService.excluir(item._id).subscribe(r => {
      this.display = false;
      this.selected = {}
    });
  }

  precoInvestido(item: TickerTag ) {
    if (item.quantidadeAtual && item.precoMedio)
      return item.quantidadeAtual * item.precoMedio
    return null
  }
}
