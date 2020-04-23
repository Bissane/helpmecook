import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { BASE_URL } from './app.tokens';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';

import { NotfoundComponent } from './notfound/notfound.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { UserIdleModule } from 'angular-user-idle';
import { MatPaginatorIntl } from '@angular/material';
import { PaginatorIntlFr } from './shared/paginatorIntlfr';
import {NavbarCD31Component} from './shared/navbar-cd31/navbar-cd31.component';
import {NgxMaskModule} from 'ngx-mask';
import { FooterCd31Component } from './shared/footer-cd31/footer-cd31.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        NavbarCD31Component,
        FooterCd31Component,
    ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    // Default values: `idle` is 1800 (30 minutes), `timeout` is 300 (1 minute)
    // and `ping` is 60 (1 minutes).
    UserIdleModule.forRoot({idle: 1800, timeout: 60, ping: 60}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl + '/api', environment.apiKeycloak],
        sendAccessToken: true
      }
    }),
    NgxSpinnerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.apiUrl },
    { provide: MatPaginatorIntl, useClass: PaginatorIntlFr},
    Title
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
