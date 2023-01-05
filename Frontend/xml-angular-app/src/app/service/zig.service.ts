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
import { Trademark } from '../model/zig/xml/trademark';
import { napraviUspesnuTransformaciju, UspesnaTransformacija } from '../model/opste/uspesna-transformacija';
import { PlaceneTakse } from '../model/zig/xml/placene-takse';
import { napraviPlacenuTaksu, TaksaObj } from '../model/zig/obj/taksa';

import { NaprednaPretraga } from '../model/pretraga/napredna-pretraga';

@Injectable({
  providedIn: 'root'
})
export class ZigService {
  private _api_url:string = environment.zigUrl;
  constructor(private _http: HttpClient,private _toast: ToastrService) {}

  create(zahtevZig: Trademark){
    console.log(zahtevZig);
    let headers = new HttpHeaders({ "Content-Type": "application/xml"});
    console.log(zahtevZig);
    var o2x = require('object-to-xml');
    console.log(o2x(zahtevZig));
    let queryParams = {};
    queryParams = {
      headers: headers,
      observe: "response",
      responseType: "text"
    };
    const toast: ToastrService = this._toast;
    
    return this._http.post(`${this._api_url}/zig`, o2x(zahtevZig), queryParams);
  }

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

  kreirajHTML(zahtevId: string) {
    return this._http.get(`${this._api_url}/zig/kreiraj-html/${zahtevId}`, {
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

  kreirajJson(zahtevId: string){
    return this._http.get(`${this._api_url}/zig/kreiraj-json/${zahtevId}`, {
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

  kreirajPDF(zahtevId: string): Observable<UspesnaTransformacija> {
    return this._http.get(`${this._api_url}/zig/kreiraj-pdf/${zahtevId}`, {
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

  dobaviOcekivanoPlacanje(zahtevId: string): Observable<TaksaObj> {
    return this._http.get(`${this._api_url}/zig/dobavi-ocekivano-placanje/${zahtevId}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let zahtev: TaksaObj;
      parser.parseString(result.toString(),(err, result) => {
        zahtev = napraviPlacenuTaksu(result.TaksaObj);
      });

      return zahtev;
    }));
  }
  kreirajRdf(zahtevId: string){
    return this._http.get(`${this._api_url}/zig/kreiraj-rdf/${zahtevId}`, {
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
      `${this._api_url}/zig/napredna-pretraga`,
      o2x(napredna_pretraga),
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
  }))}


}

