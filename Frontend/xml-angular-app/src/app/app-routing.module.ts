import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {CopyrightApplicationComponent} from "./component/copyright-application/copyright-application.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'copyright-application', component: CopyrightApplicationComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
