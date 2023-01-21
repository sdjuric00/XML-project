import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-obradi-zahtev-autorsko-pravo',
  templateUrl: './obradi-zahtev-autorsko-pravo.component.html',
  styleUrls: ['./obradi-zahtev-autorsko-pravo.component.css']
})
export class ObradiZahtevAutorskoPravoComponent implements OnInit {

  zahtevId: string;
  obrada: boolean;

  constructor(
    private _params: ActivatedRoute,
    private _router: Router,
  ) {
    this.zahtevId = '';
    this.obrada = false;
  }

  ngOnInit(): void {
    this.zahtevId = this._params.snapshot.paramMap.get('id');
    this.obrada = this._router.url.includes("obrada");
  }

}
