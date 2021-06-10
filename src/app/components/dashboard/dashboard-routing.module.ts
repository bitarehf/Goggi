import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BtcCompletedComponent } from './transfer-completed/btc/btc.component';
import { IskCompletedComponent } from './transfer-completed/isk/isk.component';
import { BtcComponent } from './transfer/btc/btc.component';
import { IskComponent } from './transfer/isk/isk.component';
import { TransferComponent } from './transfer/transfer.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: OverviewComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'deposit', component: DepositComponent },
      {
        path: 'transfer', component: TransferComponent,
        children: [
          { path: '', component: BtcComponent },
          { path: 'isk', component: IskComponent },
        ]
      },
      {
        path: 'transfer-completed',
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
