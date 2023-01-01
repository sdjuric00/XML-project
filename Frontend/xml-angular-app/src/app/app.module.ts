import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from '../material/material.module';
import { CopyrightApplicationComponent } from './component/autorsko-delo/copyright-application/copyright-application.component';
import { PodnosilacComponent } from './component/podnosilac/podnosilac.component';
import { KontaktComponent } from './component/kontakt/kontakt.component';
import { AdresaComponent } from './component/adresa/adresa.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from '@angular/material/chips';
import { FizickoLiceComponent } from './component/fizicko-lice/fizicko-lice.component';
import { PravnoLiceComponent } from './component/pravno-lice/pravno-lice.component';
import { PatentApplicationComponent } from './component/patent/patent-application/patent-application.component';
import { ZaglavljeComponent } from './component/zaglavlje/zaglavlje.component';
import { PunomocnikComponent } from './component/punomocnik/punomocnik.component';
import { AutorskoDeloComponent } from './component/autorsko-delo/autorsko-delo/autorsko-delo.component';
import { ImenovaniAutorComponent } from './component/autorsko-delo/imenovani-autor/imenovani-autor.component';
import { AutoriComponent } from './component/autorsko-delo/autori/autori.component';
import { PriloziComponent } from './component/autorsko-delo/prilozi/prilozi.component';
import { TrademarkApplicationComponent } from './component/zig/trademark-application/trademark-application.component';
import { ZnakComponent } from './component/zig/znak/znak.component';
import { TaksePriloziComponent } from './component/zig/takse-prilozi/takse-prilozi.component';
import { ZigTakseComponent } from './component/zig/zig-takse/zig-takse.component';
import { ZigPriloziComponent } from './component/zig/zig-prilozi/zig-prilozi.component';
import { IzborLiceComponent } from './component/izbor-lice/izbor-lice.component';
import { PronalazacComponent } from './component/patent/pronalazac/pronalazac.component';
import { PunomocnikPatentComponent } from './component/patent/punomocnik-patent/punomocnik-patent.component';
import { DostavljanjeComponent } from './component/patent/dostavljanje/dostavljanje.component';
import { DopunskaPrijavaComponent } from './component/patent/dopunska-prijava/dopunska-prijava.component';
import { PrvobitnaPrijavaComponent } from './component/patent/prvobitna-prijava/prvobitna-prijava.component';
import {CommonModule, DatePipe} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {NavBarComponent} from "./component/nav-bar/nav-bar.component";
import {RegistracijaComponent} from "./component/registracija/registracija.component";
import {CustomInterceptor} from "./interceptor/custom.interceptor";
import { PregledZahtevaAutorskaPravaComponent } from './component/autorsko-delo/pregled-zahteva-autorska-prava/pregled-zahteva-autorska-prava.component';
import { TabelaZahtevaAutorskaPravaComponent } from './component/autorsko-delo/tabela-zahteva-autorska-prava/tabela-zahteva-autorska-prava.component';
import { RedAutorskaPravaComponent } from './component/autorsko-delo/red-autorska-prava/red-autorska-prava.component';
import { ZahtevAutorskoPravoDetaljiComponent } from './component/autorsko-delo/zahtev-autorsko-pravo-detalji/zahtev-autorsko-pravo-detalji.component';
import { ObradiZahtevAutorskoPravoComponent } from './component/autorsko-delo/obradi-zahtev-autorsko-pravo/obradi-zahtev-autorsko-pravo.component';
import { PopunjavaPrilogeZahtevAutorskoPravoComponent } from './component/autorsko-delo/popunjava-priloge-zahtev-autorsko-pravo/popunjava-priloge-zahtev-autorsko-pravo.component';
import { FizickoLicePrikazZahtevaComponent } from './component/autorsko-delo/zahtev-autorsko-pravo-detalji/fizicko-lice-prikaz-zahteva/fizicko-lice-prikaz-zahteva.component';
import {
  PravnoLicePrikazZahtevaComponent
} from "./component/autorsko-delo/zahtev-autorsko-pravo-detalji/pravno-lice-prikaz-zahteva/pravno-lice-prikaz-zahteva.component";
import { ImenovaniAutorPrikazZahtevaComponent } from './component/autorsko-delo/zahtev-autorsko-pravo-detalji/imenovani-autor-prikaz-zahteva/imenovani-autor-prikaz-zahteva.component';
import { PregledZahtevaPatentaComponent } from './component/patent/pregled-zahteva-patenta/pregled-zahteva-patenta.component';
import { TabelaZahtevaPatentaComponent } from './component/patent/tabela-zahteva-patenta/tabela-zahteva-patenta.component';
import { RedPatentComponent } from './component/patent/red-patent/red-patent.component';
import { PregledZahtevaZigovaComponent } from './component/zig/pregled-zahteva-zigova/pregled-zahteva-zigova.component';
import { TabelaZahtevaZigoviComponent } from './component/zig/tabela-zahteva-zigovi/tabela-zahteva-zigovi.component';
import { RedZigComponent } from './component/zig/red-zig/red-zig.component';
import { ObradiZahtevPatentComponent } from './component/patent/obradi-zahtev-patent/obradi-zahtev-patent.component';
import { PopunjavaPrilogeZahtevPatentComponent } from './component/patent/popunjava-priloge-zahtev-patent/popunjava-priloge-zahtev-patent.component';
import { ZahtevPatentDetaljiComponent } from './component/patent/zahtev-patent-detalji/zahtev-patent-detalji.component';
import { ObradiZahtevZigComponent } from './component/zig/obradi-zahtev-zig/obradi-zahtev-zig.component';
import { PopunjavaPrilogeZahtevZigComponent } from './component/zig/popunjava-priloge-zahtev-zig/popunjava-priloge-zahtev-zig.component';
import { ZahtevZigDetaljiComponent } from './component/zig/zahtev-zig-detalji/zahtev-zig-detalji.component';
import { DugmiciZaSkidanjeComponent } from './component/dugmici-za-skidanje/dugmici-za-skidanje.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    NavBarComponent,
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
    PrvobitnaPrijavaComponent,
    PregledZahtevaAutorskaPravaComponent,
    TabelaZahtevaAutorskaPravaComponent,
    RedAutorskaPravaComponent,
    ZahtevAutorskoPravoDetaljiComponent,
    ObradiZahtevAutorskoPravoComponent,
    PopunjavaPrilogeZahtevAutorskoPravoComponent,
    FizickoLicePrikazZahtevaComponent,
    PravnoLicePrikazZahtevaComponent,
    ImenovaniAutorPrikazZahtevaComponent,
    PregledZahtevaPatentaComponent,
    TabelaZahtevaPatentaComponent,
    RedPatentComponent,
    PregledZahtevaZigovaComponent,
    TabelaZahtevaZigoviComponent,
    RedZigComponent,
    ObradiZahtevPatentComponent,
    PopunjavaPrilogeZahtevPatentComponent,
    ZahtevPatentDetaljiComponent,
    ObradiZahtevZigComponent,
    PopunjavaPrilogeZahtevZigComponent,
    ZahtevZigDetaljiComponent,
    DugmiciZaSkidanjeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatChipsModule,
    FormsModule,
    ToastrModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
