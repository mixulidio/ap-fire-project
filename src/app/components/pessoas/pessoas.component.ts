import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.pessoaService.obterTodos().subscribe( pessoas => console.log(pessoas) )
  }

  handleClick() {
    //execute action
    this.pessoaService.obterTodos().subscribe( pessoas => console.log(pessoas) )
  }

}
