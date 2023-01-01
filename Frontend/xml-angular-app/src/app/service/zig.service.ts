import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";
import * as xml2js from 'xml2js';
import {
  napraviZahtevZigOsnovneInformacije,
  ZahtevZigOsnovneInformacije
} from "../model/zig/obj/zahtev-zig-osnovne-informacije";
import {
  napraviZahtevZigDetaljneInformacije,
  ZahtevZigDetaljneInformacije
} from "../model/zig/obj/zahtev-zig-detaljne-informacije";
import * as JsonToXML from "js2xmlparser";
import { OsnovnaPretraga } from '../model/pretraga/osnovna-pretraga';

@Injectable({
  providedIn: 'root'
})
export class ZigService {
  private _api_url:string = environment.zigUrl;
  constructor(private _http: HttpClient,private _toast: ToastrService) {}

  // create(zahtevZaAutorskoPravo: ZahtevAutorskoPravoXml){
  //   console.log("fafsfaf");
  //   let headers = new HttpHeaders({ "Content-Type": "application/xml"});
  //   console.log(zahtevZaAutorskoPravo);
  //   var o2x = require('object-to-xml');
  //   console.log(o2x(zahtevZaAutorskoPravo));
  //   let queryParams = {};
  //   queryParams = {
  //     headers: headers,
  //     observe: "response",
  //     responseType: "text"
  //   };
  //   const toast: ToastrService = this._toast;
  //   this._http.post(`${this._api_url}/autorska-prava`, o2x(zahtevZaAutorskoPravo), queryParams).subscribe(
  //     {
  //       next(response): void {
  //         toast.success('Uspešno ste poslali zahtev za unosenje u evidenciju i deponovanje autorskih dela', 'Uspešno slanje');
  //       },
  //       error(): void {
  //         toast.error('Desila se greška prilikom slanja zahteva!', 'Greška');
  //       },
  //     });
  // }

  uzmiNeobradjeneZahteve():Observable<ZahtevZigOsnovneInformacije[]> {
    return this._http.get(`${this._api_url}/zig/neobradjeni-zahtevi`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevZigOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        console.log(result);
        if (result?.zahtevi?.lista_zahteva_z[0]?.zahtev_za_priznanje_ziga){
          result.zahtevi.lista_zahteva_z[0].zahtev_za_priznanje_ziga.forEach(zahtev =>
            listaZahteva.push(napraviZahtevZigOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }

  uzmiObradjeneZahteve():Observable<ZahtevZigOsnovneInformacije[]> {
    return this._http.get(`${this._api_url}/zig/obradjeni-zahtevi`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevZigOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        if (result?.zahtevi?.lista_zahteva_z[0]?.zahtev_za_priznanje_ziga) {
          result.zahtevi.lista_zahteva_z[0].zahtev_za_priznanje_ziga.forEach(zahtev =>
            listaZahteva.push(napraviZahtevZigOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }

  uzmiZahtevPoId(zahtevId: string): Observable<ZahtevZigDetaljneInformacije> {
    return this._http.get(`${this._api_url}/zig/zahtev/${zahtevId}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let zahtev: ZahtevZigDetaljneInformacije;
      parser.parseString(result.toString(),(err, result) => {
        zahtev = napraviZahtevZigDetaljneInformacije(result.zahtev_za_priznanje_ziga);
      });
      return zahtev;
    }));
  }

  privatiZahtev(resenje: { ime_prezime_sluzbenika: string; punomocje_ce_biti_naknadno_dostavljeno: boolean; primerak_znaka_dat: boolean; spisak_robe_dat: boolean; generalno_punomocje_ranije_prilozeno: boolean; punomocje_dato: boolean; dokaz_o_uplati_takse: boolean; opiste_akt: boolean; dokaz_o_pravu_prvenstva: boolean; sifra_obradjenog_zahteva: string; referenca_na_zahtev: string })
    :Observable<any>{
    const resenjeXml = JsonToXML.parse("resenje", resenje);
    console.log(resenjeXml)
    return this._http.post(
      `${this._api_url}/zig/resenje/prihvatanje`,
      resenjeXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )

  }

  odbijZahtev(resenje: { ime_prezime_sluzbenika: string; punomocje_ce_biti_naknadno_dostavljeno: boolean; primerak_znaka_dat: boolean; spisak_robe_dat: boolean; generalno_punomocje_ranije_prilozeno: boolean; punomocje_dato: boolean; dokaz_o_uplati_takse: boolean; opiste_akt: boolean; dokaz_o_pravu_prvenstva: boolean; razlog_odbijanja: any; referenca_na_zahtev: string })
    :Observable<any>{
    const resenjeXml = JsonToXML.parse("resenje", resenje);
    console.log(resenjeXml)
    return this._http.post(
      `${this._api_url}/zig/resenje/odbijanje`,
      resenjeXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )

  }

  osnovnaPretraga(osnovnaPretraga: OsnovnaPretraga):Observable<ZahtevZigOsnovneInformacije[]>{
    const headers = new HttpHeaders({ "Content-Type": "application/xml"}).set("Accept", "application/xml");
    let queryParams = {};
    queryParams = {
      headers: headers,
      responseType: "text"
    };
    var o2x = require('object-to-xml');
    return this._http.post(
      `${this._api_url}/zig/osnovna-pretraga`,
      o2x(osnovnaPretraga),
      queryParams
    ).pipe(map((result:string)=>{
      console.log(result);
      result = result.replaceAll('ns2:','')
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevZigOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        console.log(result);
        if (result?.zahtevi?.lista_zahteva_z[0]?.zahtev_za_priznanje_ziga){
          result.zahtevi.lista_zahteva_z[0].zahtev_za_priznanje_ziga.forEach(zahtev =>
            listaZahteva.push(napraviZahtevZigOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }
}

