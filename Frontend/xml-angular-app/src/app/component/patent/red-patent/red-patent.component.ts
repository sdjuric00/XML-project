import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/model/korisnik/korisnik';
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';
import {ZahtevPatentOsnovneInformacije} from "../../../model/patent/obj/zahtev-patent-osnovne-informacije";

@Component({
  selector: 'app-red-patent',
  templateUrl: './red-patent.component.html',
  styleUrls: ['./red-patent.component.css']
})
export class RedPatentComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  @Input() zahtev: ZahtevPatentOsnovneInformacije;
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
    this._router.navigate(['/zahtev-patent/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-patent/detalji', this.zahtev.id]);
  }

  ngOnDestroy(){
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
