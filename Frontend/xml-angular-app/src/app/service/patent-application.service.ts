import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import { Patent } from '../model/patent/patent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatentApplicationService {
  private _api_url:string = environment.apiUrl;
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
}
