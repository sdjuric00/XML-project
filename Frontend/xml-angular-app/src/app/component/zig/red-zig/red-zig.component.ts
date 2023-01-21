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
export class RedZigComponent {

  authSubscription: Subscription;
  @Input() zahtev: ZahtevZigOsnovneInformacije;
  @Input() gradjanin: boolean;
  
  constructor(private _router: Router) {
    this.gradjanin = false;
  }

  obradaZahteva() {
    this._router.navigate(['/zahtev-zig/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-zig/detalji', this.zahtev.id]);
  }
}
