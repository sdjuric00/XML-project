import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Patent } from '../model/patent/xml/patent';
import {map, Observable} from "rxjs";
import * as xml2js from 'xml2js';
import {
  napraviZahtevPatentOsnovneInformacije,
  ZahtevPatentOsnovneInformacije
} from "../model/patent/obj/zahtev-patent-osnovne-informacije";
import {
  napraviZahtevPatentDetaljneInformacije,
  ZahtevPatentDetaljneInformacije
} from "../model/patent/obj/zahtev-patent-detaljne-informacije";
import { OsnovnaPretraga } from '../model/pretraga/osnovna-pretraga';
import * as JsonToXML from "js2xmlparser";
import { ToastrService } from 'ngx-toastr';
import { napraviUspesnuTransformaciju, UspesnaTransformacija } from '../model/opste/uspesna-transformacija';
import { NaprednaPretraga } from '../model/pretraga/napredna-pretraga';

@Injectable({
  providedIn: 'root'
})
export class PatentApplicationService {
  private _api_url:string = environment.patentUrl;
  constructor(private _http: HttpClient,private _toast: ToastrService) { }

  dobaviIdPoBrojuPrijave(brojPrijave: string) {
    console.log(brojPrijave)
    return this._http.get(`${this._api_url}/patent/broj-prijave/${brojPrijave}`, {
      headers: new HttpHeaders(),
      responseType:"text"
    }
  )}

  create(zahtevPatent: Patent, convert: boolean) {
    let headers = new HttpHeaders({ "Content-Type": "application/xml"});
    console.log(zahtevPatent);
    var o2x = require('object-to-xml');
    let queryParams = {};
    queryParams = {
      headers: headers,
      observe: "response",
      responseType: "text"
    };
    const toast: ToastrService = this._toast;
    if(convert){
      return this._http.post(`${this._api_url}/patent`, o2x(zahtevPatent), queryParams);
    }
    
    return this._http.post(`${this._api_url}/patent`, zahtevPatent, queryParams);
  }

  uzmiNeobradjeneZahteve():Observable<ZahtevPatentOsnovneInformacije[]> {
    return this._http.get(`${this._api_url}/patent/neobradjeni-zahtevi`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevPatentOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        if (result?.zahtevi?.lista_zahteva_p[0]?.zahtev_za_priznavanje_patenta){
          result.zahtevi.lista_zahteva_p[0].zahtev_za_priznavanje_patenta.forEach(zahtev =>
            listaZahteva.push(napraviZahtevPatentOsnovneInformacije(zahtev))
          );
        }

      })
      return listaZahteva;
    }));
  }

  uzmiObradjeneZahteve():Observable<ZahtevPatentOsnovneInformacije[]> {
    return this._http.get(`${this._api_url}/patent/obradjeni-zahtevi`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      console.log(result);
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevPatentOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        console.log(result);
        if (result?.zahtevi?.lista_zahteva_p[0]?.zahtev_za_priznavanje_patenta) {
          result.zahtevi.lista_zahteva_p[0].zahtev_za_priznavanje_patenta.forEach(zahtev =>
            listaZahteva.push(napraviZahtevPatentOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }

  uzmiZahtevPoId(zahtevId: string): Observable<ZahtevPatentDetaljneInformacije> {
    return this._http.get(`${this._api_url}/patent/zahtev/${zahtevId}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      console.log(result);
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let zahtev: ZahtevPatentDetaljneInformacije;
      parser.parseString(result.toString(),(err, result) => {
        zahtev = napraviZahtevPatentDetaljneInformacije(result.zahtev_za_priznavanje_patenta);
      });
      return zahtev;
    }));
  }

  osnovnaPretraga(osnovnaPretraga: OsnovnaPretraga):Observable<ZahtevPatentOsnovneInformacije[]>{
    const headers = new HttpHeaders({ "Content-Type": "application/xml"}).set("Accept", "application/xml");
    let queryParams = {};
    queryParams = {
      headers: headers,
      responseType: "text"
    };
    var o2x = require('object-to-xml');
    return this._http.post(
      `${this._api_url}/patent/osnovna-pretraga`,
      o2x(osnovnaPretraga),
      queryParams
    ).pipe(map((result:string)=>{
      console.log(result);
      result = result.replaceAll('ns2:','')
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevPatentOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        console.log(result);
        if (result?.zahtevi?.lista_zahteva_p[0]?.zahtev_za_priznavanje_patenta) {
          result.zahtevi.lista_zahteva_p[0].zahtev_za_priznavanje_patenta.forEach(zahtev =>
            listaZahteva.push(napraviZahtevPatentOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
  }));
}
  privatiZahtev(resenje: { ime_prezime_sluzbenika: string; referenca_na_zahtev: string, sifra_obradjenog_zahteva: string; })
    :Observable<any>{
    const resenjeXml = JsonToXML.parse("resenje", resenje);
    console.log(resenjeXml)
    return this._http.post(
      `${this._api_url}/patenti/resenje/prihvatanje`,
      resenjeXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )
  }

  odbijZahtev(resenje: { ime_prezime_sluzbenika: string; referenca_na_zahtev: string; razlog_odbijanja: string;})
    :Observable<any>{
    const resenjeXml = JsonToXML.parse("resenje", resenje);
    console.log(resenjeXml)
    return this._http.post(
      `${this._api_url}/patenti/resenje/odbijanje`,
      resenjeXml,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/xml').set('Accept' , 'application/xml'),
        responseType:"text"
      }
    )

  }

  kreirajPDF(zahtevId: string): Observable<UspesnaTransformacija> {
    return this._http.get(`${this._api_url}/patent/kreiraj-pdf/${zahtevId}`, {
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

  refencirajuDokumenti(zahtevId: string){
    return this._http.get(`${this._api_url}/patent/dokumenti-referenciraju/${zahtevId}`, {
      headers: new HttpHeaders().set('Accept' , 'application/xml'),
      responseType:"text"
    }
  ).pipe(map(result=>{
    result = result.replaceAll('ns2:', '');
    result = result.replaceAll('ns3:', '');
    console.log(result);
    const parser = new xml2js.Parser({ strict: true, trim: true });
    let listaZahteva: ZahtevPatentOsnovneInformacije[] = [];
    parser.parseString(result.toString(),(err, result) => {
      console.log(result);
      if (result?.zahtevi?.lista_zahteva_p[0]?.zahtev_za_priznavanje_patenta) {
        result.zahtevi.lista_zahteva_p[0].zahtev_za_priznavanje_patenta.forEach(zahtev =>
          listaZahteva.push(napraviZahtevPatentOsnovneInformacije(zahtev))
        );
      }
    })
    return listaZahteva;
  }));
  }

  kreirajHTML(zahtevId: string) {
    return this._http.get(`${this._api_url}/patent/kreiraj-html/${zahtevId}`, {
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
    return this._http.get(`${this._api_url}/patent/kreiraj-json/${zahtevId}`, {
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
    return this._http.get(`${this._api_url}/patent/kreiraj-rdf/${zahtevId}`, {
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
    console.log(o2x(napredna_pretraga));
    return this._http.post(
      `${this._api_url}/patent/napredna-pretraga`,
      o2x(napredna_pretraga),
      queryParams
    ).pipe(map((result:string)=>{
      console.log(result);
      result = result.replaceAll('ns2:','')
      result = result.replaceAll('ns3:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevPatentOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        console.log(result);
        if (result?.zahtevi?.lista_zahteva_p[0]?.zahtev_za_priznavanje_patenta) {
          result.zahtevi.lista_zahteva_p[0].zahtev_za_priznavanje_patenta.forEach(zahtev =>
            listaZahteva.push(napraviZahtevPatentOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
  }))
  }

}
