import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  @Input() pessoa: Pessoa;
  form: FormGroup;
  @Output() event = new EventEmitter<Pessoa>()

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      nome: [''],
      cpf: [''],
      rg: [''],
      dataNascimento: [''],
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

  }

  ngAfterViewInit() {
    if (this.pessoa)
      this.form.patchValue(this.pessoa);
  }

  handleClick() {
    this.pessoa = Object.assign(this.pessoa, this.form.value)
    this.event.emit(this.pessoa)
  }
}
