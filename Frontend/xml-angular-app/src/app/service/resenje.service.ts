import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";
import * as xml2js from 'xml2js';
import * as JsonToXML from "js2xmlparser";
import {napraviResenje, Resenje} from "../model/resenje/resenje";

@Injectable({
  providedIn: 'root'
})
export class ResenjeService {
  constructor(private _http: HttpClient,private _toast: ToastrService) {}

  uzmiResenjeZaZigPoId(id: string): Observable<Resenje> {
    const api_url:string = environment.zigUrl;
    return this._http.get(`${api_url}/zig/resenje/${id}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
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
    return this._http.get(`${api_url}/patenti/resenje/${id}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
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

  uzmiResenjeZaAutorskoDeloPoId(id: string): Observable<Resenje> {
    const api_url:string = environment.autorskaPravaUrl;
    return this._http.get(`${api_url}/autorska-prava/resenje/${id}`, {
        headers: new HttpHeaders().set('Accept' , 'application/xml'),
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
}
