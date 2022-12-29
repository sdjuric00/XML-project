import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {AutentifikacijaService} from "../../service/autentifikacija.service";
import {Korisnik} from "../../model/korisnik/korisnik";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;

  ulogovanKorisnik: Korisnik = null;
  sluzbenik: boolean;
  gradjanin: boolean;

  constructor(
    private autentifikacijaService: AutentifikacijaService,
    private router: Router
  ) {
    this.sluzbenik = false;
    this.gradjanin = false;
  }

  ngOnInit(): void {
    this.authSubscription = this.autentifikacijaService
      .getSubjectCurrentUser()
      .subscribe(korisnik => {
        this.ulogovanKorisnik = korisnik;
        this.sluzbenik = this.autentifikacijaService.korisnikJeSluzbenik();
        this.gradjanin = this.autentifikacijaService.korisnikJeGradjanin();
      });
  }

  logOut() {
    this.autentifikacijaService.logOut();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  predjiNaAutorskaPrava() {
    this.router.navigate(['pregled-zahteva-autorskih-prava']);
  }

  predjiNaPatent() {
    this.router.navigate(['']);
  }

  predjiNaZig() {
    this.router.navigate(['']);
  }
}
