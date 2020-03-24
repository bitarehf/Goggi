import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChartComponent } from './components/home/chart/chart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'exchange-rate',
    loadChildren: () => import('./components/exchange-rate/exchange-rate.module')
      .then(m => m.ExchangeRateModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module')
      .then(m => m.AboutModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./components/terms/terms.module')
      .then(m => m.TermsModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./components/privacy/privacy.module')
      .then(m => m.PrivacyModule)
  },
  { path: 'order-completed/:txid', component: OrderCompletedComponent },
  { path: 'charts', component: ChartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
