import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { BtcCompletedComponent } from './components/dashboard/withdrawal-completed/btc/btc.component';
import { IskCompletedComponent } from './components/dashboard/withdrawal-completed/isk/isk.component';
import { BtcComponent } from './components/dashboard/withdrawal/btc/btc.component';
import { IskComponent } from './components/dashboard/withdrawal/isk/isk.component';
import { WithdrawalComponent } from './components/dashboard/withdrawal/withdrawal.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { AuthGuard } from './guards/auth.guard';
import { DepositComponent } from './components/dashboard/deposit/deposit.component';
import { AboutComponent } from './components/about/about.component';
import { ChartComponent } from './components/home/chart/chart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: OverviewComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'deposit', component: DepositComponent },
      {
        path: 'withdrawal', component: WithdrawalComponent,
        children: [
          { path: '', component: BtcComponent },
          { path: 'isk', component: IskComponent },
        ]
      },
      {
        path: 'withdrawal-completed',
        children: [
          { path: 'btc/:txid', component: BtcCompletedComponent },
          { path: 'isk/:txid', component: IskCompletedComponent },
        ]
      },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'order-completed/:txid', component: OrderCompletedComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
