import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { MathjaxModule } from './_shared/mathjax/mathjax.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { FootbarComponent } from './parts/footbar/footbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FootbarComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    TransferHttpCacheModule,
    MathjaxModule.forRoot()
  ],
  providers: [/*{ provide: LocationStrategy, useClass: HashLocationStrategy }*/],
  bootstrap: [AppComponent]
})
export class AppModule {}
