import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-obradi-zahtev-patent',
  templateUrl: './obradi-zahtev-patent.component.html',
  styleUrls: ['./obradi-zahtev-patent.component.css']
})
export class ObradiZahtevPatentComponent implements OnInit {

  zahtevId: string;

  constructor(private _params: ActivatedRoute) {
    this.zahtevId = '';
  }

  ngOnInit(): void {
    this.zahtevId = this._params.snapshot.paramMap.get('id');
  }
}
