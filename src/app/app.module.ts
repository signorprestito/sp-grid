import { SpGridComponent } from './modules/sp-grid/sp-grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpGridModule } from './modules/sp-grid/sp-grid.module';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt, 'it');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SpGridModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "it" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
