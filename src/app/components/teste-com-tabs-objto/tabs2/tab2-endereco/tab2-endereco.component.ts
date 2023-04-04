import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2-endereco',
  templateUrl: './tab2-endereco.component.html',
  styleUrls: ['./tab2-endereco.component.scss']
})
export class Tab2EnderecoComponent implements OnInit {

  @Input()
  obj: any

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.obj, "endereco+");

  }

  alteraD(){
    // console.log(this.activatedRoute.snapshot.data.obj, "endereco");
    console.log(this.obj, "endereco");

  }

}
