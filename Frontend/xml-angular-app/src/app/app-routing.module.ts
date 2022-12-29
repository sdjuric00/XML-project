import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {CopyrightApplicationComponent} from "./component/autorsko-delo/copyright-application/copyright-application.component";
import { PatentApplicationComponent } from './component/patent/patent-application/patent-application.component';
import { TrademarkApplicationComponent } from './component/zig/trademark-application/trademark-application.component';
import {RegistracijaComponent} from "./component/registracija/registracija.component";
import {
  PregledZahtevaAutorskaPravaComponent
} from "./component/autorsko-delo/pregled-zahteva-autorska-prava/pregled-zahteva-autorska-prava.component";
import {
  ObradiZahtevAutorskoPravoComponent
} from "./component/autorsko-delo/obradi-zahtev-autorsko-pravo/obradi-zahtev-autorsko-pravo.component";
import {
  PregledZahtevaPatentaComponent
} from "./component/patent/pregled-zahteva-patenta/pregled-zahteva-patenta.component";
import {PregledZahtevaZigovaComponent} from "./component/zig/pregled-zahteva-zigova/pregled-zahteva-zigova.component";

const routes: Routes = [
  { path: 'prijava', component: LoginComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'autorska-prava', component: CopyrightApplicationComponent},
  { path: 'patent', component: PatentApplicationComponent},
  { path: 'zig', component: TrademarkApplicationComponent},
  { path: 'pregled-zahteva-autorskih-prava', component: PregledZahtevaAutorskaPravaComponent},
  { path: 'pregled-zahteva-patenta', component: PregledZahtevaPatentaComponent},
  { path: 'pregled-zahteva-zigova', component: PregledZahtevaZigovaComponent},
  { path: 'obradi-zahtev-autorsko-pravo/:id', component: ObradiZahtevAutorskoPravoComponent},
  { path: '', redirectTo: 'prijava', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
