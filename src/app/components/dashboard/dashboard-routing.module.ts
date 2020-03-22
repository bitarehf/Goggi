import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { OverviewComponent } from './overview/overview.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { BtcComponent } from './withdrawal/btc/btc.component';
import { IskComponent } from './withdrawal/isk/isk.component';
import { BtcCompletedComponent } from './withdrawal-completed/btc/btc.component';
import { IskCompletedComponent } from './withdrawal-completed/isk/isk.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
