import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TickerTag } from 'src/app/models/ticker-tag.model';
import { EventShareService } from 'src/app/services/event-share.service';
import { Tabs2Component } from '../tabs2.component';
import { TwoWayBaseTabComponent } from '../two-way-base-tab/two-way-base-tab.component';

@Component({
  selector: 'app-tab2-pessoa',
  templateUrl: './tab2-pessoa.component.html',
  styleUrls: ['./tab2-pessoa.component.scss']
})
export class Tab2PessoaComponent extends Tabs2Component implements OnInit {

  form: FormGroup

  constructor(
    private formBuilder2: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventShareService: EventShareService,
  ) {
    super(formBuilder2);
  }

  override ngOnInit(): void {

    // this.activatedRoute.data.subscribe(d => {
    //   console.log(d);
    // })

    this.form = this.formBuilder2.group({
      nome: [null, Validators.required],
      // sobrenome: [null, Validators.required],
    })
    // a cada modificação salva na rota
    this.form.valueChanges.subscribe(a=>{
      this.onValorChanged(this.getDadosForm( this.form.value))
    })
  }



  alteraD() {

    this.obj = { nome: "filho 1" }



  }

}
