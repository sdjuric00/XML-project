import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";
import * as xml2js from 'xml2js';
import * as JsonToXML from "js2xmlparser";
import {napraviResenje, Resenje} from "../model/resenje/resenje";
import {Izvestaj, IzvestajZaPDF, napraviIzvestaj} from "../model/izvestaj/izvestaj";
import { napraviUspesnuTransformaciju, UspesnaTransformacija } from '../model/opste/uspesna-transformacija';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {
  constructor(private _http: HttpClient,private _toast: ToastrService) {}

  uzmiIzvestajZig(id: string): Observable<Resenje> {
    const api_url:string = environment.zigUrl;
    return this._http.get(`${api_url}/zig/izvestaj`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml').set('Content-Type', 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let resenje: Resenje;
      parser.parseString(result.toString(),(err, result) => {
        resenje = napraviResenje(result.resenje);
      });
      return resenje;
    }));
  }

  uzmiResenjeZaPatentPoId(id: string): Observable<Resenje> {
    const api_url:string = environment.patentUrl;
    return this._http.get(`${api_url}/patenti/izvestaj`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml').set('Content-Type', 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let resenje: Resenje;
      parser.parseString(result.toString(),(err, result) => {
        resenje = napraviResenje(result.resenje);
      });
      return resenje;
    }));
  }

  uzmiIzvestajAutorskaPrava(opsegDatuma): Observable<Izvestaj> {
    const opsegDatumaXml = JsonToXML.parse("datumi", opsegDatuma);
    console.log(opsegDatumaXml)
    const api_url:string = environment.autorskaPravaUrl;
    return this._http.post(`${api_url}/autorska-prava/izvestaj`, opsegDatumaXml, {
        headers: new HttpHeaders().set('Accept' , 'application/xml').set('Content-Type', 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let izvestaj: Izvestaj;
      parser.parseString(result.toString(),(err, result) => {

        izvestaj = napraviIzvestaj(result.izvestaj);
      });
      return izvestaj;
    }));
  }

  uzmiIzvestajPatenti(opsegDatuma): Observable<Izvestaj> {
    const opsegDatumaXml = JsonToXML.parse("datumi", opsegDatuma);
    const api_url:string = environment.patentUrl;
    return this._http.post(`${api_url}/patent/izvestaj`, opsegDatumaXml, {
        headers: new HttpHeaders().set('Accept' , 'application/xml').set('Content-Type', 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let izvestaj: Izvestaj;
      parser.parseString(result.toString(),(err, result) => {

        izvestaj = napraviIzvestaj(result.izvestaj);
      });
      return izvestaj;
    }));
  }

  uzmiIzvestajZigovi(opsegDatuma): Observable<Izvestaj> {
    const opsegDatumaXml = JsonToXML.parse("datumi", opsegDatuma);
    console.log(opsegDatumaXml)
    const api_url:string = environment.zigUrl;
    return this._http.post(`${api_url}/zig/izvestaj`, opsegDatumaXml, {
        headers: new HttpHeaders().set('Accept' , 'application/xml').set('Content-Type', 'application/xml'),
        responseType:"text"
      }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      result = result.replaceAll('opste:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let izvestaj: Izvestaj;
      parser.parseString(result.toString(),(err, result) => {

        izvestaj = napraviIzvestaj(result.izvestaj);
      });
      return izvestaj;
    }));
  }

  kreirajPDF(izvestaj: IzvestajZaPDF): Observable<UspesnaTransformacija> {
    const api_url:string = environment.korisniciUrl;
    console.log(izvestaj);
    return this._http.post(`${api_url}/korisnici/izvestaj-pdf`, izvestaj, {
      headers: new HttpHeaders().set('Accept' , 'application/xml').set('Content-Type', 'application/xml'),
      responseType:"text"
    }
    ).pipe(map(result=>{
      result = result.replaceAll('ns2:', '');
      result = result.replaceAll('ns3:', '');
      result = result.replaceAll('ns4:', '');
      const parser = new xml2js.Parser({ strict: true, trim: true });
      let resenje: UspesnaTransformacija;
      parser.parseString(result.toString(),(err, result) => {
        resenje = napraviUspesnuTransformaciju(result.resenje);
      });
      return resenje;
    }));
  }

}
