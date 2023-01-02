import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ZahtevZigOsnovneInformacije} from "../../../model/zig/obj/zahtev-zig-osnovne-informacije";

@Component({
  selector: 'app-red-zig',
  templateUrl: './red-zig.component.html',
  styleUrls: ['./red-zig.component.css']
})
export class RedZigComponent implements OnInit {

  @Input() zahtev: ZahtevZigOsnovneInformacije;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  obradaZahteva() {
    this._router.navigate(['/zahtev-zig/obrada', this.zahtev.id]);
  }

  detaljiZahteva() {
    this._router.navigate(['/zahtev-zig/detalji', this.zahtev.id]);
  }
}
