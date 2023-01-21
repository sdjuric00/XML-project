import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {ZigService} from "../../../service/zig.service";
import {ZahtevZigOsnovneInformacije} from "../../../model/zig/obj/zahtev-zig-osnovne-informacije";
import { Korisnik } from 'src/app/model/korisnik/korisnik';
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';

@Component({
  selector: 'app-tabela-zahteva-zigovi',
  templateUrl: './tabela-zahteva-zigovi.component.html',
  styleUrls: ['./tabela-zahteva-zigovi.component.css']
})
export class TabelaZahtevaZigoviComponent implements OnInit, OnDestroy, OnChanges {

  @Input() pregledNeobradjenih: boolean;
  listaZahteva: ZahtevZigOsnovneInformacije[];
  zigSubscription: Subscription;
  autentifikacijaSubscription: Subscription;
  jeGradjanin: boolean;
  ulogovanKorisnik: Korisnik;

  constructor(
    private zigService: ZigService,
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
    if (changes['pregledNeobradjenih'].currentValue) {
      this.zigSubscription = this.zigService.uzmiNeobradjeneZahteve(this.jeGradjanin)
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)
        });
    } else {
      this.zigSubscription = this.zigService.uzmiObradjeneZahteve(this.jeGradjanin)
        .subscribe(zahtevi=>{
          this.listaZahteva = zahtevi;
          console.log(zahtevi)
        });
    }
  }

  ngOnDestroy(): void {
    if (this.zigSubscription){
      this.zigSubscription.unsubscribe();
    }

    if (this.autentifikacijaSubscription) {
      this.autentifikacijaSubscription.unsubscribe();
    }
  }

}
