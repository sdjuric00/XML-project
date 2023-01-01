import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AutorskaPravaService} from "../../../service/autorska-prava.service";
import {AutentifikacijaService} from "../../../service/autentifikacija.service";
import {Korisnik} from "../../../model/korisnik/korisnik";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OdbijZahtevComponent} from "../../odbij-zahtev/odbij-zahtev.component";
import {
  ZahtevAutorskoPravoDetaljneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-detaljne-informacije";

@Component({
  selector: 'app-popunjava-priloge-zahtev-autorsko-pravo',
  templateUrl: './popunjava-priloge-zahtev-autorsko-pravo.component.html',
  styleUrls: ['./popunjava-priloge-zahtev-autorsko-pravo.component.css']
})
export class PopunjavaPrilogeZahtevAutorskoPravoComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  @Input() nijePopunjeno: boolean;
  zahtev: ZahtevAutorskoPravoDetaljneInformacije;

  opisCheckbox: boolean;
  primerCheckbox: boolean;
  ulogovaniKorisnik: Korisnik;
  autorskaPravaSubscription: Subscription;
  autentifikacijaSubscription: Subscription;
  razlog_odbijanja: string = '';

  constructor(
    private _autorskaPravaService: AutorskaPravaService,
    private _autentifikacijaService: AutentifikacijaService,
    private _toast: ToastrService,
    private _router: Router,
    private dialog: MatDialog
  ) {
    this.opisCheckbox = false;
    this.primerCheckbox = false;
    this.ulogovaniKorisnik = null;
    this.zahtev = null;
  }

  ngOnInit(): void {
    this.autentifikacijaSubscription = this._autentifikacijaService.getSubjectCurrentUser().subscribe(korisnik => this.ulogovaniKorisnik = korisnik)
    if (!this.nijePopunjeno){
      this.autorskaPravaSubscription = this._autorskaPravaService.uzmiZahtevPoId(this.zahtevId)
        .subscribe(result=> {
          this.zahtev = result;
          console.log(result.autorsko_delo.podaci_o_naslovu_prerada.autor);
        });
    }
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
      this._router.navigate(['/pregled-zahteva-autorskih-prava']);
    }, greska=> {
      this._toast.error(greska.error, 'Neuspešno prihvatanje zahteva. Probajte ponovo')
    })
  }

  odbijanjeZahteva(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      razlog_odbijanja: this.razlog_odbijanja,
    };
    const dialogRef = this.dialog.open(OdbijZahtevComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(razlog => {
      if (this.unetRazlog(razlog)){
        const resenje = {
          ime_prezime_sluzbenika: `${this.ulogovaniKorisnik?.ime} ${this.ulogovaniKorisnik.prezime}`,
          razlog_odbijanja: razlog,
          referenca_na_zahtev: this.zahtevId,
          opis_checkbox: this.opisCheckbox,
          primer_checkbox: this.primerCheckbox
        }
        this.autorskaPravaSubscription = this._autorskaPravaService.odbijZahtev(resenje).subscribe(rezultat => {
          this._toast.success("Uspešno odbijanje zahteva");
          this._router.navigate(['/pregled-zahteva-autorskih-prava']);

        }, greska=> {
          this._toast.error(greska.error, 'Neuspešno odbijanje zahteva. Probajte ponovo')
        })
      }
    });
  }

  private unetRazlog(razlog: string) {
    return razlog !== '' && razlog !== undefined;
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
