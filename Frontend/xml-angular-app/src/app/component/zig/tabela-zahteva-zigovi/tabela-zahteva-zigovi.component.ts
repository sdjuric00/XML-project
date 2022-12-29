import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {ZigService} from "../../../service/zig.service";
import {ZahtevZigOsnovneInformacije} from "../../../model/zig/obj/zahtev-zig-osnovne-informacije";

@Component({
  selector: 'app-tabela-zahteva-zigovi',
  templateUrl: './tabela-zahteva-zigovi.component.html',
  styleUrls: ['./tabela-zahteva-zigovi.component.css']
})
export class TabelaZahtevaZigoviComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pregledNeobradjenih: boolean;
  listaZahteva: ZahtevZigOsnovneInformacije[];
  zigSubscription: Subscription;

  constructor(private zigService: ZigService) {
    this.listaZahteva = [];
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.zigSubscription){
      this.zigSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pregledNeobradjenih'].currentValue) {
      this.zigSubscription = this.zigService.uzmiNeobradjeneZahteve()
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)
        });
    } else {
      this.zigSubscription = this.zigService.uzmiObradjeneZahteve()
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)
        });
    }
  }

}
