import { Component, OnInit } from '@angular/core';
import { Operacao, Ordem } from 'src/app/models/ordem.model';
import { OrdemService } from 'src/app/services/ordem.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';
import { calculaMedia } from '../funcoes/preco-medio.function';
import { TickerTag } from 'src/app/models/ticker-tag.model'
@Component({
  selector: 'app-importar-ordens',
  templateUrl: './importar-ordens.component.html',
  styleUrls: ['./importar-ordens.component.scss']
})
export class ImportarOrdensComponent implements OnInit {

  text: string;

  constructor(
    private ordemService: OrdemService,
    private tickerTagService: TickerTagService,
  ) { }

  ngOnInit(): void {
  }

  importar() {

    this.importar1()
  }

  importar1() {

    const ordens: Ordem[] = [];

    const linhas = this.text.split('\n');

    for (let i = 0; i < linhas.length; i += 5) {
      const ordem: Ordem = {
        ticker: '',
        quantidade: 0,
        valor: 0,
        operacao: Operacao.Compra,
        data: new Date(),
      };

      const linha1 = linhas[i].trim();
      if (!linha1) {
        continue;
      }
      const campos1 = linha1.split('\t');
      ordem.ticker = campos1[0];

      const linha2 = linhas[i + 1].trim();
      if (!linha2) {
        continue;
      }
      if (linha2 === 'C') {
        ordem.operacao = Operacao.Compra;
      } else if (linha2 === 'V') {
        ordem.operacao = Operacao.Venda;
      }

      const linha3 = linhas[i + 2].trim();
      if (!linha3) {
        continue;
      }
      const campos3 = linha3.split('\t');
      const data = campos3[0].split('/');
      ordem.data = new Date(+data[2], +data[1] - 1, +data[0]);
      ordem.quantidade = +campos3[1];

      const linha4 = linhas[i + 3].trim();
      if (!linha4) {
        continue;
      }
      const campos4 = linha4.split('\t');
      ordem.valor = +campos4[0].replace(',', '.');

      const linha5 = linhas[i + 4].trim();
      if (!linha5) {
        continue;
      }
      const campos5 = linha5.split('\t');
      // ordem.emoluentos = +campos5[0].replace('.', '').replace(',', '.');
      ordem.liquidacao = +campos5[1].replace('.', '').replace(',', '.');
      ordens.push(ordem);
    }


    this.ordemService.incluirOrdens(ordens).subscribe(a=>{
      console.log(a, 'incluirOrdens');

      // filtrar
      const tickersUnicos = ordens.reduce((tickers: string[], ordem: Ordem) => {
        if (!tickers.includes(ordem.ticker)) {
          return [...tickers, ordem.ticker];
        }
        return tickers;
      }, []);

      tickersUnicos.forEach(tk => {

        var media : number = 0
        this.ordemService.listarPorTicket(tk).subscribe(o =>{
          media = calculaMedia(o)
          console.log(media,"media listarPorTicket");
          if(media && media > 0){
            // alterar ou inclui tickerTag
            const ticTag: TickerTag = {
              nome: tk,
              precoMedio: media
            }
            this.tickerTagService.atualizaOuIncluiSimples(ticTag).subscribe(b => {
              console.log(b, 'atualizaOuIncluiSimples');
              alert("OK")
              this.text = ""
            })
          }
        })
      })

    })

  }

}
