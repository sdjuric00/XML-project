import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-obradi-zahtev-zig',
  templateUrl: './obradi-zahtev-zig.component.html',
  styleUrls: ['./obradi-zahtev-zig.component.css']
})
export class ObradiZahtevZigComponent implements OnInit {

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
