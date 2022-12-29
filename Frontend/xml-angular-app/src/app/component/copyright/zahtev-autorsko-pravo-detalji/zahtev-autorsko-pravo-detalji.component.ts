import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ZahtevAutorskoPravoDetaljneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-detaljne-informacije";
import {AutorskaPravaService} from "../../../service/autorska-prava.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-zahtev-autorsko-pravo-detalji',
  templateUrl: './zahtev-autorsko-pravo-detalji.component.html',
  styleUrls: ['./zahtev-autorsko-pravo-detalji.component.css']
})
export class ZahtevAutorskoPravoDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevAutorskoPravoDetaljneInformacije;
  autorskaPravaSubscription: Subscription;

  constructor(private _autorskaPravaService: AutorskaPravaService) {}

  ngOnInit(): void {
    this.autorskaPravaSubscription = this._autorskaPravaService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
        console.log(result.autorsko_delo.podaci_o_naslovu_prerada.autor);
      });
  }

  ngOnDestroy(): void {
    if (this.autorskaPravaSubscription){
      this.autorskaPravaSubscription.unsubscribe();
    }
  }

}
