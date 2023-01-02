import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ZahtevAutorskoPravoDetaljneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-detaljne-informacije";
import {AutorskaPravaService} from "../../../service/autorska-prava.service";
import {Subscription} from "rxjs";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zahtev-autorsko-pravo-detalji',
  templateUrl: './zahtev-autorsko-pravo-detalji.component.html',
  styleUrls: ['./zahtev-autorsko-pravo-detalji.component.css']
})
export class ZahtevAutorskoPravoDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevAutorskoPravoDetaljneInformacije;
  autorskaPravaSubscription: Subscription;

  public slikeUrl:string = environment.staticPodaciSlike;

  constructor(private _autorskaPravaService: AutorskaPravaService) {}

  ngOnInit(): void {
    this.autorskaPravaSubscription = this._autorskaPravaService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
        console.log(result);
      });
  }

  ngOnDestroy(): void {
    if (this.autorskaPravaSubscription){
      this.autorskaPravaSubscription.unsubscribe();
    }
  }
}
