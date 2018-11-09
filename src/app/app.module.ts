import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BuyComponent } from './components/home/buy/buy.component';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureComponent } from './components/home/feature/feature.component';
import { TermsComponent } from './components/terms/terms.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RatesComponent } from './components/rates/rates.component';

import { registerLocaleData } from '@angular/common';
import is from '@angular/common/locales/is';
registerLocaleData(is);

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
    RatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'is' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
