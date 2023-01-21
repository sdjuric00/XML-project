import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ZahtevAutorskoPravoXml} from "../model/autorsko-pravo/xml/zahtev-autorsko-pravo-xml";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";
import * as xml2js from 'xml2js';
import {
  napraviZahtevAutorskoPravoOsnovneInformacije,
  ZahtevAutorskoPravoOsnovneInformacije
} from "../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";
import {
  napraviZahtevAutorskoPravoDetaljneInformacije,
  ZahtevAutorskoPravoDetaljneInformacije
} from "../model/autorsko-pravo/obj/zahtev-autorsko-pravo-detaljne-informacije";
import { napraviUspesnuTransformaciju, UspesnaTransformacija } from '../model/opste/uspesna-transformacija';
import { OsnovnaPretraga } from '../model/pretraga/osnovna-pretraga';
import * as JsonToXML from "js2xmlparser";
import { NaprednaPretraga } from '../model/pretraga/napredna-pretraga';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorskaPravaService {
  private _api_url:string = environment.autorskaPravaUrl;
  constructor(
    private _http: HttpClient,
    private _toast: ToastrService,
    private _router: Router
    ) { }

  create(zahtevZaAutorskoPravo: ZahtevAutorskoPravoXml){
    console.log("fafsfaf");
    let headers = new HttpHeaders({ "Content-Type": "application/xml"});
    console.log(zahtevZaAutorskoPravo);
    var o2x = require('object-to-xml');
    console.log(o2x(zahtevZaAutorskoPravo));
    let queryParams = {};
    queryParams = {
      headers: headers,
      observe: "response",
      responseType: "text"
    };
    const that = this;
    this._http.post(`${this._api_url}/autorska-prava`, o2x(zahtevZaAutorskoPravo), queryParams).subscribe(
      {
        next(response): void {
          that._toast.success('Uspešno ste poslali zahtev za unosenje u evidenciju i deponovanje autorskih dela', 'Uspešno slanje');
          that._router.navigate([`/zahtev-autorsko-pravo/obrada/${response["body"]}`]);
        },
        error(): void {
          that._toast.error('Desila se greška prilikom slanja zahteva!', 'Greška');
        },
      });
  }

  uzmiNeobradjeneZahteve(jeGradjanin: boolean):Observable<ZahtevAutorskoPravoOsnovneInformacije[]> {
    const putanja = !jeGradjanin ? "/autorska-prava/neobradjeni-zahtevi" : `/autorska-prava/neobradjeni-zahtevi-gradjanin/${localStorage.getItem('korisnik_id')}`;

    return this._http.get(`${this._api_url}${putanja}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevAutorskoPravoOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        if (result?.zahtevi?.lista_zahteva_a[0]?.zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela){
          result.zahtevi.lista_zahteva_a[0].zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela.forEach(zahtev =>
            listaZahteva.push(napraviZahtevAutorskoPravoOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }

  uzmiObradjeneZahteve(jeGradjanin: boolean):Observable<ZahtevAutorskoPravoOsnovneInformacije[]> {
    const putanja = !jeGradjanin ? "/autorska-prava/obradjeni-zahtevi" : `/autorska-prava/obradjeni-zahtevi-gradjanin/${localStorage.getItem('korisnik_id')}`;
    return this._http.get(`${this._api_url}${putanja}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevAutorskoPravoOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        if (result?.zahtevi?.lista_zahteva_a[0]?.zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela) {
          result.zahtevi.lista_zahteva_a[0].zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela.forEach(zahtev =>
            listaZahteva.push(napraviZahtevAutorskoPravoOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }

  uzmiZahtevPoId(zahtevId: string): Observable<ZahtevAutorskoPravoDetaljneInformacije> {
    return this._http.get(`${this._api_url}/autorska-prava/zahtev/${zahtevId}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let zahtev: ZahtevAutorskoPravoDetaljneInformacije;
      parser.parseString(result.toString(),(err, result) => {
        zahtev = napraviZahtevAutorskoPravoDetaljneInformacije(result.zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela);
      });
      return zahtev;
    }));
  }

  kreirajPDF(zahtevId: string, jeResenje: boolean): Observable<UspesnaTransformacija> {
    let putanja: string = jeResenje ? '/autorska-prava/resenje/' : '/autorska-prava/';
    return this._http.get(`${this._api_url}${putanja}kreiraj-pdf/${zahtevId}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let zahtev: UspesnaTransformacija;
      parser.parseString(result.toString(),(err, result) => {
        console.log(result)
        zahtev = napraviUspesnuTransformaciju(result.uspesnaTransformacija);
      });
      return zahtev;
    }));
  }

  kreirajHTML(zahtevId: string, jeResenje: boolean) {
    let putanja: string = jeResenje ? '/autorska-prava/resenje/' : '/autorska-prava/';
    return this._http.get(`${this._api_url}${putanja}kreiraj-html/${zahtevId}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let zahtev: UspesnaTransformacija;
      parser.parseString(result.toString(),(err, result) => {
        console.log(result)
        zahtev = napraviUspesnuTransformaciju(result.uspesnaTransformacija);
      });
      return zahtev;
    }));
  }

  osnovnaPretraga(osnovnaPretraga: OsnovnaPretraga):Observable<ZahtevAutorskoPravoOsnovneInformacije[]>{
    const headers = new HttpHeaders({ "Content-Type": "application/xml"}).set("Accept", "application/xml");
    let queryParams = {};
    queryParams = {
      headers: headers,
      responseType: "text"
    };
    var o2x = require('object-to-xml');
    return this._http.post(
      `${this._api_url}/autorska-prava/osnovna-pretraga`,
      o2x(osnovnaPretraga),
      queryParams
    ).pipe(map((result:string)=>{
      result = result.replaceAll('ns2:','')
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevAutorskoPravoOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        if (result?.zahtevi?.lista_zahteva_a[0]?.zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela) {
          result.zahtevi.lista_zahteva_a[0].zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela.forEach(zahtev =>
            listaZahteva.push(napraviZahtevAutorskoPravoOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
  }));
}
  privatiZahtev(resenje: { ime_prezime_sluzbenika: string; opis_checkbox: boolean; sifra_obradjenog_zahteva: string; primer_checkbox: boolean; referenca_na_zahtev: string })
  :Observable<any>{
    const resenjeXml = JsonToXML.parse("resenje", resenje);
    console.log(resenjeXml)
    return this._http.post(
      `${this._api_url}/autorska-prava/resenje/prihvatanje`,
      resenjeXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )

  }

  odbijZahtev(resenje: { ime_prezime_sluzbenika: string; opis_checkbox: boolean; razlog_odbijanja: string; primer_checkbox: boolean; referenca_na_zahtev: string })
    :Observable<any>{
    const resenjeXml = JsonToXML.parse("resenje", resenje);
    console.log(resenjeXml)
    return this._http.post(
      `${this._api_url}/autorska-prava/resenje/odbijanje`,
      resenjeXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )

  }

  kreirajJson(zahtevId: string){
    return this._http.get(`${this._api_url}/autorska-prava/kreiraj-json/${zahtevId}`, {
      headers: new HttpHeaders().set('Accept' , 'application/xml'),
      responseType:"text"
    }
  ).pipe(map(result=>{
    result = result.replaceAll('ns2:', '');
    result = result.replaceAll('ns3:', '');
    result = result.replaceAll('ns4:', '');
    const parser = new xml2js.Parser({ strict: true, trim: true });
    let zahtev: UspesnaTransformacija;
    parser.parseString(result.toString(),(err, result) => {
      console.log(result)
      zahtev = napraviUspesnuTransformaciju(result.uspesnaTransformacija);
    });
    return zahtev;
  }));
  }

  kreirajRdf(zahtevId: string){
    return this._http.get(`${this._api_url}/autorska-prava/kreiraj-rdf/${zahtevId}`, {
      headers: new HttpHeaders().set('Accept' , 'application/xml'),
      responseType:"text"
    }
  ).pipe(map(result=>{
    result = result.replaceAll('ns2:', '');
    result = result.replaceAll('ns3:', '');
    result = result.replaceAll('ns4:', '');
    const parser = new xml2js.Parser({ strict: true, trim: true });
    let zahtev: UspesnaTransformacija;
    parser.parseString(result.toString(),(err, result) => {
      console.log(result)
      zahtev = napraviUspesnuTransformaciju(result.uspesnaTransformacija);
    });
    return zahtev;
  }));
  }

  naprednaPretraga(napredna_pretraga: NaprednaPretraga){
    const headers = new HttpHeaders({ "Content-Type": "application/xml"}).set("Accept", "application/xml");
    let queryParams = {};
    queryParams = {
      headers: headers,
      responseType: "text"
    };
    var o2x = require('object-to-xml');
    return this._http.post(
      `${this._api_url}/autorska-prava/napredna-pretraga`,
      o2x(napredna_pretraga),
      queryParams
    ).pipe(map((result:string)=>{
      result = result.replaceAll('ns2:','')
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevAutorskoPravoOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        console.log(result);
        if (result?.zahtevi?.lista_zahteva_a[0]?.zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela) {
          result.zahtevi.lista_zahteva_a[0].zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela.forEach(zahtev =>
            listaZahteva.push(napraviZahtevAutorskoPravoOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
  }))}

}
