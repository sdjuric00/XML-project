import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {ZahtevPatentDetaljneInformacije} from "../../../model/patent/obj/zahtev-patent-detaljne-informacije";
import { ZahtevPatentOsnovneInformacije } from 'src/app/model/patent/obj/zahtev-patent-osnovne-informacije';

@Component({
  selector: 'app-zahtev-patent-detalji',
  templateUrl: './zahtev-patent-detalji.component.html',
  styleUrls: ['./zahtev-patent-detalji.component.css']
})
export class ZahtevPatentDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevPatentDetaljneInformacije;
  patentSubscription: Subscription;

  obradjeniZahtevi: ZahtevPatentOsnovneInformacije[];
  neobradjeniZahtevi: ZahtevPatentOsnovneInformacije[];

  constructor(private _patentService: PatentApplicationService) {}

  ngOnInit(): void {
    this.patentSubscription = this._patentService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
        console.log(result);
      });

      this._patentService.uzmiObradjeneZahteve().subscribe(zahtevi => {
        this.obradjeniZahtevi = zahtevi;
      })
  
      this._patentService.uzmiNeobradjeneZahteve().subscribe(zahtevi => {
        this.neobradjeniZahtevi = zahtevi;
      })
  }

  idiNaRefZahtev(patentBroj: string): string{
    let refZahtev: ZahtevPatentOsnovneInformacije;
    this.neobradjeniZahtevi.forEach(zahtev => {
      if(zahtev.broj_prijave === patentBroj){
        refZahtev = zahtev
      }
    })

    this.obradjeniZahtevi.forEach(zahtev => {
      if(zahtev.broj_prijave === patentBroj){
        refZahtev = zahtev
      }
    })
    
    return `zahtev-patent/detalji/${refZahtev.id}`;
  }

  ngOnDestroy(): void {
    if (this.patentSubscription){
      this.patentSubscription.unsubscribe();
    }
  }
}
