import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ZahtevPatentOsnovneInformacije} from "../../../model/patent/obj/zahtev-patent-osnovne-informacije";

@Component({
  selector: 'app-red-patent',
  templateUrl: './red-patent.component.html',
  styleUrls: ['./red-patent.component.css']
})
export class RedPatentComponent implements OnInit {

  @Input() zahtev: ZahtevPatentOsnovneInformacije;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  obradaZahteva() {
    this._router.navigate(['/obradi-zahtev-patent', this.zahtev.id]);
  }
}
