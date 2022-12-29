import {Component, Input, OnInit} from '@angular/core';
import {
  ZahtevAutorskoPravoOsnovneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";
import {Router} from "@angular/router";

@Component({
  selector: 'app-red-autorska-prava',
  templateUrl: './red-autorska-prava.component.html',
  styleUrls: ['./red-autorska-prava.component.css']
})
export class RedAutorskaPravaComponent implements OnInit {

  @Input() zahtev: ZahtevAutorskoPravoOsnovneInformacije;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  obradaZahteva() {
    this._router.navigate(['/obradi-zahtev-autorsko-pravo', this.zahtev.id]);
  }
}
