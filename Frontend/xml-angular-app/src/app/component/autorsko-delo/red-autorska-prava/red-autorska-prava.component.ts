import {Component, Input, OnInit} from '@angular/core';
import {
  ZahtevAutorskoPravoOsnovneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/model/korisnik/korisnik';
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';

@Component({
  selector: 'app-red-autorska-prava',
  templateUrl: './red-autorska-prava.component.html',
  styleUrls: ['./red-autorska-prava.component.css']
})
export class RedAutorskaPravaComponent implements OnInit {
  authSubscription: Subscription;
  @Input() zahtev: ZahtevAutorskoPravoOsnovneInformacije;
  trenutnoUlogovani: Korisnik;
  sluzbenik = false;
  gradjanin = false;
  constructor(private _router: Router, private autentifikacijaService: AutentifikacijaService) { }

  ngOnInit(): void {
    this.authSubscription = this.autentifikacijaService
    .getSubjectCurrentUser()
    .subscribe(korisnik => {
      this.trenutnoUlogovani = korisnik;
      this.sluzbenik = this.autentifikacijaService.korisnikJeSluzbenik();
      this.gradjanin = this.autentifikacijaService.korisnikJeGradjanin();
    });
  }

  obradaZahteva() {
    this._router.navigate(['/zahtev-autorsko-pravo/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-autorsko-pravo/detalji', this.zahtev.id]);
  }
}
