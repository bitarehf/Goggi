import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositComponent } from './components/dashboard/deposit/deposit.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { BtcCompletedComponent } from './components/dashboard/withdrawal-completed/btc/btc.component';
import { IskCompletedComponent } from './components/dashboard/withdrawal-completed/isk/isk.component';
import { BtcComponent } from './components/dashboard/withdrawal/btc/btc.component';
import { IskComponent } from './components/dashboard/withdrawal/isk/isk.component';
import { WithdrawalComponent } from './components/dashboard/withdrawal/withdrawal.component';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpComponent } from './components/help/help.component';
import { ChartComponent } from './components/home/chart/chart.component';
import { FeatureComponent } from './components/home/feature/feature.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RatesComponent } from './components/rates/rates.component';
import { TermsComponent } from './components/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    FeatureComponent,
    TermsComponent,
    PageNotFoundComponent,
    PrivacyComponent,
    RatesComponent,
    RegisterComponent,
    DashboardComponent,
    OverviewComponent,
    LoginComponent,
    OrderCompletedComponent,
    SettingsComponent,
    WithdrawalComponent,
    BtcComponent,
    IskComponent,
    BtcCompletedComponent,
    IskCompletedComponent,
    DepositComponent,
    AboutComponent,
    ChartComponent,
    ExchangeRateComponent,
    FaqComponent,
    HelpComponent,
    ChangelogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        allowedDomains: ["bitar.is", "api.bitar.is", "localhost:4200", "localhost:5000"],
        disallowedRoutes: ["http://example.com/examplebadroute/"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
