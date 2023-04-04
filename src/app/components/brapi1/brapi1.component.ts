import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BrapiModel, ParamsBrapi } from 'src/app/models/brapi.api.model';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { BrapiApiService } from 'src/app/services/brapi.api.service';
import { ProgressbarService } from 'src/app/services/progressbar.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';


interface TagWithTickers {
  tag: string;
  tickers: string[];
}

@Component({
  selector: 'app-brapi1',
  templateUrl: './brapi1.component.html',
  styleUrls: ['./brapi1.component.scss']
})
export class Brapi1Component implements OnInit {

  form: FormGroup;

  dados: BrapiModel

  ranges: any[];

  //list: any
  cols: any[];
  dataCalendar: any
  tagsWithTickers: TagWithTickers[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private brapiService: BrapiApiService,
    private tickerTagService: TickerTagService,
    private progressbar: ProgressbarService,
  ) {

    this.form = this.formBuilder.group({
      range: ['1d'],
      interval: ['1d'],
      tickers: [],
    })

    this.ranges = [
      { name: '1d', code: '1d' },
      { name: '5d', code: '5d' },
      { name: '1m', code: '1mo' },
      { name: '3m', code: '3mo' },
      { name: '6m', code: '6mo' },
      { name: '1a', code: '1y' },
      { name: '2a', code: '2y' },
      { name: '5a', code: '5y' },
      { name: '10a', code: '10y' },
      { name: 'YTD', code: 'ytd' },
      { name: 'max', code: 'max' },
    ];

    this.cols = [
      { field: 'symbol', header: 'symbol' },
      //{ field: 'percent', header: 'percent' },
    ];
  }

  ngOnInit(): void {
    this.tickerTagService.listar().subscribe((tt: TickerTag[]) => {

      this.tagsWithTickers = tt.reduce((acc: TagWithTickers[], cur) => {
        cur.tags?.forEach(tag => {
          const index = acc.findIndex(t => t.tag === tag);
          if (index === -1) {
            acc.push({ tag: tag, tickers: [cur.nome] });
          } else {
            acc[index].tickers.push(cur.nome);
          }
        });
        return acc;
      }, []);

      if (this.tagsWithTickers.length > 0) {
        this.form.controls.tickers.setValue(this.tagsWithTickers[0].tickers)
      } else {
        this.form.controls.tickers.setValue(tt.map(a => a.nome))
      }
      this.changeRange()
    })
  }

  tagsTickers(item : TagWithTickers){
    this.form.controls.tickers.setValue(item.tickers)
    this.changeRange()
  }

  changeRange() {
    this.progressbar.iniciar();
    let tickers = this.form.controls['tickers'].value
    let range = this.form.controls['range'].value
    let interval = this.form.controls['interval'].value
    if (!tickers?.length || range == null)
      return;
    let params1: ParamsBrapi = {
      range: range,
      interval: interval,
      fundamental: false
    }
    this.brapiService.obterDados(tickers.join(), params1).subscribe(res => {
      this.dados = res
      this.dados.results.forEach(r => {
        let a = 0
        if (range == '1d') {
          r.percent = r.regularMarketChangePercent
        } else
        if (r.regularMarketPrice &&
          r.historicalDataPrice[0]?.close) {
          a = (r.regularMarketPrice * 100 / r.historicalDataPrice[0]?.close) - 100
          r.percent = Math.round((a + Number.EPSILON) * 100) / 100
        }
        if (r.historicalDataPrice){
          let d = r.historicalDataPrice[0]?.date * 1000
          let dt = new Date(d)
          this.dataCalendar = dt
        }
      })
      this.dados.results.sort((a, b) => {
        if (a.percent && b.percent) {
          if (a.percent < b.percent) {
            return -1;
          }
          if (a.percent > b.percent) {
            return 1;
          }
        }
        return 0;
      });
      this.progressbar.parar();
    })
  }


  onKeyDownChips(event: KeyboardEvent) {
    if (event.key === ";" || event.key == ' ') {
      event.preventDefault();
      const element = event.target as HTMLElement;
      element.blur();
      element.focus();
      this.changeRange()
    }
  }
}
