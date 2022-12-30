import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ZigService} from "../../../service/zig.service";
import {ZahtevZigDetaljneInformacije} from "../../../model/zig/obj/zahtev-zig-detaljne-informacije";

@Component({
  selector: 'app-zahtev-zig-detalji',
  templateUrl: './zahtev-zig-detalji.component.html',
  styleUrls: ['./zahtev-zig-detalji.component.css']
})
export class ZahtevZigDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevZigDetaljneInformacije;
  zigSubscription: Subscription;

  constructor(private _zigService: ZigService) {}

  ngOnInit(): void {
    this.zigSubscription = this._zigService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
      });
  }

  ngOnDestroy(): void {
    if (this.zigSubscription){
      this.zigSubscription.unsubscribe();
    }
  }

}
