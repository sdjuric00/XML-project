import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { OsnovnaPretraga, ParametarPretrage, ParametriPretrage } from 'src/app/model/pretraga/osnovna-pretraga';
import { PatentApplicationService } from 'src/app/service/patent-application.service';
import { ZahtevPatentOsnovneInformacije } from 'src/app/model/patent/obj/zahtev-patent-osnovne-informacije';
import { ZahtevAutorskoPravoOsnovneInformacije } from 'src/app/model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije';
import { AutorskaPravaService } from 'src/app/service/autorska-prava.service';
import { ZahtevZigOsnovneInformacije } from 'src/app/model/zig/obj/zahtev-zig-osnovne-informacije';
import { ZigService } from 'src/app/service/zig.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private patentService: PatentApplicationService, private autorskaPravaService: AutorskaPravaService, private zigService: ZigService ) { }

  ngOnInit(): void {
  }

  listaZahtevaPatenti: ZahtevPatentOsnovneInformacije[];
  listaZahtevaAutorskaPrava: ZahtevAutorskoPravoOsnovneInformacije[];
  listaZahtevaZigova: ZahtevZigOsnovneInformacije[];
  prikaziZigove = false;
  prikaziPatente = false;
  prikaziAutorskaPrava = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchList: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.searchList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(s: string): void {
    const index = this.searchList.indexOf(s);

    if (index >= 0) {
      this.searchList.splice(index, 1);
    }
  }

  pretrazi(){

    let pretragaPodaci: ParametriPretrage = {parametar: []}
    let parametriPretrage: ParametarPretrage[] = [];
    console.log(this.searchList)
    for(let s of this.searchList){
      let parametarPretrage: ParametarPretrage = {
        "#": s
      }
      parametriPretrage.push(parametarPretrage);
    }

    pretragaPodaci.parametar = parametriPretrage;
    let osnovnaPretraga: OsnovnaPretraga = {pretraga: {parametriPretrage: pretragaPodaci}};
    this.patentService.osnovnaPretraga(osnovnaPretraga).subscribe(zahtevi=>{
      this.listaZahtevaPatenti = zahtevi;
      if(zahtevi.length > 0){
        this.prikaziPatente = true;
      }
      else{
        this.prikaziPatente = false;
      }
    });

    this.autorskaPravaService.osnovnaPretraga(osnovnaPretraga).subscribe(zahtevi => {
      this.listaZahtevaAutorskaPrava = zahtevi;
      if(zahtevi.length > 0){
        this.prikaziAutorskaPrava = true;
      }
      else{
        this.prikaziAutorskaPrava = false;
      }
    })

    this.zigService.osnovnaPretraga(osnovnaPretraga).subscribe(zahtevi => {
      this.listaZahtevaZigova = zahtevi;
      if(zahtevi.length > 0){
        this.prikaziZigove = true;
      }
      else{
        this.prikaziZigove = false;
      }
    })

    

    



  }

}
