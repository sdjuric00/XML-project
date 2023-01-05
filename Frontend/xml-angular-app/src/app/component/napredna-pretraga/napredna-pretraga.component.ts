import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ZahtevAutorskoPravoOsnovneInformacije } from 'src/app/model/autorsko-pravo/obj/zahtev-autorsko-pravo-osnovne-informacije';
import { ZahtevPatentOsnovneInformacije } from 'src/app/model/patent/obj/zahtev-patent-osnovne-informacije';
import { NaprednaPretraga, ParametriNaprednePretrage, ParNaprednaPretraga } from 'src/app/model/pretraga/napredna-pretraga';
import { ZahtevZigOsnovneInformacije } from 'src/app/model/zig/obj/zahtev-zig-osnovne-informacije';
import { AutorskaPravaService } from 'src/app/service/autorska-prava.service';
import { PatentApplicationService } from 'src/app/service/patent-application.service';
import { ZigService } from 'src/app/service/zig.service';

@Component({
  selector: 'app-napredna-pretraga',
  templateUrl: './napredna-pretraga.component.html',
  styleUrls: ['./napredna-pretraga.component.css']
})
export class NaprednaPretragaComponent implements OnInit {

  naprednaPretragaForm: FormGroup;
  constructor(private fb: FormBuilder, private _toast: ToastrService, private patentService: PatentApplicationService,
    private zigService: ZigService, private autorskaPravaService: AutorskaPravaService) { 
    this.naprednaPretragaForm = this.fb.group({
      vrednosti: this.fb.array([ this.novaVrednost() ])
   });
  }
  ngOnInit(): void {
  }


  operatori = ["I", "ILI", "NE"];
  nazivi = ["datum_prijema", "broj_prijave", "autor_email", "forma_zapis_autorskog_dela",
   "naslov_autorskog_dela", "autorsko_delo_naslov_prerada", "podnosilac_email", "punomocnik_email",
    "referenca_na_resenje", "vrsta_autorskog_dela", "naziv_patenta_engleski",
     "naziv_patenta_srpski", "pronalazac_email", "broj_ranije_prijave",
    "predstavnik_email", "vrsta_ziga", "vrsta_znaka"];
  listaZahtevaPatenti: ZahtevPatentOsnovneInformacije[];
  listaZahtevaAutorskaPrava: ZahtevAutorskoPravoOsnovneInformacije[];
  listaZahtevaZigova: ZahtevZigOsnovneInformacije[];
  prikaziZigove = false;
  prikaziPatente = false;
  prikaziAutorskaPrava = false;


  // vrednosti=[new FormControl("")]

  dodajNovuVrednost(){

    (this.naprednaPretragaForm.get('vrednosti') as FormArray).push(this.novaVrednost())
    console.log(this.naprednaPretragaForm);
  }

  novaVrednost(): FormGroup{
    return this.fb.group({
      naziv: ["", Validators.required],
      vrednost:["", Validators.required],
      operator:["", Validators.required]
    });
  }

  get vrednosti(){
    return this.naprednaPretragaForm.get('vrednosti')['controls'];
  }

  pretrazi(){
    //<napedna-pretraga>
    //
    //  <vrednosti>
    //    <naziv></naziv>
    //    <vrednost></vrednost>
    //    <operator></operator>
    //   </vrednosti>
    // </napedna-pretraga>
    
    if(this.validirajPolja()){
      let napredna_pretraga: NaprednaPretraga = {
        napredna_pretraga: {
          "parametriPretrage": this.getNaprednaPretraga()
        }
      }

      this.patentService.naprednaPretraga(napredna_pretraga).subscribe(zahtevi=>{
        this.listaZahtevaPatenti = zahtevi;
        if(zahtevi.length > 0){
          this.prikaziPatente = true;
        }
        else{
          this.prikaziPatente = false;
        }
      });
  
      this.autorskaPravaService.naprednaPretraga(napredna_pretraga).subscribe(zahtevi => {
        this.listaZahtevaAutorskaPrava = zahtevi;
        if(zahtevi.length > 0){
          this.prikaziAutorskaPrava = true;
        }
        else{
          this.prikaziAutorskaPrava = false;
        }
      })
  
      this.zigService.naprednaPretraga(napredna_pretraga).subscribe(zahtevi => {
        this.listaZahtevaZigova = zahtevi;
        if(zahtevi.length > 0){
          this.prikaziZigove = true;
        }
        else{
          this.prikaziZigove = false;
        }
      })
  
    }
    else{
      this._toast.error("Nemoguce je izvrsiti pretragu, nisu sva polja validna!", "NEVALIDNA POLJA");
    }
  }

  getNaprednaPretraga(): ParametriNaprednePretrage{
    let parametri: ParametriNaprednePretrage = {par: []};
    for(let par of this.vrednosti){
      console.log(par.value);
      let parametar: ParNaprednaPretraga = {
        naziv_elementa: par.value.naziv,
        vrednost: par.value.vrednost,
        operator: par.value.operator
      }
      parametri.par.push(parametar);
    }
    return parametri;
  }

  validirajPolja(): boolean{
    if(this.naprednaPretragaForm.invalid){
      return false
    }
    return true;
  }

}
