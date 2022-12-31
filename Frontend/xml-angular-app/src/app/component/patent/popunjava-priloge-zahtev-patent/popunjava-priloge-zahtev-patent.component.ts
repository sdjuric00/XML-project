import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Korisnik} from "../../../model/korisnik/korisnik";
import {Subscription} from "rxjs";
import {AutentifikacijaService} from "../../../service/autentifikacija.service";
import {ToastrService} from "ngx-toastr";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OdbijZahtevComponent} from "../../odbij-zahtev/odbij-zahtev.component";

@Component({
  selector: 'app-popunjava-priloge-zahtev-patent',
  templateUrl: './popunjava-priloge-zahtev-patent.component.html',
  styleUrls: ['./popunjava-priloge-zahtev-patent.component.css']
})
export class PopunjavaPrilogeZahtevPatentComponent implements OnInit, OnDestroy {
  @Input() zahtevId: string;
  ulogovaniKorisnik: Korisnik;
  patentSubscription: Subscription;
  autentifikacijaSubscription: Subscription;
  razlog_odbijanja: string = '';
  constructor(
    private _patentService: PatentApplicationService,
    private _autentifikacijaService: AutentifikacijaService,
    private _toast: ToastrService,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.autentifikacijaSubscription = this._autentifikacijaService.getSubjectCurrentUser().subscribe(korisnik => this.ulogovaniKorisnik = korisnik)
  }

  prihvatanjeZahteva() {
    const resenje = {
      ime_prezime_sluzbenika: `${this.ulogovaniKorisnik?.ime} ${this.ulogovaniKorisnik.prezime}`,
      referenca_na_zahtev: this.zahtevId,
      sifra_obradjenog_zahteva: this.zahtevId,
    }
    this.patentSubscription = this._patentService.privatiZahtev(resenje).subscribe(rezultat => {
      console.log(rezultat)
      this._toast.success("Uspešno prihvatanje zahteva");
      this._router.navigate(['/pregled-zahteva-patenta']);
    }, greska=> {
      this._toast.error(greska.error, 'Neuspešno prihvatanje zahteva. Probajte ponovo')
    })
  }

  odbijanjeZahteva() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      razlog_odbijanja: this.razlog_odbijanja,
    };
    const dialogRef = this.dialog.open(OdbijZahtevComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(razlog => {
      if (this.unetRazlog(razlog)){
        const resenje = {
          ime_prezime_sluzbenika: `${this.ulogovaniKorisnik?.ime} ${this.ulogovaniKorisnik.prezime}`,
          referenca_na_zahtev: this.zahtevId,
          razlog_odbijanja: razlog,
        }
        this.patentSubscription = this._patentService.odbijZahtev(resenje).subscribe(rezultat => {
          this._toast.success("Uspešno odbijanje zahteva");
          this._router.navigate(['/pregled-zahteva-patenta']);

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
    if (this.patentSubscription){
      this.patentSubscription.unsubscribe();
    }

    if (this.autentifikacijaSubscription){
      this.autentifikacijaSubscription.unsubscribe();
    }
  }

}
