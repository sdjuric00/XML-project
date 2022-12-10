import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from '../material/material.module';
import { CopyrightApplicationComponent } from './component/copyright/copyright-application/copyright-application.component';
import { PodnosilacComponent } from './component/podnosilac/podnosilac.component';
import { KontaktComponent } from './component/kontakt/kontakt.component';
import { AdresaComponent } from './component/adresa/adresa.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from '@angular/material/chips';
import { FizickoLiceComponent } from './component/fizicko-lice/fizicko-lice.component';
import { PravnoLiceComponent } from './component/pravno-lice/pravno-lice.component';
import { PatentApplicationComponent } from './component/patent-application/patent-application.component';
import { ZaglavljeComponent } from './component/zaglavlje/zaglavlje.component';
import { PunomocnikComponent } from './component/punomocnik/punomocnik.component';
import { AutorskoDeloComponent } from './component/copyright/autorsko-delo/autorsko-delo.component';
import { ImenovaniAutorComponent } from './component/copyright/imenovani-autor/imenovani-autor.component';
import { AutoriComponent } from './component/copyright/autori/autori.component';
import { PriloziComponent } from './component/copyright/prilozi/prilozi.component';
import { TrademarkApplicationComponent } from './component/trademark/trademark-application/trademark-application.component';
import { ZnakComponent } from './component/trademark/znak/znak.component';
import { TaksePriloziComponent } from './component/trademark/takse-prilozi/takse-prilozi.component';
import { ZigTakseComponent } from './component/trademark/zig-takse/zig-takse.component';
import { ZigPriloziComponent } from './component/trademark/zig-prilozi/zig-prilozi.component';
import { IzborLiceComponent } from './component/izbor-lice/izbor-lice.component';
import { PronalazacComponent } from './component/pronalazac/pronalazac.component';
import { PunomocnikPatentComponent } from './component/punomocnik-patent/punomocnik-patent.component';
import { DostavljanjeComponent } from './component/dostavljanje/dostavljanje.component';
import { DopunskaPrijavaComponent } from './component/dopunska-prijava/dopunska-prijava.component';
import { PrvobitnaPrijavaComponent } from './component/prvobitna-prijava/prvobitna-prijava.component';

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
    ZaglavljeComponent,
    PunomocnikComponent,
    AutorskoDeloComponent,
    ImenovaniAutorComponent,
    AutoriComponent,
    PriloziComponent,
    TrademarkApplicationComponent,
    ZnakComponent,
    TaksePriloziComponent,
    ZigTakseComponent,
    ZigPriloziComponent,
    IzborLiceComponent,
    PronalazacComponent,
    PunomocnikPatentComponent,
    DostavljanjeComponent,
    DopunskaPrijavaComponent,
    PrvobitnaPrijavaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    MatChipsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
