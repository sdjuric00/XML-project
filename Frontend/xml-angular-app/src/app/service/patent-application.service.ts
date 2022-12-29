import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Patent } from '../model/patent/xml/patent';
import {map, Observable} from "rxjs";
import {
  napraviZahtevAutorskoPravoOsnovneInformacije,
  ZahtevAutorskoPravoOsnovneInformacije
} from "../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";
import {
  napraviZahtevAutorskoPravoDetaljneInformacije,
  ZahtevAutorskoPravoDetaljneInformacije
} from "../model/autorsko-pravo/obj/zahtev-autorsko-pravo-detaljne-informacije";
import * as xml2js from 'xml2js';
import {
  napraviZahtevPatentOsnovneInformacije,
  ZahtevPatentOsnovneInformacije
} from "../model/patent/obj/zahtev-patent-osnovne-informacije";

@Injectable({
  providedIn: 'root'
})
export class PatentApplicationService {
  private _api_url:string = environment.patentUrl;
  constructor(private _http: HttpClient) { }

  create(zahtevPatent: Patent){
    let headers = new HttpHeaders({ "Content-Type": "application/xml"});
    var o2x = require('object-to-xml');
    let queryParams = {};
    queryParams = {
      headers: headers,
      observe: "response",
      responseType: "text"
    };
    return this._http.post(`${this._api_url}/patent`, o2x(zahtevPatent), queryParams);
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
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let listaZahteva: ZahtevPatentOsnovneInformacije[] = [];
      parser.parseString(result.toString(),(err, result) => {
        if (result?.zahtevi?.lista_zahteva_p[0]?.zahtev_za_priznavanje_patenta) {
          result.zahtevi.lista_zahteva_p[0].zahtev_za_priznavanje_patenta.forEach(zahtev =>
            listaZahteva.push(napraviZahtevPatentOsnovneInformacije(zahtev))
          );
        }
      })
      return listaZahteva;
    }));
  }

  uzmiZahtevPoId(zahtevId: string): Observable<ZahtevAutorskoPravoDetaljneInformacije> {
    return this._http.get(`${this._api_url}/patent/neobradjeni-zahtevi/${zahtevId}`, {
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
        zahtev = napraviZahtevAutorskoPravoDetaljneInformacije(result.zahtev_za_priznavanje_patenta);
      });
      return zahtev;
    }));
  }
}
