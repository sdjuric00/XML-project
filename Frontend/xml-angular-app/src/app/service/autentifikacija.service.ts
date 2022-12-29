import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import {Router} from '@angular/router';
import {Korisnik} from "../model/korisnik/korisnik";
import {environment} from "../../environments/environment";
import {PrijavaZahtev} from "../model/korisnik/prijava-zahtev";
import {PrijavaOdgovor} from "../model/korisnik/prijava-odgovor";
import * as JsonToXML from "js2xmlparser";
import {KorisnikXML} from "../model/korisnik/xml/KorisnikXML";

@Injectable({
  providedIn: 'root',
})
export class AutentifikacijaService {
  private _api_url = environment.korisniciUrl;
  private _autentifikacija_url = `${this._api_url}/korisnici`;
  public prijavljenKorisnik$: BehaviorSubject<Korisnik>;

  ULOGA_GRADJANIN: string = 'gradjanin';
  ULOGA_SLUZBENIK: string = 'sluzbenik';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.prijavljenKorisnik$ = new BehaviorSubject<Korisnik>(null);
  }

  login(prijavaZahtev: PrijavaZahtev): Observable<any> {
    const prijavaZahtevXml = JsonToXML.parse("prijava", prijavaZahtev);
    console.log(prijavaZahtevXml)
    return this.http.post(
      `${this._autentifikacija_url}/prijava`,
      prijavaZahtevXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )
  }

  setLocalStorage(prijavaOdgovor: PrijavaOdgovor): void {
    localStorage.setItem('token', prijavaOdgovor.token);
    localStorage.setItem('korisnik', JSON.stringify(prijavaOdgovor.korisnik));
    this.prijavljenKorisnik$.next(prijavaOdgovor.korisnik);
  }

  logOut() {
    this.prijavljenKorisnik$.next(null);
    localStorage.clear();
  }

  uzetiUlogovanogKorisnika(): Korisnik {
    const korisnikString = localStorage.getItem('korisnik');
    if (korisnikString !== null && korisnikString !== undefined) {

      return JSON.parse(korisnikString);
    }

    return null;
  }

  korisnikJeGradjanin(): boolean {
    const korisnik: Korisnik = this.uzetiUlogovanogKorisnika();

    return korisnik && korisnik.tipNaloga === this.ULOGA_GRADJANIN;
  }

  korisnikJeSluzbenik(): boolean {
    const korisnik: Korisnik = this.uzetiUlogovanogKorisnika();

    return korisnik && korisnik.tipNaloga === this.ULOGA_SLUZBENIK;
  }

  setUserInLocalStorage(korisnik: Korisnik): void {
    localStorage.setItem('korisnik', JSON.stringify(korisnik));
    this.prijavljenKorisnik$.next(korisnik);
  }

  getSubjectCurrentUser(): BehaviorSubject<Korisnik> {
    let korisnik = localStorage.getItem('korisnik');
    if (korisnik !== null && korisnik !== undefined) {
      const isparsiranKorisnik: Korisnik = JSON.parse(korisnik);
      const prijavljeniKorisnik: Korisnik = new Korisnik(
        {
          grad: isparsiranKorisnik.adresa.grad,
          ulica: isparsiranKorisnik.adresa.ulica,
          broj: isparsiranKorisnik.adresa.broj,
          postanskiBroj: isparsiranKorisnik.adresa.postanskiBroj,
          drzava: isparsiranKorisnik.adresa.drzava
        },
        {
          email: isparsiranKorisnik.kontakt.email,
          telefon: isparsiranKorisnik.kontakt.telefon,
          fax: isparsiranKorisnik.kontakt.fax
        },
        isparsiranKorisnik.ime,
        isparsiranKorisnik.lozinka,
        isparsiranKorisnik.prezime,
        isparsiranKorisnik.tipNaloga
      );
      this.prijavljenKorisnik$.next(prijavljeniKorisnik);
    } else {
      this.prijavljenKorisnik$.next(null);
    }

    return this.prijavljenKorisnik$;
  }


  getToken() {
    return localStorage.getItem('token');
  }

  registracija(korisnikXML: KorisnikXML) {
    const headers = new HttpHeaders({ "Content-Type": "application/xml"}).set("Accept", "application/xml");
    let queryParams = {};
    queryParams = {
      headers: headers,
      observe: "response",
      responseType: "text"
    };
    var o2x = require('object-to-xml');
    return this.http.post(
      `${this._autentifikacija_url}/registracija`,
      o2x(korisnikXML),
      queryParams
    )

  }
}
