import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { BrapiApiService } from 'src/app/services/brapi.api.service';
import { BrapiStore } from 'src/app/services/brapi.api.store';
import { OrdemService } from 'src/app/services/ordem.service';
import { TickerTagService } from 'src/app/services/ticker-tag.service';

@Component({
  selector: 'app-ticker-tag-list',
  templateUrl: './ticker-tag-list.component.html',
  styleUrls: ['./ticker-tag-list.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class TickerTagListComponent implements OnInit {

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
    })
  }

  onKeyDownChips(event: KeyboardEvent) {
    if (event.key === ";" || event.key == ' ') {
      event.preventDefault();
      const element = event.target as HTMLElement;
      element.blur();
      element.focus();
    }
  }

  salvarTags(obj: TickerTag) {
    if (obj.modified) {
      if(obj._id)
        this.tickerTagService.atualizar(obj._id, obj).subscribe(a=>{
          console.log(a);
          this.carregarLista()
          this.messageService.add({severity:'success', summary: 'Ok', detail: 'Item atualizado', life: 3000});
        })
    }
  }

  cancelarOuExcluir(obj: TickerTag) {
    if (obj.modified) {
      obj.tags = obj.originalTags
    } else {
      this.excluirTickerTag(obj)
    }
  }

  excluirTickerTag(obj: TickerTag) {
    this.confirmationService.confirm({
        message: 'Deseja excluir o item selecionado?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            if(obj._id)
              this.tickerTagService.excluir(obj._id).subscribe(a=>{
                console.log(a);
                this.carregarLista()
                this.messageService.add({severity:'success', summary: 'Ok', detail: 'Item excluído', life: 3000});
              })
        }
    });
}

  editarTags(obj: TickerTag) {
    obj.originalTags = obj.tags
  }

}
