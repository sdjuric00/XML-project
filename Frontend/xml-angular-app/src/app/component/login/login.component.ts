import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {PrijavaZahtev} from "../../model/korisnik/prijava-zahtev";
import {AutentifikacijaService} from "../../service/autentifikacija.service";
import * as xml2js from 'xml2js';
import {PrijavaOdgovor} from "../../model/korisnik/prijava-odgovor";
import {Korisnik} from "../../model/korisnik/korisnik";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formaZaPrijavu = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    lozinka: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  hide = true;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private autentifikacijaService: AutentifikacijaService
  ) {}

  ngOnInit(): void {
  }

  uzmiPorukuOGresci() {
    if (this.formaZaPrijavu !== null && this.formaZaPrijavu.get('email') !== null) {
      if (this.formaZaPrijavu.get('email')?.hasError('required')) {
        return 'Email je obavezno polje';
      }

      return this.formaZaPrijavu.get('email')?.hasError('email')
        ? 'Unesite ispravan email'
        : '';
    }

    return 'Unesite ispravan email';
  }

  prijava() {

    if (this.formaValidna()) {
      const router = this.router;
      const zahtev: PrijavaZahtev = {
        email: this.formaZaPrijavu.get('email').value,
        lozinka: this.formaZaPrijavu.get('lozinka').value,
      };

      this.autentifikacijaService.login(zahtev).subscribe(result=> {
          const parser = new xml2js.Parser({strict: true, trim: true, tagNameProcessors: [iseciTagIme]});
          parser.parseString(result.toString(),(err, result) => {
            const prijavaOdgovor: PrijavaOdgovor = this.napraviPrijavaOdgovor(result.prijava);
            console.log(prijavaOdgovor);
            this.autentifikacijaService.setLocalStorage(prijavaOdgovor);
          })
        },
        error =>  this.toast.error(error.error, 'Neuspešna prijava na sistem')
      )
    }
  }


  formaValidna(){

    return !this.formaZaPrijavu.invalid;
  }

  ngOnDestroy(): void {

  }

  private napraviPrijavaOdgovor(prijava) {
    return {
      token: prijava.token[0],
      korisnik: new Korisnik(
        {
          grad: prijava.korisnikDTO[0].adresa[0].grad[0],
          ulica: prijava.korisnikDTO[0].adresa[0].ulica[0],
          broj: prijava.korisnikDTO[0].adresa[0].broj[0],
          postanskiBroj: prijava.korisnikDTO[0].adresa[0].postanski_broj[0],
          drzava: prijava.korisnikDTO[0].adresa[0].drzava[0]
        },
        {
          email: prijava.korisnikDTO[0].kontakt[0].email[0],
          telefon: prijava.korisnikDTO[0].kontakt[0].telefon[0],
          fax: prijava.korisnikDTO[0].kontakt[0].fax[0]
        },
        prijava.korisnikDTO[0].ime[0],
        prijava.korisnikDTO[0].lozinka[0],
        prijava.korisnikDTO[0].prezime[0],
        prijava.korisnikDTO[0].tip_naloga[0],
      )
    };
  }
}

function iseciTagIme(ime){
  let imeIseceno = ime.replace('ns2:','');

  return imeIseceno.replace('ns3:','')
}
