import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/models/carteira.model';
import { CarteiraService } from 'src/app/services/carteira.service';

@Component({
  selector: 'app-carteira-list',
  templateUrl: './carteira-list.component.html',
  styleUrls: ['./carteira-list.component.scss']
})
export class CarteiraListComponent implements OnInit {

  list: Carteira[]
  displayCarteira = false
  selectedCarteira: any

  constructor(private carteiraService: CarteiraService,) { }

  ngOnInit(): void {
    this.loadList();
  }

  private loadList(){
    this.carteiraService.listar().subscribe(a => {
      this.list = a
    })
  }

  adicionar() {
    this.displayCarteira = true;
  }

  showDialog(item: any) {
    this.displayCarteira = true;
    this.selectedCarteira = item
  }

  closeDialog(obj: any) {
    this.displayCarteira = false;
    this.carteiraService.incluir(obj).subscribe(r => {
      this.loadList();
    })
  }

}
