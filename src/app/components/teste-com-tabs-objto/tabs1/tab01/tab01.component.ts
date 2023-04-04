import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { Tabs1Component } from '../tabs1.component';

@Component({
  selector: 'app-tab01',
  templateUrl: './tab01.component.html',
  styleUrls: ['./tab01.component.scss']
})
export class Tab01Component extends Tabs1Component implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  override ngOnInit(): void {
    // this.obj = { nome: 'paulo filho'}
    this.initForm()
  }

  private initForm() {
    this.form = this.formBuilder.group({
      _id: [],
      nome: [null, Validators.required],
      tags: [],
      precoMedio: [],
      showEdit: [],
      modified: [],
      originalTags: [],
    });

    this.form.valueChanges.subscribe(a => {
      this.obj = this.getDados(a);
    })
    // inscrever nas modificacoes
    //  this.form.patchValue(or)
  }

  getDadosForm(): TickerTag {
    const obj: TickerTag = Object.assign({}, this.form.value);
    return obj;
  }

  getDados(dados:any): TickerTag {
    const obj: TickerTag = Object.assign({}, dados);
    return obj;
  }

  submeter(){
    console.log(this.obj);

  }

}
