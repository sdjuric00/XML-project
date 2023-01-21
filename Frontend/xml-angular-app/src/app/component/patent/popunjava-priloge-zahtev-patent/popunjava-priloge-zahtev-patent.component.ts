import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Korisnik} from "../../../model/korisnik/korisnik";
import {Subscription} from "rxjs";
import {AutentifikacijaService} from "../../../service/autentifikacija.service";
import {ToastrService} from "ngx-toastr";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OdbijZahtevComponent} from "../../odbij-zahtev/odbij-zahtev.component";
import {Resenje} from "../../../model/resenje/resenje";
import {ZahtevPatentDetaljneInformacije} from "../../../model/patent/obj/zahtev-patent-detaljne-informacije";
import {ResenjeService} from "../../../service/resenje.service";

@Component({
  selector: 'app-popunjava-priloge-zahtev-patent',
  templateUrl: './popunjava-priloge-zahtev-patent.component.html',
  styleUrls: ['./popunjava-priloge-zahtev-patent.component.css']
})
export class PopunjavaPrilogeZahtevPatentComponent implements OnInit, OnDestroy {
  @Input() zahtevId: string;
  @Input() nijePopunjeno: boolean;

  zahtev: ZahtevPatentDetaljneInformacije;
  resenje: Resenje;

  ulogovaniKorisnik: Korisnik;
  patentSubscription: Subscription;
  autentifikacijaSubscription: Subscription;
  resenjeSubscription: Subscription;
  razlog_odbijanja: string = '';
  jeGradjanin: boolean;

  constructor(
    private _patentService: PatentApplicationService,
    private _autentifikacijaService: AutentifikacijaService,
    private _resenjeService: ResenjeService,
    private _toast: ToastrService,
    private _router: Router,
    private dialog: MatDialog
  ) {
    this.zahtev = null;
    this.jeGradjanin = false;
  }

  ngOnInit(): void {
    this.autentifikacijaSubscription = this._autentifikacijaService.getSubjectCurrentUser().subscribe(
      korisnik => {
        if (korisnik) {
         this.ulogovaniKorisnik = korisnik
         this.jeGradjanin = this.ulogovaniKorisnik.tipNaloga === "gradjanin";
        }
      }
    );
    if (!this.nijePopunjeno){
      this.patentSubscription = this._patentService.uzmiZahtevPoId(this.zahtevId)
        .subscribe(result=> {
          this.zahtev = result;
          this.resenjeSubscription = this._resenjeService.uzmiResenjeZaPatentPoId(result.referenca_na_resenje)
            .subscribe(resenje=> {
              this.resenje = resenje;

            });
        });
    }
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

    if (this.resenjeSubscription){
      this.resenjeSubscription.unsubscribe();
    }
  }

  odbijenoIliPrihvaceno(): string {
    console.log(this.resenje);
    if (this.resenje.razlog_odbijanja){

      return "ODBIJEN";
    }

    return "PRIHVAĆEN"
  }

}
