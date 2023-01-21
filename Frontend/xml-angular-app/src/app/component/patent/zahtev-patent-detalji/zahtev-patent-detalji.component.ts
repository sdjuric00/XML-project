import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {ZahtevPatentDetaljneInformacije} from "../../../model/patent/obj/zahtev-patent-detaljne-informacije";
import { ZahtevPatentOsnovneInformacije } from 'src/app/model/patent/obj/zahtev-patent-osnovne-informacije';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-zahtev-patent-detalji',
  templateUrl: './zahtev-patent-detalji.component.html',
  styleUrls: ['./zahtev-patent-detalji.component.css']
})
export class ZahtevPatentDetaljiComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string;
  zahtev: ZahtevPatentDetaljneInformacije;
  patentSubscription: Subscription;
  patentIdSubscription: Subscription;

  obradjeniZahtevi: ZahtevPatentOsnovneInformacije[];
  neobradjeniZahtevi: ZahtevPatentOsnovneInformacije[];

  constructor(
    private _patentService: PatentApplicationService,
    private _toast: ToastrService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.patentSubscription = this._patentService.uzmiZahtevPoId(this.zahtevId)
      .subscribe(result=> {
        this.zahtev = result;
        if (!this.zahtev.pregledano) {
          this._router.navigate([`/zahtev-patent/obrada/${this.zahtev.id}`]);
        }
      });

      this._patentService.uzmiObradjeneZahteve(false).subscribe(zahtevi => {
        this.obradjeniZahtevi = zahtevi;
      })
  
      this._patentService.uzmiNeobradjeneZahteve(false).subscribe(zahtevi => {
        this.neobradjeniZahtevi = zahtevi;
      })
  }

  idiNaRefZahtev(patentBroj: string): void {
    this.patentIdSubscription = this._patentService.dobaviIdPoBrojuPrijave(patentBroj)
    .subscribe(
      res => {
        this._router.navigate([`/zahtev-patent/detalji/${res}`]);
      },
      err => {
        this._toast.error(err.error, "Greska!");
        this._router.navigate([`/zahtev-patent/detalji/${this.zahtev.id}`]);
      }
    );
  
  }

  ngOnDestroy(): void {
    if (this.patentSubscription){
      this.patentSubscription.unsubscribe();
    }

    if (this.patentIdSubscription) {
      this.patentIdSubscription.unsubscribe();
    }
  }
}
