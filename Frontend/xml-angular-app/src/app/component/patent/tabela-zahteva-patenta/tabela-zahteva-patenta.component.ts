import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {ZahtevPatentOsnovneInformacije} from "../../../model/patent/obj/zahtev-patent-osnovne-informacije";

@Component({
  selector: 'app-tabela-zahteva-patenta',
  templateUrl: './tabela-zahteva-patenta.component.html',
  styleUrls: ['./tabela-zahteva-patenta.component.css']
})
export class TabelaZahtevaPatentaComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pregledNeobradjenih: boolean;
  listaZahteva: ZahtevPatentOsnovneInformacije[];
  patentSubscription: Subscription;

  constructor(private patentService: PatentApplicationService) {
    this.listaZahteva = [];
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.patentSubscription){
      this.patentSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pregledNeobradjenih'].currentValue) {
      this.patentSubscription = this.patentService.uzmiNeobradjeneZahteve()
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    } else {
      this.patentSubscription = this.patentService.uzmiObradjeneZahteve()
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    }
  }
}
