import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { TextMaskModule } from 'angular2-text-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BuyComponent } from './components/home/buy/buy.component';
import { FeatureComponent } from './components/home/feature/feature.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RatesComponent } from './components/rates/rates.component';
import { TermsComponent } from './components/terms/terms.component';

import { registerLocaleData } from '@angular/common';
import localeIs from '@angular/common/locales/is';
registerLocaleData(localeIs, 'is');

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { BtcCompletedComponent } from './components/dashboard/withdrawal-completed/btc/btc.component';
import { IskCompletedComponent } from './components/dashboard/withdrawal-completed/isk/isk.component';
import { BtcComponent } from './components/dashboard/withdrawal/btc/btc.component';
import { IskComponent } from './components/dashboard/withdrawal/isk/isk.component';
import { WithdrawalComponent } from './components/dashboard/withdrawal/withdrawal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { DepositComponent } from './components/dashboard/deposit/deposit.component';
import { AboutComponent } from './components/about/about.component';
import { ChartComponent } from './components/home/chart/chart.component';
import { HeaderTransparentComponent } from './components/header-transparent/header-transparent.component';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { FaqComponent } from './components/faq/faq.component';
import { HelpComponent } from './components/help/help.component';
import { ChangelogComponent } from './components/changelog/changelog.component';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BuyComponent,
    FooterComponent,
    FeatureComponent,
    TermsComponent,
    PageNotFoundComponent,
    PrivacyComponent,
    RatesComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    OrderCompletedComponent,
    TransactionsComponent,
    OverviewComponent,
    SettingsComponent,
    WithdrawalComponent,
    BtcComponent,
    IskComponent,
    BtcCompletedComponent,
    IskCompletedComponent,
    DepositComponent,
    AboutComponent,
    ChartComponent,
    HeaderTransparentComponent,
    ExchangeRateComponent,
    FaqComponent,
    HelpComponent,
    ChangelogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['bitar.is', 'api.bitar.is', 'localhost:4200', 'localhost:5000'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    NgxDatatableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'is' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
