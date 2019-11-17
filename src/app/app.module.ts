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
import is from '@angular/common/locales/is';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { WithdrawalComponent } from './components/dashboard/withdrawal/withdrawal.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';

registerLocaleData(is);

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
  providers: [{ provide: LOCALE_ID, useValue: 'is' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
