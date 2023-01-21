import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ZahtevAutorskoPravoXml} from "../../../model/autorsko-pravo/xml/zahtev-autorsko-pravo-xml";
import {AutorskaPravaService} from "../../../service/autorska-prava.service";
import {Subscription} from "rxjs";
import {
  ZahtevAutorskoPravoOsnovneInformacije
} from "../../../model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije";
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';
import { Korisnik } from 'src/app/model/korisnik/korisnik';

@Component({
  selector: 'app-tabela-zahteva-autorska-prava',
  templateUrl: './tabela-zahteva-autorska-prava.component.html',
  styleUrls: ['./tabela-zahteva-autorska-prava.component.css']
})
export class TabelaZahtevaAutorskaPravaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pregledNeobradjenih: boolean;
  listaZahteva: ZahtevAutorskoPravoOsnovneInformacije[];
  autorskaPravaSubscription: Subscription;
  autentifikacijaSubscription: Subscription;
  jeGradjanin: boolean;
  ulogovanKorisnik: Korisnik;

  constructor(
    private autorskaPravaService: AutorskaPravaService,
    private autentifikacijaService: AutentifikacijaService
    ) {
    this.listaZahteva = [];
    this.jeGradjanin = false;
  }

  ngOnInit(): void {
    this.ucitajUlogovanog();
  }

  ucitajUlogovanog(): void {
    this.autentifikacijaSubscription = this.autentifikacijaService.getSubjectCurrentUser().subscribe(
      res => {
        if (res) {
          this.ulogovanKorisnik = res;
          this.jeGradjanin = this.ulogovanKorisnik.tipNaloga === 'gradjanin';
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ucitajUlogovanog();
    if (changes['pregledNeobradjenih'].currentValue) {
      this.autorskaPravaSubscription = this.autorskaPravaService.uzmiNeobradjeneZahteve(this.jeGradjanin)
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    } else {
      this.autorskaPravaSubscription = this.autorskaPravaService.uzmiObradjeneZahteve(this.jeGradjanin)
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    }
  }

  ngOnDestroy(): void {
    if (this.autorskaPravaSubscription){
      this.autorskaPravaSubscription.unsubscribe();
    }

    if (this.autentifikacijaSubscription) {
      this.autentifikacijaSubscription.unsubscribe();
    }
  }

}
