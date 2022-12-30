import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-obradi-zahtev-autorsko-pravo',
  templateUrl: './obradi-zahtev-autorsko-pravo.component.html',
  styleUrls: ['./obradi-zahtev-autorsko-pravo.component.css']
})
export class ObradiZahtevAutorskoPravoComponent implements OnInit {

  zahtevId: string;

  constructor(private _params: ActivatedRoute) {
    this.zahtevId = '';
  }

  ngOnInit(): void {
    this.zahtevId = this._params.snapshot.paramMap.get('id');
  }

}
