import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {ZahtevPatentDetaljneInformacije} from "../../../model/patent/obj/zahtev-patent-detaljne-informacije";

@Component({
  selector: 'app-zahtev-patent-detalji',
  templateUrl: './zahtev-patent-detalji.component.html',
  styleUrls: ['./zahtev-patent-detalji.component.css']
})
export class ZahtevPatentDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevPatentDetaljneInformacije;
  patentSubscription: Subscription;

  constructor(private _patentService: PatentApplicationService) {}

  ngOnInit(): void {
    this.patentSubscription = this._patentService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
        console.log(result);
      });
  }

  ngOnDestroy(): void {
    if (this.patentSubscription){
      this.patentSubscription.unsubscribe();
    }
  }
}
