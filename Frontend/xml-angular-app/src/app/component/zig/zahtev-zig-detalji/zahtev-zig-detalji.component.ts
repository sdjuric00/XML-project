import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ZigService} from "../../../service/zig.service";
import {ZahtevZigDetaljneInformacije} from "../../../model/zig/obj/zahtev-zig-detaljne-informacije";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zahtev-zig-detalji',
  templateUrl: './zahtev-zig-detalji.component.html',
  styleUrls: ['./zahtev-zig-detalji.component.css']
})
export class ZahtevZigDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevZigDetaljneInformacije;
  zigSubscription: Subscription;
  brojevi: string[] = ['1. Hemijski proizvodi', '2. ', '3. ', '4. ', '5. '];

  public slikeUrl:string = environment.staticPodaciSlikeZig;

  constructor(private _zigService: ZigService) {
  }

  ngOnInit(): void {
    this.zigSubscription = this._zigService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
        console.log(result);
      });
  }

  ngOnDestroy(): void {
    if (this.zigSubscription){
      this.zigSubscription.unsubscribe();
    }
  }

  daLiJeIzabranBroj(broj: string): boolean {
    let pronadjeno: boolean = false;
    this.zahtev.nicanska_klasifikacija.forEach(vrednost => {
      if (vrednost.includes(broj)){
        pronadjeno = true;
      }
    })

    return pronadjeno;
  }
}
