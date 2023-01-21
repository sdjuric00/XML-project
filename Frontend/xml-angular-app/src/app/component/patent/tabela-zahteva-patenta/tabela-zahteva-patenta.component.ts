import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {PatentApplicationService} from "../../../service/patent-application.service";
import {ZahtevPatentOsnovneInformacije} from "../../../model/patent/obj/zahtev-patent-osnovne-informacije";
import { Korisnik } from 'src/app/model/korisnik/korisnik';
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';

@Component({
  selector: 'app-tabela-zahteva-patenta',
  templateUrl: './tabela-zahteva-patenta.component.html',
  styleUrls: ['./tabela-zahteva-patenta.component.css']
})
export class TabelaZahtevaPatentaComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pregledNeobradjenih: boolean;
  listaZahteva: ZahtevPatentOsnovneInformacije[];
  patentSubscription: Subscription;
  jeGradjanin: boolean;
  ulogovanKorisnik: Korisnik;
  autentifikacijaSubscription: Subscription;

  constructor(
    private patentService: PatentApplicationService,
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
      this.patentSubscription = this.patentService.uzmiNeobradjeneZahteve(this.jeGradjanin)
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    } else {
      this.patentSubscription = this.patentService.uzmiObradjeneZahteve(this.jeGradjanin)
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)

        });
    }
  }

  ngOnDestroy(): void {
    if (this.patentSubscription){
      this.patentSubscription.unsubscribe();
    }

    if (this.autentifikacijaSubscription) {
      this.autentifikacijaSubscription.unsubscribe();
    }

  }

}
