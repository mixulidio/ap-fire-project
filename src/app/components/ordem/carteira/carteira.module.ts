import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CarteiraTickerService } from 'src/app/services/carteira-ticker.service';
import { CarteiraService } from 'src/app/services/carteira.service';
import { AcoesCarteiraComponent } from './acoes-carteira/acoes-carteira.component';
import { CarteiraFormComponent } from './carteira-form/carteira-form.component';
import { CarteiraRoutingModule } from './carteira-routing.module';
import { CarteiraTickerFormComponent } from './carteira-ticker-form/carteira-ticker-form.component';
import { CarteiraComponent } from './carteira.component';
import { CarteiraListComponent } from './carteiras-list/carteira-list.component';
import { TickerTagService } from 'src/app/services/ticker-tag.service';

@NgModule({
  declarations: [
    CarteiraListComponent,
    CarteiraFormComponent,
    AcoesCarteiraComponent,
    CarteiraComponent,
    CarteiraTickerFormComponent,
  ],
  imports: [
    CommonModule,
    CarteiraRoutingModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  providers:[
    CarteiraService,
    TickerTagService,
    CarteiraTickerService,
  ]
})
export class CarteiraModule { }
