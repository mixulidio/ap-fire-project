import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Brapi1Component } from './components/brapi1/brapi1.component';
import { HomeComponent } from './components/home/home.component';
import { MenuBasicComponent } from './components/menu-basic/menu-basic.component';
import { ImportarOrdensComponent } from './components/ordem/importar-ordens/importar-ordens.component';
import { OrdemFormComponent } from './components/ordem/ordem-form/ordem-form.component';
import { OrdemListComponent } from './components/ordem/ordem-list/ordem-list.component';
import { Portfolio0Component } from './components/ordem/portfolio0/portfolio0.component';
import { TickerTagListComponent } from './components/ordem/ticker-tag-list/ticker-tag-list.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { PessoasListComponent } from './components/pessoas-list/pessoas-list.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { Tab01Component } from './components/teste-com-tabs-objto/tabs1/tab01/tab01.component';
import { Tabs1Component } from './components/teste-com-tabs-objto/tabs1/tabs1.component';
import { Tab2EnderecoComponent } from './components/teste-com-tabs-objto/tabs2/tab2-endereco/tab2-endereco.component';
import { Tab2PessoaComponent } from './components/teste-com-tabs-objto/tabs2/tab2-pessoa/tab2-pessoa.component';
import { Tabs2Component } from './components/teste-com-tabs-objto/tabs2/tabs2.component';
import { TwoWayBaseTabComponent } from './components/teste-com-tabs-objto/tabs2/two-way-base-tab/two-way-base-tab.component';
import { EnumToDescPipe } from './pipes/enum-to-desc.pipe';
import { BrapiApiService } from './services/brapi.api.service';
import { BrapiStore } from './services/brapi.api.store';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PessoasComponent,
    PessoasListComponent,
    PessoaFormComponent,
    Brapi1Component,
    OrdemFormComponent,
    OrdemListComponent,
    EnumToDescPipe,
    MenuBasicComponent,
    TickerTagListComponent,
    ImportarOrdensComponent,
    Portfolio0Component,
    Tabs1Component,
    Tab01Component,
    Tabs2Component,
    Tab2PessoaComponent,
    Tab2EnderecoComponent,
    TwoWayBaseTabComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    DialogModule,
    SelectButtonModule,
    CalendarModule,
    MenuModule,
    MegaMenuModule,
    ChipsModule,
    ChipModule,
    InputNumberModule,
    AutoCompleteModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule,
    TabViewModule,
   // CarteiraModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    BrapiStore,
    BrapiApiService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
