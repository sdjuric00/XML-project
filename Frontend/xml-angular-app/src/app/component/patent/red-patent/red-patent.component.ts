import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import {ZahtevPatentOsnovneInformacije} from "../../../model/patent/obj/zahtev-patent-osnovne-informacije";

@Component({
  selector: 'app-red-patent',
  templateUrl: './red-patent.component.html',
  styleUrls: ['./red-patent.component.css']
})
export class RedPatentComponent {

  authSubscription: Subscription;
  @Input() zahtev: ZahtevPatentOsnovneInformacije;
  @Input() gradjanin: boolean;

  constructor(private _router: Router) {
    this.gradjanin = false;
  }

  obradaZahteva() {
    this._router.navigate(['/zahtev-patent/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-patent/detalji', this.zahtev.id]);
  }

}
