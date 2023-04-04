import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { TwoWayBaseTabComponent } from './two-way-base-tab/two-way-base-tab.component';

@Component({
  selector: 'app-tabs2',
  templateUrl: './tabs2.component.html',
  styleUrls: ['./tabs2.component.scss']
})
export class Tabs2Component extends TwoWayBaseTabComponent<TickerTag> implements OnInit {

  // obj: any

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  form1: FormGroup

  ngOnInit(): void {

    const data = {nome: 'init'}

    this.obj = data

    this.form1 = this.formBuilder.group({
      nome: [null, Validators.required],
      // sobrenome: [null, Validators.required],
    })

    this.form1.valueChanges.subscribe(a=>{
      this.onValorChanged(this.getDadosForm( this.form1.value))
    })

  }
  evento(data:any){
    console.log(data);
    const dataO = {nome: 'Hello World! paiii'}
    dataO.nome = data
    this.onValorChanged(dataO)
  }

  click(){
    // atualiza o form
    this.form1.patchValue(this.obj);
  }

}
