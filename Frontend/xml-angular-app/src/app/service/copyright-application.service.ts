import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ZahtevAutorskoPravo} from "../model/copyright/zahtev-autorsko-pravo";

@Injectable({
  providedIn: 'root'
})
export class CopyrightApplicationService {
  private _api_url:string = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  create(zahtevZaAutorskoPravo: ZahtevAutorskoPravo){
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
    this._http.post(`${this._api_url}/autorska-prava`, o2x(zahtevZaAutorskoPravo), queryParams).subscribe(response => {
      console.log(response);
    })
  }
}
