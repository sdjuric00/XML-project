import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popunjava-priloge-zahtev-autorsko-pravo',
  templateUrl: './popunjava-priloge-zahtev-autorsko-pravo.component.html',
  styleUrls: ['./popunjava-priloge-zahtev-autorsko-pravo.component.css']
})
export class PopunjavaPrilogeZahtevAutorskoPravoComponent implements OnInit {

  opisCheckbox: boolean;
  primerCheckbox: boolean;
  constructor() {
    this.opisCheckbox = false;
    this.primerCheckbox = false;
  }

  ngOnInit(): void {
  }

  promenjenCheckboxOpis() {
    this.opisCheckbox = !this.opisCheckbox;
  }

  promenjenCheckboxPrimer() {
    this.primerCheckbox = !this.primerCheckbox;
  }

  prihvatanjeZahteva() {

  }

  odbijanjeZahteva() {

  }
}
