import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbStepperModule, NbCardModule, NbInputModule, NbMenuModule, NbActionsModule, NbBadgeModule, NbToastrService, NbToastrModule, NbAlertModule } from '@nebular/theme';
import { BuyComponent } from './components/buy/buy.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { BitcoinService } from './services/bitcoin.service';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from './services/stock.service';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    ExchangeRatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbStepperModule,
    NbCardModule,
    NbActionsModule,
    NbBadgeModule,
    NbAlertModule
  ],
  providers: [BitcoinService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
