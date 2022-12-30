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
  prikaziDugme: boolean = false;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.prikaziDugme = this.zahtev.pregledano;
  }

  obradaZahteva() {
    this._router.navigate(['/obradi-zahtev-patent', this.zahtev.id]);
  }

  daLiJePregledano(): string {
    if (this.zahtev.pregledano === true){

      return "true";
    }

    return "false";
  }

  prikaziDugmeF(): string {

    if (this.prikaziDugme === true){

      return "true";
    }

    return "false";
  }
}
