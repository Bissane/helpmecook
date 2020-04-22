import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilComponent } from './profil/profil.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './shared/guard/auth.guard';
import {RechercheCatalogueComponent} from './recherche-catalogue/recherche-catalogue.component';
import {DemandeNormeeComponent} from './demande-normee/demande-normee.component';
import { JournalComponent } from './journal/journal.component';
import {DemandeLibreComponent} from './demande-libre/demande-libre.component';
import {ChefDeProjetGuard} from './shared/guard/chef-de-projet.guard';
import {SuiviDemandeComponent} from './suivi-demande/suivi-demande.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {DemandeResolverService} from './shared/services/demande-resolver.service';
import {FicheResolverService} from "./shared/services/fiche-resolver.service";

const routes: Routes = [
  { path: '', component: RechercheCatalogueComponent, data: {title: 'Liste des demandes'}},
  { path: 'demandeNormee/:id', component: DemandeNormeeComponent, data: {title: 'Formulaire de demande'}, resolve: {resolvedData: FicheResolverService}},
  { path: 'demandeLibre', component: DemandeLibreComponent, data: {title: 'Formulaire de demande libre'}},
  { path: 'confirmation', component: ConfirmationComponent, data: {title: ''}},
  { path: 'suiviDemande/:id', component: SuiviDemandeComponent, data: {title: 'CD31 - Gestion des demandes'}, resolve: { resolvedData: DemandeResolverService }},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes /*,{enableTracing: true} */)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
