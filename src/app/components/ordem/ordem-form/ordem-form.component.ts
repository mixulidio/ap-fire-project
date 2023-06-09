import { formatDate } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Observable, Subscription } from 'rxjs';
import { ParamsBrapi, StockBrapi } from 'src/app/models/brapi.api.model';
import { Operacao, Ordem } from 'src/app/models/ordem.model';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { BrapiApiService } from 'src/app/services/brapi.api.service';
import { BrapiStore } from 'src/app/services/brapi.api.store';
import { OrdemService } from 'src/app/services/ordem.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';
import { calculaMedia } from '../funcoes/preco-medio.function';


@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.scss'],
})
export class OrdemFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  ordem: Ordem;

  operacoes: any[]

  tickerSuggestions: any[]

  //stockListLocal: StockBrapi[] = []
  stockListLocal: string[] = []
  stockList$: Observable<StockBrapi[]>
  subscription: Subscription;

  autoComplete: any;
  precoMedio: any;
  precoAtual: any;
  precoTotal: any;

  taxaLiquidacao: number
  emolumentos: number
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private elRef: ElementRef,
    private ordemService: OrdemService,
    private tickerTagService: TickerTagService,
    private brapiService: BrapiApiService,
    private brapiStore: BrapiStore,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {

    this.operacoes = [{ label: 'Compra', value: 'C' }, { label: 'Venda', value: 'V' }];

    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      _id: [],
      ticker: [null, Validators.required],
      quantidade: [null, Validators.required],
      valor: [null, Validators.required],
      operacao: ['C', Validators.required],
      emoluentos: [],
      liquidacao: [],
      data: [new Date(), Validators.required],
      tags: [],
      precoMedio: [null]
    });
  }

  ngOnInit(): void {
    //this.stockList$ = this.brapiStore.getStocksList()
    //this.subscription = this.brapiService.getStockList$.subscribe() // <--- esse aqui tem ver um lugar

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id){
      this.ordemService.consultar(this.id).subscribe(or => {
        this.form.patchValue(or)
        //const dataFormatada = formatDate(or.data, 'dd/MM/yyyy', 'en-US');
        //this.form.patchValue({data: dataFormatada});
        this.form.patchValue({data: new Date(or.data)});
        this.blurAtivo();
        this.calcularTotal(or);
      })
    }

    this.subscription = (
      this.brapiService.getStockListStore()
        .pipe(
          map(a => a.stocks.filter(c => !c.stock.endsWith('F')).map(s => s.stock))
        )
        .subscribe(b => {
          this.stockListLocal = b
        })
    )

    this.autoComplete = document.querySelector('p-autoComplete');
    this.autoComplete.filter = (value: string) => {
      return value.toUpperCase();
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDadosForm(): Ordem {
    const obj: Ordem = Object.assign({}, this.form.value);
    return obj;
  }

  recalculaPrecoMedioTodaBase() {
    //TODO Mover para o back
    this.tickerTagService.listar().subscribe(a =>{
      a.forEach(tk => {
        var media : number = 0
        this.ordemService.listarPorTicket(tk.nome).subscribe(o =>{
          const calc = calculaMedia(o)
          tk.precoMedio = calc.precoMedio
          tk.quantidadeAtual = calc.somaTotal
          this.tickerTagService.atualizaOuIncluiSimples(tk).subscribe(b => {
            console.log(b, 'ok');
          })
        })
      })
    })

  }

  submeter() {
    if (this.form.valid) {
      const obj: Ordem = this.getDadosForm();
      var media: number = 0
      this.ordemService.listarPorTicket(obj.ticker).subscribe(o => {
        if(this.id){
          const i = o.findIndex( a => a._id == this.id)
          o[i] = obj
        } else {
          o.push(obj)
        }
        const calc = calculaMedia(o)
        media = calc.precoMedio
        const quantidadeAtual = calc.somaTotal
        obj.quantidadeAtual = quantidadeAtual
        if (media && media > 0) {
          this.form.controls.precoMedio.setValue(media)
          obj.precoMedio = media
        } else {
          this.form.controls.precoMedio.setValue(null)
          obj.precoMedio = 0
        }

        if(this.id){
          //obj.data = parse(obj.data.toISOString(), 'dd/MM/yyyy', new Date());
          // obj.data = formatDate(obj.data, 'dd/MM/yyyy', 'en-US');
          // obj.data = new Date(obj.data)
          this.ordemService.atualizar(this.id, obj).subscribe({
            next: this.salvo.bind(this),
            error: this.lancarErro.bind(this)
          });
        } else {
          this.ordemService.incluir(obj).subscribe({
            next: this.salvo.bind(this),
            error: this.lancarErro.bind(this)
          });
        }
      })

    } else {
      Object.keys(this.form.controls).forEach(field => {
        this.form.get(field)?.markAsDirty()
      });
    }
  }

  salvo(res: Ordem) {
    this.messageService.add({ severity: 'success', summary: 'Mensagem', detail: "Salvo", life: 1200 });
    this.form.reset();
    this.initForm();
    const input = document.getElementById("data") as HTMLElement
    input.blur();
    input.focus();

    console.log("TODO foco");
    this.limparTela();
  }

  lancarErro(error: any) {
    console.error(error)
    alert(error.message)
    // TODO toast
  }

  onKeyDownChips(event: KeyboardEvent) {
    if (event.key === ";" || event.key == ' ') {
      event.preventDefault();
      const element = event.target as HTMLElement;
      element.blur();
      element.focus();
    }
  }

  blurAtivo() {
    const obj: Ordem = this.getDadosForm();
    const tic: string = obj.ticker?.toUpperCase()

    if (tic && tic.length >= 5) {
      this.tickerTagService.consultaPorTicker(tic.toUpperCase()).subscribe({
        next: this.setResultConsultaTickerTag
      })

      // a média está buscando no setResultConsultaTickerTag
      // this.ordemService.listarPorTicket(tic.toUpperCase()).subscribe(b => {
      //   console.log(calculaMedia(b), "media no onblur");
      // })

      let params1: ParamsBrapi = {
        range: '1d',
        interval: '1d',
        fundamental: false
      }
      this.brapiService.obterDados([tic], params1).subscribe(r => {
        this.precoAtual = r.results.map(a => a.regularMarketPrice).shift()
        if (r.results[0].shortName.toUpperCase().includes("FII") &&
            this.precoMedio == null &&
            obj.tags == null) {
              this.form.controls.tags.setValue(["FII"])
        }
      })
    } else {
      this.limparTela();
    }
  }

  private limparTela(){
    this.form.controls.tags.setValue(null)
    this.form.controls.precoMedio.setValue(null)
    this.precoMedio = null
    this.precoAtual = null
    this.precoTotal = null
    this.id = null
  }

  setResultConsultaTickerTag = (res: TickerTag) => {
    if (!res) return;
    this.form.controls.tags.setValue(res?.tags)
    if (res.precoMedio) {
      this.precoMedio = res.precoMedio
    } else {
      this.precoMedio = null
    }
  }

  filterCountry(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.stockListLocal.length; i++) {
      let stock = this.stockListLocal[i];
      if (stock.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(stock);
      }
    }
    this.tickerSuggestions = filtered;
  }

  onSelectAutocomplete(evt: any) {

  }


  // TODO DAYTRADE
  calcularTaxasNormais() {
    const obj: Ordem = this.getDadosForm();
    if (obj.quantidade && obj.valor) {
      const val = obj.quantidade * obj.valor
      this.taxaLiquidacao = val * 0.000250 // 000275
      this.emolumentos = val * 0.00005
      const partLiquida = this.taxaLiquidacao.toFixed(8).split('.');
      const partLiquidaDecimal = partLiquida[1]?.substring(0, 2) || 0;
      const resultLiquidacao = `${partLiquida[0]}.${partLiquidaDecimal}`;
      if (this.emolumentos > 0.009) {
        this.form.controls.emoluentos.setValue((this.emolumentos).toFixed(2))
        this.form.controls.liquidacao.setValue(resultLiquidacao)
      } else {
        this.form.controls.emoluentos.setValue(0)
        this.form.controls.liquidacao.setValue((this.taxaLiquidacao).toFixed(2))
        this.form.controls.liquidacao.setValue(resultLiquidacao)
        //  Math.round( this.taxaLiquidacao * 100 ) / 100 // Math.ceil( this.emolumentos * 100 ) / 100
      }
      if (obj.operacao == Operacao.Compra){
        this.precoTotal = val + this.emolumentos + Number(resultLiquidacao);
      } else if (obj.operacao == Operacao.Venda){
        this.precoTotal = val - this.emolumentos - Number(resultLiquidacao);
      }
    } else {
      this.precoTotal = null
    }
  }

  onBlurTaxas(){
    const obj: Ordem = this.getDadosForm();
    this.calcularTotal(obj)
  }
  // TODO salvar na base?
  calcularTotal(obj: Ordem){
    const val = obj.quantidade * obj.valor
    if (obj.operacao == Operacao.Compra){
      this.precoTotal = val + Number(obj.emoluentos ?? 0) + Number(obj.liquidacao ?? 0)
    } else if (obj.operacao == Operacao.Venda){
      this.precoTotal = val - Number(obj.emoluentos ?? 0) - Number(obj.liquidacao ?? 0)
    }
  }
}
function parse(dateStr: string, dateFormat: string, arg2: Date) {
  throw new Error('Function not implemented.');
}

