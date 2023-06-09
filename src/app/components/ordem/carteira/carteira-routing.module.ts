import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcoesCarteiraComponent } from './acoes-carteira/acoes-carteira.component';
import { CarteiraComponent } from './carteira.component';
import { CarteiraListComponent } from './carteiras-list/carteira-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  // { path: '', component: CarteiraComponent ,
  //   children: [
  //   ]
  // },
  { path: 'lista', component: CarteiraListComponent },
  { path: ':id/:nomeCarteira', component: AcoesCarteiraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarteiraRoutingModule { }
