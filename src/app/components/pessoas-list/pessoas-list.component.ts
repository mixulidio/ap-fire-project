import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})
export class PessoasListComponent implements OnInit {

  constructor() { }

  list: Pessoa[] = []
  selectedProduct1: Pessoa
  display: boolean = false;
  cols: any[];

  ngOnInit(): void {

    this.list.push(
      {
        nome: 'Paulo',
        cpf: 12345678909
      },
      {
        nome: 'Vinicius',

      },
    )

    this.cols = [
      { field: 'nome', header: 'nome' },
      { field: 'cpf', header: 'cpf' },
      // { field: 'email', header: 'email' },
      // { field: 'dataNascimento', header: 'dataNascimento' }
  ];
  }


  showDialog(item: Pessoa) {
    this.display = true;
    this.selectedProduct1 = item
  }

  closeDialog() {
    this.display = false;
  }


}
