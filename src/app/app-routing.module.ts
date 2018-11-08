import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
