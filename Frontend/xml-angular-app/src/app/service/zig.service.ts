import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
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
import {
  napraviZahtevZigOsnovneInformacije,
  ZahtevZigOsnovneInformacije
} from "../model/zig/obj/zahtev-zig-osnovne-informacije";
import {
  napraviZahtevZigDetaljneInformacije,
  ZahtevZigDetaljneInformacije
} from "../model/zig/obj/zahtev-zig-detaljne-informacije";
import { ZahtevAutorskoPravoXml } from '../model/autorsko-pravo/xml/zahtev-autorsko-pravo-xml';

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
}
