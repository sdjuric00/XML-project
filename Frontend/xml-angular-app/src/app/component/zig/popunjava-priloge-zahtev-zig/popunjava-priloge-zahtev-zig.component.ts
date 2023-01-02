import {Component, Input, OnInit} from '@angular/core';
import {Korisnik} from "../../../model/korisnik/korisnik";
import {Subscription} from "rxjs";
import {AutentifikacijaService} from "../../../service/autentifikacija.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OdbijZahtevComponent} from "../../odbij-zahtev/odbij-zahtev.component";
import {ZigService} from "../../../service/zig.service";
import {ZahtevZigDetaljneInformacije} from "../../../model/zig/obj/zahtev-zig-detaljne-informacije";
import {ResenjeService} from "../../../service/resenje.service";
import {Resenje} from "../../../model/resenje/resenje";

@Component({
  selector: 'app-popunjava-priloge-zahtev-zig',
  templateUrl: './popunjava-priloge-zahtev-zig.component.html',
  styleUrls: ['./popunjava-priloge-zahtev-zig.component.css']
})
export class PopunjavaPrilogeZahtevZigComponent implements OnInit {

  @Input() zahtevId: string;
  @Input() nijePopunjeno: boolean;

  zahtev: ZahtevZigDetaljneInformacije;
  resenje: Resenje;

  primerakZnakaCheckbox: boolean;
  spisakRobeIUslugaCheckbox: boolean;
  punomocjeCheckbox: boolean;
  generalnoPunomocjeRanijePrilozenoCheckbox: boolean;
  punomocjeNaknadnoDostavljenoCheckbox: boolean;
  opstiAktCheckbox: boolean;
  dokazOPravuPrvenstvaCheckbox: boolean;
  dokazOUplatiTakseCheckbox: boolean;


  ulogovaniKorisnik: Korisnik;
  zigSubscription: Subscription;
  autentifikacijaSubscription: Subscription;
  resenjeSubscription: Subscription;
  razlog_odbijanja: string = '';

  constructor(
    private _zigService: ZigService,
    private _autentifikacijaService: AutentifikacijaService,
    private _resenjeService: ResenjeService,
    private _toast: ToastrService,
    private _router: Router,
    private dialog: MatDialog
  ) {
    this.primerakZnakaCheckbox = false;
    this.spisakRobeIUslugaCheckbox = false;
    this.punomocjeCheckbox = false;
    this.generalnoPunomocjeRanijePrilozenoCheckbox = false;
    this.punomocjeNaknadnoDostavljenoCheckbox = false;
    this.opstiAktCheckbox = false;
    this.dokazOPravuPrvenstvaCheckbox = false;
    this.dokazOUplatiTakseCheckbox = false;
    this.ulogovaniKorisnik = null;
    this.zahtev = null;
  }

  ngOnInit(): void {
    this.autentifikacijaSubscription = this._autentifikacijaService.getSubjectCurrentUser().subscribe(korisnik => this.ulogovaniKorisnik = korisnik)
    if (!this.nijePopunjeno){
      this.zigSubscription = this._zigService.uzmiZahtevPoId(this.zahtevId)
        .subscribe(result=> {
          this.zahtev = result;
          this.resenjeSubscription = this._resenjeService.uzmiResenjeZaZigPoId(result.referenca_na_resenje)
            .subscribe(resenje=> {
              this.resenje = resenje;

            });
        });
    }
  }

  promenjenCheckboxPrimerakZnaka() {
    this.primerakZnakaCheckbox = !this.primerakZnakaCheckbox;
  }

  promenjenCheckboxSpisakRobeIUsluga() {
    this.spisakRobeIUslugaCheckbox = !this.spisakRobeIUslugaCheckbox;
  }

  promenjenCheckboxPunomocje() {
    this.punomocjeCheckbox = !this.punomocjeCheckbox;
  }

  promenjenCheckboxGeneralnoPunomocjeRanijePrilozeno() {
    this.generalnoPunomocjeRanijePrilozenoCheckbox = !this.generalnoPunomocjeRanijePrilozenoCheckbox;
  }

  promenjenCheckboxPunomocjeNaknadnoDostavljeno() {
    this.punomocjeNaknadnoDostavljenoCheckbox = !this.punomocjeNaknadnoDostavljenoCheckbox;
  }

  promenjenCheckboxOpstiAkt() {
    this.opstiAktCheckbox = !this.opstiAktCheckbox;
  }

  promenjenCheckboxDokazOPravuPrvenstva() {
    this.dokazOPravuPrvenstvaCheckbox = !this.dokazOPravuPrvenstvaCheckbox;
  }

  promenjenCheckboxDokazOUplatiTakse() {
    this.dokazOUplatiTakseCheckbox = !this.dokazOUplatiTakseCheckbox;
  }

  prihvatanjeZahteva() {
    const resenje = {
      ime_prezime_sluzbenika: `${this.ulogovaniKorisnik?.ime} ${this.ulogovaniKorisnik.prezime}`,
      sifra_obradjenog_zahteva: this.zahtevId,
      referenca_na_zahtev: this.zahtevId,
      primerak_znaka_dat: this.primerakZnakaCheckbox,
      spisak_robe_dat: this.spisakRobeIUslugaCheckbox,
      punomocje_dato: this.punomocjeCheckbox,
      generalno_punomocje_ranije_prilozeno: this.generalnoPunomocjeRanijePrilozenoCheckbox,
      punomocje_ce_biti_naknadno_dostavljeno: this.punomocjeNaknadnoDostavljenoCheckbox,
      opiste_akt: this.opstiAktCheckbox,
      dokaz_o_pravu_prvenstva: this.dokazOPravuPrvenstvaCheckbox,
      dokaz_o_uplati_takse: this.dokazOUplatiTakseCheckbox
    }
    this.zigSubscription = this._zigService.privatiZahtev(resenje).subscribe(rezultat => {
      this._toast.success("Uspešno prihvatanje zahteva");
      this._router.navigate(['/pregled-zahteva-zigova']);
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
          primerak_znaka_dat: this.primerakZnakaCheckbox,
          spisak_robe_dat: this.spisakRobeIUslugaCheckbox,
          punomocje_dato: this.punomocjeCheckbox,
          generalno_punomocje_ranije_prilozeno: this.generalnoPunomocjeRanijePrilozenoCheckbox,
          punomocje_ce_biti_naknadno_dostavljeno: this.punomocjeNaknadnoDostavljenoCheckbox,
          opiste_akt: this.opstiAktCheckbox,
          dokaz_o_pravu_prvenstva: this.dokazOPravuPrvenstvaCheckbox,
          dokaz_o_uplati_takse: this.dokazOUplatiTakseCheckbox
        }
        this.zigSubscription = this._zigService.odbijZahtev(resenje).subscribe(rezultat => {
          this._toast.success("Uspešno odbijanje zahteva");
          this._router.navigate(['/pregled-zahteva-zigova']);

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
    if (this.zigSubscription){
      this.zigSubscription.unsubscribe();
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
