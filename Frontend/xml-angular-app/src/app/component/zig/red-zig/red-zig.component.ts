import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/model/korisnik/korisnik';
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';
import {ZahtevZigOsnovneInformacije} from "../../../model/zig/obj/zahtev-zig-osnovne-informacije";

@Component({
  selector: 'app-red-zig',
  templateUrl: './red-zig.component.html',
  styleUrls: ['./red-zig.component.css']
})
export class RedZigComponent implements OnInit {

  authSubscription: Subscription;
  @Input() zahtev: ZahtevZigOsnovneInformacije;
  constructor(private _router: Router, private autentifikacijaService: AutentifikacijaService) { }
  trenutnoUlogovani: Korisnik;
  sluzbenik = false;
  gradjanin = false;

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
    this._router.navigate(['/zahtev-zig/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-zig/detalji', this.zahtev.id]);
  }
}
