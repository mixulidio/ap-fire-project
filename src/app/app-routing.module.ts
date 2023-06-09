import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Brapi1Component } from './components/brapi1/brapi1.component';
import { HomeComponent } from './components/home/home.component';
import { ImportarOrdensComponent } from './components/ordem/importar-ordens/importar-ordens.component';
import { OrdemFormComponent } from './components/ordem/ordem-form/ordem-form.component';
import { OrdemListComponent } from './components/ordem/ordem-list/ordem-list.component';
import { Portfolio0Component } from './components/ordem/portfolio0/portfolio0.component';
import { TickerTagListComponent } from './components/ordem/ticker-tag-list/ticker-tag-list.component';
import { PessoasListComponent } from './components/pessoas-list/pessoas-list.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { Tabs1Component } from './components/teste-com-tabs-objto/tabs1/tabs1.component';
import { Tabs2Component } from './components/teste-com-tabs-objto/tabs2/tabs2.component';
import { CarteiraModule } from './components/ordem/carteira/carteira.module';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'pessoas', component: PessoasComponent},
  {path: 'pessoas-list', component: PessoasListComponent},
  {path: 'brapi1', component: Brapi1Component},
  {path: 'ordem', component: OrdemFormComponent},
  {path: 'ordem/:id', component: OrdemFormComponent},
  {path: 'ordem-list', component: OrdemListComponent},
  {path: 'ticker-tag-list', component: TickerTagListComponent},
  {path: 'importar-ordens', component: ImportarOrdensComponent},
  {path: 'portfolio0', component: Portfolio0Component},
  {path: 'tabs1', component: Tabs1Component},
  {path: 'tabs2', component: Tabs2Component},
  // { path: 'carteiras', redirectTo: '/carteiras/lista', pathMatch: 'full' },
  { path: 'carteiras', loadChildren: () => CarteiraModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
