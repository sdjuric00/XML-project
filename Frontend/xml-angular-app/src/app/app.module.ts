import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from '../material/material.module';
import { CopyrightApplicationComponent } from './component/copyright-application/copyright-application.component';
import { PodnosilacComponent } from './component/podnosilac/podnosilac.component';
import { KontaktComponent } from './component/kontakt/kontakt.component';
import { AdresaComponent } from './component/adresa/adresa.component';
import {MatRadioModule} from "@angular/material/radio";
import { FizickoLiceComponent } from './component/fizicko-lice/fizicko-lice.component';
import { PravnoLiceComponent } from './component/pravno-lice/pravno-lice.component';
import { PatentApplicationComponent } from './component/patent-application/patent-application.component';
import { ZaglavljeComponent } from './component/zaglavlje/zaglavlje.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CopyrightApplicationComponent,
    PodnosilacComponent,
    KontaktComponent,
    AdresaComponent,
    FizickoLiceComponent,
    PravnoLiceComponent,
    PatentApplicationComponent,
    ZaglavljeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
