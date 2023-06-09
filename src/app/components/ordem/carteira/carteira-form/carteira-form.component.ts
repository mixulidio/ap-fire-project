import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carteira-form',
  templateUrl: './carteira-form.component.html',
  styleUrls: ['./carteira-form.component.scss']
})
export class CarteiraFormComponent implements OnInit {

  form: FormGroup;
  @Input() obj: any = null
  @Output() event = new EventEmitter<any>()

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      _id: [],
      nomeCarteira: [null, Validators.required],
    });
  }

  ngAfterViewInit() {
    if (this.obj)
      this.form.patchValue(this.obj);
  }

  handleClick() {
    if (this.obj) {
      this.obj = Object.assign(this.obj, this.form.value)
    } else {
      this.obj = { ...this.form.value };
    }
    this.event.emit(this.obj)
  }

}
