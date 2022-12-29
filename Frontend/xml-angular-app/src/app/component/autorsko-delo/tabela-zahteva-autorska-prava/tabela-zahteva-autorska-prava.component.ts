import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ZahtevAutorskoPravoXml} from "../../../model/autorsko-pravo/xml/zahtev-autorsko-pravo-xml";
import {AutorskaPravaService} from "../../../service/autorska-prava.service";
import {Subscription} from "rxjs";
import {
  ZahtevAutorskoPravoOsnovneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";

@Component({
  selector: 'app-tabela-zahteva-autorska-prava',
  templateUrl: './tabela-zahteva-autorska-prava.component.html',
  styleUrls: ['./tabela-zahteva-autorska-prava.component.css']
})
export class TabelaZahtevaAutorskaPravaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pregledNeobradjenih: boolean;
  listaZahteva: ZahtevAutorskoPravoOsnovneInformacije[];
  autorskaPravaSubscription: Subscription;

  constructor(private autorskaPravaService: AutorskaPravaService) {
    this.listaZahteva = [];
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.autorskaPravaSubscription){
      this.autorskaPravaSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pregledNeobradjenih'].currentValue) {
      this.autorskaPravaSubscription = this.autorskaPravaService.uzmiNeobradjeneZahteve()
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    } else {
      this.autorskaPravaSubscription = this.autorskaPravaService.uzmiObradjeneZahteve()
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    }
  }
}
