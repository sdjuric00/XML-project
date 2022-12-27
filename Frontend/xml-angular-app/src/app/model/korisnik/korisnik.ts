import {Adresa} from "../adresa";
import {Kontakt} from "../kontakt";

export interface Korisnik {
  email: string;
  ime: string;
  prezime: string;
  lozinka: string;
  tipNaloga: string;
}

export class Korisnik implements Korisnik {
  id?: string;
  email: string;
  ime: string;
  lozinka: string;
  prezime: string;
  tipNaloga: string;
  adresa: Adresa;
  kontakt: Kontakt;

  constructor(adresa: Adresa, kontakt: Kontakt, ime: string, lozinka: string, prezime: string, tipNaloga: string, id?:string) {
    this.ime = ime;
    this.lozinka = lozinka;
    this.prezime = prezime;
    this.tipNaloga = tipNaloga;
    this.id = id;
    this.adresa = adresa;
    this.kontakt = kontakt;
  }
}
