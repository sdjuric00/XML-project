import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {CopyrightApplicationComponent} from "./component/copyright/copyright-application/copyright-application.component";
import { PatentApplicationComponent } from './component/patent-application/patent-application.component';
import { TrademarkApplicationComponent } from './component/trademark/trademark-application/trademark-application.component';
import {RegistracijaComponent} from "./component/registracija/registracija.component";

const routes: Routes = [
  { path: 'prijava', component: LoginComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'autorska-prava', component: CopyrightApplicationComponent},
  {path: 'patent', component: PatentApplicationComponent},
  {path: 'zig', component: TrademarkApplicationComponent},
  { path: '', redirectTo: 'prijava', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
