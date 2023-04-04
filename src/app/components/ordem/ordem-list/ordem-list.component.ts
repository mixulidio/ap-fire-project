import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { OrdemEnum } from 'src/app/enums/ordem.enum';
import { StockBrapi } from 'src/app/models/brapi.api.model';
import { Ordem } from 'src/app/models/ordem.model';
import { BrapiStore } from 'src/app/services/brapi.api.store';
import { OrdemService } from 'src/app/services/ordem.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';
import { calculaMedia } from '../funcoes/preco-medio.function';

@Component({
  selector: 'app-ordem-list',
  templateUrl: './ordem-list.component.html',
  styleUrls: ['./ordem-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class OrdemListComponent implements OnInit, OnDestroy{
  list: Ordem[] = []
  selected: any
  cols: any[];

  stockListLocal: StockBrapi[] = []
  stockList$: Observable<StockBrapi[]>
  subscription: Subscription

  constructor(private ordemService: OrdemService,
    private brapiStore: BrapiStore,
    private messageService: MessageService,
    private tickerTagService: TickerTagService,
    private confirmationService: ConfirmationService,
    private router: Router,
    ) {

    this.cols = [
      { field: 'ticker', header: 'Ticker', sort: true },
      { field: 'quantidade', header: 'Qtd', sort: true },
      { field: 'valor', header: 'Valor', sort: true, type: 'currency' },
      { field: 'operacao', header: 'Operacao', sort: true, type: 'enumToDesc', enum: OrdemEnum},
      { field: 'data', header: 'Data', sort: true, type: "date" , format: `dd/MM/yy`}
    ];
  }

  ngOnInit(): void {
    this.ordemService.listar().subscribe({
      next: (a) => {this.list = a}
    })

    this.stockList$ = this.brapiStore.getStocksList()
    this.subscription = this.stockList$.subscribe(a => {
      this.stockListLocal = a
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  editar(){
    const id = this.selected._id;
    if(id)
      this.router.navigate(['/ordem', id]);
  }

  excluirOrdem(){
    this.confirmationService.confirm({
      message: 'Deseja excluir o item selecionado?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluirOrdemConfirm()
      }
  });
  }
  excluirOrdemConfirm(){
    const id = this.selected._id;
    if(id){
      this.ordemService.excluir(id).subscribe({
        next: (a : any) => {
          this.messageService.add({severity:'success', summary:'Mensagem', detail: a.message, life: 1200});
          // reseta filtros
          this.ordemService.listar().subscribe({
            next: (b) => {
              this.list = b
            }
          })

          // refaz o precoMedio
          var media : number = 0
          this.ordemService.listarPorTicket(this.selected.ticker).subscribe(o =>{
            media = calculaMedia(o)
            console.log(media);
            // if(media && media > 0){
              this.tickerTagService.consultaPorTicker(this.selected.ticker).subscribe(c =>{
                if(c?._id){
                  c.precoMedio = media
                  this.tickerTagService.atualizar(c._id, c).subscribe(d=>{
                    console.log(media,"media");
                  })
                }
                this.selected = null
              })
            // }
          })
        }
      })
    }
  }

}
