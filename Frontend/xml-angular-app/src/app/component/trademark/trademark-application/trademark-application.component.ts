import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Trademark } from 'src/app/model/trademark/trademark';
import { Institucija } from 'src/app/model/opste/institucija';
import { Podnosioci } from 'src/app/model/patent/podnosilac';
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';
import { PravnoLice } from 'src/app/model/opste/pravno-lice';
import { Adresa } from 'src/app/model/opste/adresa';
import { Kontakt } from 'src/app/model/opste/kontakt';
import { FizickoLice } from 'src/app/model/opste/fizicko-lice';
import { PunomocnikIPredstavnikZ } from 'src/app/model/patent/punomocnik-p';
import { Boja, Boje, NicanskaKlasifikacija, VrstaZnaka, Znak } from 'src/app/model/trademark/znak';
import { PravoPrvenstva, PriloziZ, Roba } from 'src/app/model/trademark/prilozi-z';
import { PlaceneTakse } from 'src/app/model/trademark/placene-takse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trademark-application',
  templateUrl: './trademark-application.component.html',
  styleUrls: ['./trademark-application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    DatePipe
  ],
})
export class TrademarkApplicationComponent implements OnInit {

  imeInstitucije: string = "Zavod za intelektualnu svojinu";
  adresa = {
    grad: "Beograd",
    ulica: "Kneginje Ljubice",
    broj: "5",
    postanskiBroj: 11000,
    drzava: "Republika Srbija"
  }

  podnosilacFormGroup = this._formBuilder.group({
    podnosioci: new FormControl([], [Validators.required]),
    tipPodnosioca: new FormControl('Fizičko lice'),
    podnosilacAutor: new FormControl(false),
    podaciOZajednickomPredstavniku: new FormControl({}, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern("[0-9]{8,12}")]),
    fax: new FormControl('', [Validators.required, Validators.pattern("[0][0-9]{8,9}")]),
    ime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    prezime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    jmbg: new FormControl('', [Validators.required, Validators.pattern("[0-9]{13}")]),
    ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    broj: new FormControl('', [Validators.required, Validators.pattern("[0-9A-Za-z ]{1,5}")]),
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    naziv: new FormControl('', [Validators.required]),
    pib: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    registarskiBroj: new FormControl('', [Validators.required, Validators.pattern("([0-9]{8}|([A-Za-z]{2}[0-9]{6}))")])
  });

  punomocnikFormGroup = this._formBuilder.group({
    tipPunomocnika: new FormControl('Fizičko lice'),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern("[0-9]{8,12}")]),
    fax: new FormControl('', [Validators.required, Validators.pattern("[0][0-9]{8,9}")]),
    ime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    prezime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    jmbg: new FormControl('', [Validators.required, Validators.pattern("[0-9]{13}")]),
    ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    broj: new FormControl('', [Validators.required, Validators.pattern("[0-9A-Za-z ]{1,5}")]),
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    naziv: new FormControl('', [Validators.required]),
    pib: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    registarskiBroj: new FormControl('', [Validators.required, Validators.pattern("([0-9]{8}|([A-Za-z]{2}[0-9]{6}))")])
  });


  znakFormGroup = this._formBuilder.group({
    pismo: new FormControl('Cirilica', [Validators.required,Validators.maxLength(50)]),
    vrstaZnaka: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    boje: new FormControl([], [Validators.required, Validators.maxLength(50)]),
    transliteracijaZnaka: new FormControl(''),
    prevod: new FormControl(''),
    opis: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    nicanskaKlasifikacija: new FormControl('', [Validators.required]),
    tipZig: new FormControl('', [Validators.required])
  });

  takseIPriloziFormGroup = this._formBuilder.group({
    pravoPrvenstvaZatrazeno: new FormControl(false, [Validators.required]),
    pravoPrvenstvaOsnov: new FormControl('', []),

    valuta: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{3}")]),
    osnovnaTaksa: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]),
    taksaZaKlasu: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]),
    taksaZaGrafickoResenje: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]),
    ukupno: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]),

    spisakRoba: new FormControl([], [Validators.required]),
    generalnoPunomocjeRanijePrilozeno: new FormControl(false, [Validators.required]),
    punomocjeNaknadnoDostavljeno: new FormControl(false, [Validators.required]),
    primerakZnakaPutanja: new FormControl('', [Validators.required]),
    punomocjePutanja: new FormControl('', []),
    opstiAktOKolektivnoZiguPutanja: new FormControl('', [Validators.required]),
    dozakOPravuPrvenstvaPutanja: new FormControl('', []),
    dokazOUplatiTaksePutanja: new FormControl('', [Validators.required]),
  });

  constructor(private _formBuilder: FormBuilder,  private http: HttpClient, private _datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getTrademark(): Trademark {
    this._datePipe.transform(new Date(), 'yyyy-MM-dd')

    let institucija: Institucija = {
      "opste:naziv": "Zavod za intelektualnu svojinu",
      "opste:adresa": {
        "opste:grad": "Beograd",
        "opste:ulica": "Kneginje Ljubice",
        "opste:broj": "5",
        "opste:postanski_broj": "11000",
        "opste:drzava": "Republika Srbija"
      }
    }

    let zig: Trademark = {
      zahtev_za_priznanje_ziga: {
        "@": {
          "xmlns": "http://www.zig/zig",
          "xmlns:opste": "http://ftn.ac.rs/opste",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.zig/zig",
          broj_prijave:"Z-2022/1",
          datum_podnosenja: this._datePipe.transform(new Date(), 'yyyy-MM-dd'),
          zig: this.znakFormGroup.get("tipZig").value,
          pregledano:'false'
        },
        institucija: institucija,
        podnosioci: this.getPodaciOPodnosiocima(),
        punomocnik: this.getPunomocnik(),
        podaci_o_zajednickom_predstavniku: this.getZajednickogPredstavnika(),
        znak: this.getZnak(),
        nicanska_klasifikacija: this.getNicanskaKlasifikacija(),
        pravo_prvenstva: this.getPravoPrvenstva(),
        placene_takse: this.getPlaceneTakse(),
        prilozi: this.getPrilozi()
      }
    }

    return zig;
  }

  getPodaciOPodnosiocima(): Podnosioci[] {
    let returnList: Podnosioci[] = [];
    const podnosioci:PodnosilacUniversal[] = this.podnosilacFormGroup.get('podnosioci')?.value as PodnosilacUniversal[];

    for (let i = 0; i < podnosioci.length; i++) {
      let podnosilac: PodnosilacUniversal = podnosioci.at(i);

      if (podnosilac.isPravnoLice) {
        returnList.push({
          podnosilac: {
            "@": {
              "autor": this.podnosilacFormGroup.get('podnosilacAutor')?.value,
            },
            "opste:pravno_lice": this.getPravnoLice(podnosilac),
          }
        });
      } else  {
        returnList.push({
          podnosilac: {
            "@": {
              autor: this.podnosilacFormGroup.get('podnosilacAutor')?.value,
            },
          "opste:fizicko_lice": this.getFizickoLice(podnosilac),
          }
        });
      }
    }

    return returnList;
     
  }

  getPravnoLice(podnosilac: PodnosilacUniversal): PravnoLice{
    let pravno_lice: PravnoLice = {
      "opste:kontakt": this.getKontakt(podnosilac.kontakt.email, podnosilac.kontakt.telefon, podnosilac.kontakt.fax),
      "opste:adresa": this.getAdresa(podnosilac.adresa.ulica, "2", podnosilac.adresa.grad, podnosilac.adresa.postanskiBroj, podnosilac.adresa.drzava),
      "opste:naziv": podnosilac.naziv,
      "opste:pib": podnosilac.pib,
      "opste:registarski_broj": podnosilac.registarskiBroj
    }

    return pravno_lice;
  }

  getFizickoLice(podnosilac: PodnosilacUniversal): FizickoLice {
    let fizicko_lice = {
      "opste:kontakt": this.getKontakt(podnosilac.kontakt.email, podnosilac.kontakt.telefon, podnosilac.kontakt.fax),
      "opste:adresa": this.getAdresa(podnosilac.adresa.ulica, "2", podnosilac.adresa.grad, podnosilac.adresa.postanskiBroj, podnosilac.adresa.drzava),
      "opste:ime": podnosilac.ime,
      "opste:prezime": podnosilac.prezime,
      "opste:jmbg": podnosilac.jmbg
    }

    return fizicko_lice;
  }

  getAdresa(ulica: string, broj: string, grad: string, postanskiBroj: string, drzava: string): Adresa {
    let adresa = {
      "opste:grad": grad,
      "opste:ulica": ulica,
      "opste:broj": broj,
      "opste:postanski_broj": postanskiBroj,
      "opste:drzava": drzava
    }
    return adresa;
  }

  getKontakt(email: string, telefon: string, fax: string): Kontakt {
    let kontakt = {
      "opste:email": email,
      "opste:telefon": telefon,
      "opste:fax": fax
    }

    return kontakt;
  }

  getPunomocnik(): PunomocnikIPredstavnikZ {
    if(this.punomocnikFormGroup.get('ime')?.value !== ""){
    
      return {
        "opste:fizicko_lice": {
          "opste:kontakt": {
            "opste:email": this.punomocnikFormGroup.get('email').value,
            "opste:telefon": this.punomocnikFormGroup.get('telefon').value,
            "opste:fax": this.punomocnikFormGroup.get('fax').value
          },
          "opste:adresa": {
            "opste:grad": this.punomocnikFormGroup.get('grad').value,
            "opste:ulica": this.punomocnikFormGroup.get('ulica').value,
            "opste:broj": '2',
            "opste:postanski_broj": this.punomocnikFormGroup.get('postanskiBroj').value,
            "opste:drzava": this.punomocnikFormGroup.get('drzava').value
          },
          "opste:ime": this.punomocnikFormGroup.get('ime').value,
          "opste:prezime": this.punomocnikFormGroup.get('prezime')?.value,
          "opste:jmbg": this.punomocnikFormGroup.get('jmbg')?.value,
        }
      }
    }
    else{
      return {
        "opste:pravno_lice": {
          "opste:kontakt": {
            "opste:email": this.punomocnikFormGroup.get('email').value,
            "opste:telefon": this.punomocnikFormGroup.get('telefon').value,
            "opste:fax": this.punomocnikFormGroup.get('fax').value
          },
          "opste:adresa": {
            "opste:grad": this.punomocnikFormGroup.get('grad').value,
            "opste:ulica": this.punomocnikFormGroup.get('ulica').value,
            "opste:broj": '2',
            "opste:postanski_broj": this.punomocnikFormGroup.get('postanskiBroj').value,
            "opste:drzava": this.punomocnikFormGroup.get('drzava').value
          },
          "opste:naziv": this.punomocnikFormGroup.get('naziv')?.value,
          "opste:pib": this.punomocnikFormGroup.get('pib').value,
          "opste:registarski_broj": this.punomocnikFormGroup.get('registarskiBroj')?.value,
        }
      }
    }
  }

  getZajednickogPredstavnika(): PunomocnikIPredstavnikZ {
    let zajednickiPredstvnik: PodnosilacUniversal = this.podnosilacFormGroup.get("podaciOZajednickomPredstavniku")?.value as PodnosilacUniversal;

    if(!zajednickiPredstvnik.isPravnoLice){
    
      return {
        "fizicko_lice": {
          "opste:kontakt": {
            "opste:email": zajednickiPredstvnik.kontakt.email,
            "opste:telefon": zajednickiPredstvnik.kontakt.telefon,
            "opste:fax": zajednickiPredstvnik.kontakt.fax
          },
          "opste:adresa": {
            "opste:grad": zajednickiPredstvnik.adresa.grad,
            "opste:ulica": zajednickiPredstvnik.adresa.ulica,
            "opste:broj": '2',
            "opste:postanski_broj": zajednickiPredstvnik.adresa.postanskiBroj,
            "opste:drzava": zajednickiPredstvnik.adresa.drzava
          },
          "opste:ime": zajednickiPredstvnik.ime,
          "opste:prezime": zajednickiPredstvnik.prezime,
          "opste:jmbg": zajednickiPredstvnik.jmbg,
        }
      }
    }
    else{
      return {
        "pravno_lice": {
          "opste:kontakt": {
            "opste:email": zajednickiPredstvnik.kontakt.email,
            "opste:telefon": zajednickiPredstvnik.kontakt.telefon,
            "opste:fax": zajednickiPredstvnik.kontakt.fax
          },
          "opste:adresa": {
            "opste:grad": zajednickiPredstvnik.adresa.grad,
            "opste:ulica": zajednickiPredstvnik.adresa.ulica,
            "opste:broj": '2',
            "opste:postanski_broj": zajednickiPredstvnik.adresa.postanskiBroj,
            "opste:drzava": zajednickiPredstvnik.adresa.drzava
          },
          "opste:naziv": zajednickiPredstvnik.naziv,
          "opste:pib": zajednickiPredstvnik.pib,
          "opste:registarski_broj": zajednickiPredstvnik.registarskiBroj,
        }
      }
    }
  }

  getZnak(): Znak {
    let pismo: string = this.znakFormGroup.get('pismo').value;
    let vrstaZnaka: VrstaZnaka;
    let boje: Boje = {
      boja: []
    };

    if (['verbalni', 'graficki', 'kombinovani', 'trodimenzionalni'].includes(this.znakFormGroup.get('vrstaZnaka').value)) {
      vrstaZnaka = {
        vrsta_enum: this.znakFormGroup.get('vrstaZnaka').value
      }
    } else {
      vrstaZnaka = {
        vrsta_custom: this.znakFormGroup.get('vrstaZnaka').value
      }
    }

    for (let i = 0; i < this.znakFormGroup.get("boje").value.length; i++) {
      boje.boja.push({
        "naziv": this.znakFormGroup.get("boje").value.at(i),
      })
    }

    if (pismo !== 'Cirilica' && pismo !== 'Latinica') {

      return {
        "@": {
          pismo: pismo,
        },
        "vrsta_znaka": vrstaZnaka,
        "boje": boje,
        "opis": this.znakFormGroup.get("opis").value
      }
    } else {
      return {
        "@": {
          pismo: pismo,
        },
        "vrsta_znaka": vrstaZnaka,
        "boje": boje,
        "transliteracija_znaka": this.znakFormGroup.get("transliteracijaZnaka").value,
        "prevod": this.znakFormGroup.get("prevod").value,
        "opis": this.znakFormGroup.get("opis").value
      }
    }
  }

  getPravoPrvenstva(): PravoPrvenstva {

    if (this.takseIPriloziFormGroup.get("pravoPrvenstvaZatrazeno").value) {
      
      return {
        "@": {
          zatrazeno: 'true',
        },
        osnov: this.takseIPriloziFormGroup.get("pravoPrvenstvaOsnov").value
      }
    } else {

      return {
        "@": {
          zatrazeno: 'false',
        }
      }
    }
  }

  getNicanskaKlasifikacija(): NicanskaKlasifikacija {

    return {
      broj: this.znakFormGroup.get("nicanskaKlasifikacija").value
    }
  }

  getPlaceneTakse(): PlaceneTakse {
    
    return {
      valuta: this.takseIPriloziFormGroup.get("valuta").value,
      osnovna_taksa: +this.takseIPriloziFormGroup.get("osnovnaTaksa").value,
      taksa_za_klasu: +this.takseIPriloziFormGroup.get("taksaZaKlasu").value,
      taksa_za_graficko_resenje: +this.takseIPriloziFormGroup.get("taksaZaGrafickoResenje").value,
      ukupno: +this.takseIPriloziFormGroup.get("ukupno").value
    }
  }

  getPrilozi(): PriloziZ {
    let robe: Roba[] = [];
    
    for (let i = 0; i < this.takseIPriloziFormGroup.get("spisakRoba").value.length; i++) {
      robe.push({
        roba: this.takseIPriloziFormGroup.get("spisakRoba").value.at(i),
      });
    }

    if (this.takseIPriloziFormGroup.get("pravoPrvenstvaZatrazeno").value) {
      if (!(this.takseIPriloziFormGroup.get("generalnoPunomocjeRanijePrilozeno").value || this.takseIPriloziFormGroup.get("punomocjeNaknadnoDostavljeno").value)) {
        
        return {
          "@": {
            primerak_znaka_putanja: this.takseIPriloziFormGroup.get("primerakZnakaPutanja").value,
            punomocje_putanja: this.takseIPriloziFormGroup.get("punomocjePutanja").value,
            opsti_akt_o_kolektivnom_zigu_garancije_putanja: this.takseIPriloziFormGroup.get("opstiAktOKolektivnoZiguPutanja").value,
            dokaz_o_pravu_prvenstva_putanja: this.takseIPriloziFormGroup.get("dozakOPravuPrvenstvaPutanja").value,
            dokaz_o_uplati_takse_putanja: this.takseIPriloziFormGroup.get("dokazOUplatiTaksePutanja").value,
          },
          spisak_roba_i_usluga: robe,
          generalno_punomocje_ranije_prilozeno: false,
          punomocje_ce_biti_naknadno_dostavljeno: false
        }
      } else {
        
        return {
          "@": {
            primerak_znaka_putanja: this.takseIPriloziFormGroup.get("primerakZnakaPutanja").value,
            punomocje_putanja: '',
            opsti_akt_o_kolektivnom_zigu_garancije_putanja: this.takseIPriloziFormGroup.get("opstiAktOKolektivnoZiguPutanja").value,
            dokaz_o_pravu_prvenstva_putanja: this.takseIPriloziFormGroup.get("dozakOPravuPrvenstvaPutanja").value,
            dokaz_o_uplati_takse_putanja: this.takseIPriloziFormGroup.get("dokazOUplatiTaksePutanja").value,
          },
          spisak_roba_i_usluga: robe,
          generalno_punomocje_ranije_prilozeno: this.takseIPriloziFormGroup.get("generalnoPunomocjeRanijePrilozeno").value,
          punomocje_ce_biti_naknadno_dostavljeno: this.takseIPriloziFormGroup.get("punomocjeNaknadnoDostavljeno").value
        }
      }
    } else {
      if (!(this.takseIPriloziFormGroup.get("generalnoPunomocjeRanijePrilozeno").value || this.takseIPriloziFormGroup.get("punomocjeNaknadnoDostavljeno").value)) {
        
        return {
          "@": {
            primerak_znaka_putanja: this.takseIPriloziFormGroup.get("primerakZnakaPutanja").value,
            punomocje_putanja: this.takseIPriloziFormGroup.get("punomocjePutanja").value,
            opsti_akt_o_kolektivnom_zigu_garancije_putanja: this.takseIPriloziFormGroup.get("opstiAktOKolektivnoZiguPutanja").value,
            dokaz_o_pravu_prvenstva_putanja: '',
            dokaz_o_uplati_takse_putanja: this.takseIPriloziFormGroup.get("dokazOUplatiTaksePutanja").value,
          },
          spisak_roba_i_usluga: robe,
          generalno_punomocje_ranije_prilozeno: false,
          punomocje_ce_biti_naknadno_dostavljeno: false
        }
      } else {
        
        return {
          "@": {
            primerak_znaka_putanja: this.takseIPriloziFormGroup.get("primerakZnakaPutanja").value,
            punomocje_putanja: '',
            opsti_akt_o_kolektivnom_zigu_garancije_putanja: this.takseIPriloziFormGroup.get("opstiAktOKolektivnoZiguPutanja").value,
            dokaz_o_pravu_prvenstva_putanja: '',
            dokaz_o_uplati_takse_putanja: this.takseIPriloziFormGroup.get("dokazOUplatiTaksePutanja").value,
          },
          spisak_roba_i_usluga: robe,
          generalno_punomocje_ranije_prilozeno: this.takseIPriloziFormGroup.get("generalnoPunomocjeRanijePrilozeno").value,
          punomocje_ce_biti_naknadno_dostavljeno: this.takseIPriloziFormGroup.get("punomocjeNaknadnoDostavljeno").value
        }
      }
    }

  }

  sendTrademark(){
    console.log("fafsfaf");
    let headers = new HttpHeaders({ "Content-Type": "application/xml"});
    let trademark: Trademark = this.getTrademark();
    console.log(trademark);
    var o2x = require('object-to-xml');
    console.log(o2x(trademark));
    let queryParams = {};
    queryParams = {
      headers: headers, 
      observe: "response",
      responseType: "text"
    };
    const api_url = environment.apiUrl;
    this.http.post(`${api_url}/trademark`, o2x(trademark), queryParams).subscribe(response => {
      console.log(response);
    })
  }

}
