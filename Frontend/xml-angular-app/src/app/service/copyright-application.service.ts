import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ZahtevAutorskoPravo} from "../model/copyright/zahtev-autorsko-pravo";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CopyrightApplicationService {
  private _api_url:string = environment.apiUrl;
  constructor(private _http: HttpClient,private _toast: ToastrService) { }

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
    const toast: ToastrService = this._toast;
    this._http.post(`${this._api_url}/autorska-prava`, o2x(zahtevZaAutorskoPravo), queryParams).subscribe(
      {
        next(response): void {
          toast.success('Uspešno ste poslali zahtev za unosenje u evidenciju i deponovanje autorskih dela', 'Uspešno slanje');
        },
        error(): void {
          toast.error('Desila se greška prilikom slanja zahteva!', 'Greška');
        },
      });
  }
}
