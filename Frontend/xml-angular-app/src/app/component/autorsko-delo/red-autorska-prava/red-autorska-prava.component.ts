import {Component, Input, OnInit} from '@angular/core';
import {
  ZahtevAutorskoPravoOsnovneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/model/korisnik/korisnik';

@Component({
  selector: 'app-red-autorska-prava',
  templateUrl: './red-autorska-prava.component.html',
  styleUrls: ['./red-autorska-prava.component.css']
})
export class RedAutorskaPravaComponent {
  authSubscription: Subscription;
  @Input() zahtev: ZahtevAutorskoPravoOsnovneInformacije;
  @Input() gradjanin: boolean;
  trenutnoUlogovani: Korisnik;

  constructor(private _router: Router) {
    this.gradjanin = false;
  }

  obradaZahteva() {
    this._router.navigate(['/zahtev-autorsko-pravo/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-autorsko-pravo/detalji', this.zahtev.id]);
  }
}
