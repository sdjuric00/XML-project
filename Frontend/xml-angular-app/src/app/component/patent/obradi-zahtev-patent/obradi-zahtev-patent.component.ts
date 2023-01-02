import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-obradi-zahtev-patent',
  templateUrl: './obradi-zahtev-patent.component.html',
  styleUrls: ['./obradi-zahtev-patent.component.css']
})
export class ObradiZahtevPatentComponent implements OnInit {

  zahtevId: string;
  obrada: boolean;

  constructor(private _params: ActivatedRoute, private _router: Router) {
    this.zahtevId = '';
    this.obrada = false;
  }

  ngOnInit(): void {
    this.zahtevId = this._params.snapshot.paramMap.get('id');
    this.obrada = this._router.url.includes("obrada");
  }
}
