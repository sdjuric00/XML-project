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
import { Router } from '@angular/router';
import { AutentifikacijaService } from 'src/app/service/autentifikacija.service';
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/model/korisnik/korisnik';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  gradjanin: boolean;
  ulogovaniKorisnik: Korisnik;
  autentifikacijaSubscription: Subscription;

  constructor(
    private autentifikacijaService: AutentifikacijaService,
    private patentService: PatentApplicationService, 
    private autorskaPravaService: AutorskaPravaService, 
    private zigService: ZigService, 
    private _router: Router
  ) {
    this.gradjanin = false;
  }

  ngOnInit(): void {
    this.autentifikacijaSubscription = this.autentifikacijaService.getSubjectCurrentUser().subscribe(
      res => {
        if (res) {
          this.gradjanin = res.tipNaloga === "gradjanin";
          this.ulogovaniKorisnik = res;
        }
      }
    );
  }

  listaZahtevaPatenti: ZahtevPatentOsnovneInformacije[];
  refListaPatenti: Map<string,[{ref_prijava: string, ref_id: string}]> = new Map();
  listaZahtevaAutorskaPrava: ZahtevAutorskoPravoOsnovneInformacije[];
  listaZahtevaZigova: ZahtevZigOsnovneInformacije[];
  prikaziZigove = false;
  prikaziPatente = false;
  prikaziAutorskaPrava = false;
  rezultati = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchList: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.searchList.push(value);
    }
    event.chipInput!.clear();
  }

  remove(s: string): void {
    const index = this.searchList.indexOf(s);

    if (index >= 0) {
      this.searchList.splice(index, 1);
    }
  }

  naprednaPretraga(){
    this._router.navigate(['/napredna-pretraga']);
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
    this.patentService.osnovnaPretraga(osnovnaPretraga, this.ulogovaniKorisnik).subscribe(zahtevi=>{
      this.listaZahtevaPatenti = zahtevi;
      console.log("blaa");
      if(zahtevi.length > 0){
        this.prikaziPatente = true;
        this.refZahteviPatenti(zahtevi);
        this.rezultati = true;
      }
      else{
        this.prikaziPatente = false;
        this.rezultati = false;
      }
    });

    this.autorskaPravaService.osnovnaPretraga(osnovnaPretraga, this.ulogovaniKorisnik).subscribe(zahtevi => {
      this.listaZahtevaAutorskaPrava = zahtevi;
      if(zahtevi.length > 0){
        this.prikaziAutorskaPrava = true;
        this.rezultati = true;
      }
      else{
        this.prikaziAutorskaPrava = false;
        this.rezultati = false;
      }
    })

    this.zigService.osnovnaPretraga(osnovnaPretraga, this.ulogovaniKorisnik).subscribe(zahtevi => {
      this.listaZahtevaZigova = zahtevi;
      if(zahtevi.length > 0){
        this.prikaziZigove = true;
        this.rezultati = true;
      }
      else{
        this.prikaziZigove = false;
        this.rezultati = false;
      }

    })

  }

  

  refZahteviPatenti(zahtevi: ZahtevPatentOsnovneInformacije[]){
    zahtevi.forEach(zahtev => {
      this.patentService.refencirajuDokumenti(zahtev.id).subscribe(refZahtevi => {
        refZahtevi.forEach(refZahtev => {
          if(this.refListaPatenti[zahtev.broj_prijave] === undefined){
            this.refListaPatenti.set(zahtev.broj_prijave, [{ref_prijava: refZahtev.broj_prijave, ref_id: refZahtev.id}])
          }
          else{
            this.refListaPatenti[zahtev.broj_prijave].push({ref_prijava: refZahtev.broj_prijave, ref_id: refZahtev.id})
          }
        })
      })
    })
  }    

  
  idiNaPatentDetalje(id: string){
    return `/zahtev-patent/detalji/${id}`;
  }
   
}
