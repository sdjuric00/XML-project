import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AutorskaPravaService} from "../../../service/autorska-prava.service";
import {AutentifikacijaService} from "../../../service/autentifikacija.service";
import {Korisnik} from "../../../model/korisnik/korisnik";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-popunjava-priloge-zahtev-autorsko-pravo',
  templateUrl: './popunjava-priloge-zahtev-autorsko-pravo.component.html',
  styleUrls: ['./popunjava-priloge-zahtev-autorsko-pravo.component.css']
})
export class PopunjavaPrilogeZahtevAutorskoPravoComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  opisCheckbox: boolean;
  primerCheckbox: boolean;
  ulogovaniKorisnik: Korisnik;
  autorskaPravaSubscription: Subscription;
  autentifikacijaSubscription: Subscription;

  constructor(
    private _autorskaPravaService: AutorskaPravaService,
    private _autentifikacijaService: AutentifikacijaService,
    private _toast: ToastrService
  ) {
    this.opisCheckbox = false;
    this.primerCheckbox = false;
    this.ulogovaniKorisnik = null;
  }

  ngOnInit(): void {
    this.autentifikacijaSubscription = this._autentifikacijaService.getSubjectCurrentUser().subscribe(korisnik => this.ulogovaniKorisnik = korisnik)
  }

  promenjenCheckboxOpis() {
    this.opisCheckbox = !this.opisCheckbox;
  }

  promenjenCheckboxPrimer() {
    this.primerCheckbox = !this.primerCheckbox;
  }

  prihvatanjeZahteva() {
    const resenje = {
      ime_prezime_sluzbenika: `${this.ulogovaniKorisnik?.ime} ${this.ulogovaniKorisnik.prezime}`,
      sifra_obradjenog_zahteva: this.zahtevId,
      referenca_na_zahtev: this.zahtevId,
      opis_checkbox: this.opisCheckbox,
      primer_checkbox: this.primerCheckbox
    }
    this.autorskaPravaSubscription = this._autorskaPravaService.privatiZahtev(resenje).subscribe(rezultat => {
      console.log(rezultat)
      this._toast.success("Uspešno prihvatanje zahteva");
    }, greska=> {
      this._toast.error(greska.error, 'Neuspešno prihvatanje zahteva. Probajte ponovo')
    })
  }

  odbijanjeZahteva() {
    const resenje = {
      ime_prezime_sluzbenika: `${this.ulogovaniKorisnik?.ime} ${this.ulogovaniKorisnik.prezime}`,
      razlog_odbijanja: "bla bla",
      referenca_na_zahtev: this.zahtevId,
      opis_checkbox: this.opisCheckbox,
      primer_checkbox: this.primerCheckbox
    }
    this.autorskaPravaSubscription = this._autorskaPravaService.odbijZahtev(resenje).subscribe(rezultat => {
      this._toast.success("Uspešno odbijanje zahteva");

    }, greska=> {
      this._toast.error(greska.error, 'Neuspešno odbijanje zahteva. Probajte ponovo')
    })
  }

  ngOnDestroy(): void {
    if (this.autorskaPravaSubscription){
      this.autorskaPravaSubscription.unsubscribe();
    }

    if (this.autentifikacijaSubscription){
      this.autentifikacijaSubscription.unsubscribe();
    }
  }
}
