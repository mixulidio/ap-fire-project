import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { dateRangeValid } from 'src/app/validators/date-range.directive';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  form: FormGroup;
  pessoa: Pessoa;

  constructor(
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder,
    ) {
      this.initForm(this.pessoa)
  }

  ngOnInit(): void {
    this.pessoaService.obterTodos().subscribe( pessoas =>{
      this.pessoa = pessoas[0]
      this.initForm(this.pessoa)
      console.log(pessoas) })

      // this.form.setValidators( dateRangeValid('dtInicial','dtFinal'))
  }

  initForm(obj: Pessoa){
    this.form = this.formBuilder.group({
      id: [''],
      nome: [''],
      cpf: [''],
      rg: [''],
      dataNascimento:  [''] ,
      email: [''],
      endereco: this.formBuilder.group({
          cep: [''],
          logradouro: [''],
          numero: [''],
          complemento: [''],
      }),
      estadoCivil: [''],
      profissao: [''],
      dtInicial: [null],
      dtFinal: [null],
    }, {
     // validators: dateRangeValid('dtInicial','dtFinal')
    });
    if(obj)
      this.form.patchValue(obj);
  }

  handleClick() {
    //execute action
    this.pessoaService.obterTodos().subscribe( pessoas => console.log(pessoas) )
  }


}
