import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Trademark } from 'src/app/model/zig/xml/trademark';
import { Institucija } from 'src/app/model/opste/institucija/xml/institucija';
import { Podnosioci } from 'src/app/model/patent/xml/podnosilac';
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';
import { PravnoLice } from 'src/app/model/opste/pravno-lice';
import { Adresa } from 'src/app/model/opste/adresa/xml/adresa';
import { Kontakt } from 'src/app/model/opste/kontakt/xml/kontakt';
import { FizickoLice } from 'src/app/model/opste/fizicko-lice';
import { PunomocnikIPredstavnikZ } from 'src/app/model/patent/xml/punomocnik-p';
import { Boja, Boje, Brojevi, NicanskaKlasifikacija, VrstaZnaka, Znak } from 'src/app/model/zig/xml/znak';
import { PravoPrvenstva, PriloziZ, Roba, Robe } from 'src/app/model/zig/xml/prilozi-z';
import { PlaceneTakse } from 'src/app/model/zig/xml/placene-takse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ZigService } from 'src/app/service/zig.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zig-application',
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
    podaciOZajednickomPredstavniku: new FormControl({}),
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
    nicanskaKlasifikacija: new FormControl([], [Validators.required]),
    tipZig: new FormControl('', [Validators.required])
  });

  takseIPriloziFormGroup = this._formBuilder.group({
    pravoPrvenstvaZatrazeno: new FormControl(false, [Validators.required]),
    pravoPrvenstvaOsnov: new FormControl(''),
    dozakOPravuPrvenstvaPutanja: new FormControl(''),
    
    generalnoPunomocjeRanijePrilozeno: new FormControl(false, [Validators.required]),
    punomocjeNaknadnoDostavljeno: new FormControl(false, [Validators.required]),
    spisakRoba: new FormControl([], [Validators.required]),
    primerakZnakaPutanja: new FormControl('', [Validators.required]),
    punomocjePutanja: new FormControl('', [Validators.required]),
    opstiAktOKolektivnoZiguPutanja: new FormControl('', [Validators.required]),
    dokazOUplatiTaksePutanja: new FormControl('', [Validators.required]),
    
    valuta: new FormControl('EUR'),
    osnovnaTaksa: new FormControl('0'),
    taksaZaKlasu: new FormControl('0'),
    taksaZaGrafickoResenje: new FormControl('0'),
    ukupno: new FormControl('0'),
  });

  constructor(
    private _formBuilder: FormBuilder,  
    private http: HttpClient, 
    private _datePipe: DatePipe,
    private zigService: ZigService,
    private _toast: ToastrService,
    private _router: Router
  ) { }

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

    let zig: Trademark;
    let zajednickiPredstvnik: PodnosilacUniversal = this.podnosilacFormGroup.get("podaciOZajednickomPredstavniku")?.value as PodnosilacUniversal;
    console.log(this.podnosilacFormGroup.get("podaciOZajednickomPredstavniku"))
    if (zajednickiPredstvnik) {
    zig = {
      zahtev_za_priznanje_ziga: {
        "@": {
          "xmlns": "http://www.zig/zig",
          "xmlns:opste": "http://ftn.ac.rs/opste",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.zig/zig",
          broj_prijave:"Z-2022/1",
          datum_podnosenja: this._datePipe.transform(new Date(), 'yyyy-MM-dd'),
          zig: this.znakFormGroup.get("tipZig").value,
          pregledano:'false',
          referenca_na_podnosioca: localStorage.getItem('korisnik_id')
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
  } else {
    zig = {
      zahtev_za_priznanje_ziga: {
        "@": {
          "xmlns": "http://www.zig/zig",
          "xmlns:opste": "http://ftn.ac.rs/opste",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.zig/zig",
          broj_prijave:"Z-2022/1",
          datum_podnosenja: this._datePipe.transform(new Date(), 'yyyy-MM-dd'),
          zig: this.znakFormGroup.get("tipZig").value,
          pregledano:'false',
          referenca_na_podnosioca: localStorage.getItem('korisnik_id')
        },
        institucija: institucija,
        podnosioci: this.getPodaciOPodnosiocima(),
        punomocnik: this.getPunomocnik(),
        znak: this.getZnak(),
        nicanska_klasifikacija: this.getNicanskaKlasifikacija(),
        pravo_prvenstva: this.getPravoPrvenstva(),
        placene_takse: this.getPlaceneTakse(),
        prilozi: this.getPrilozi()
      }
    }}

    return zig;
  }

  getPodaciOPodnosiocima(): Podnosioci {
    let returnList: Podnosioci = {podnosilac: []};
    const podnosioci:PodnosilacUniversal[] = this.podnosilacFormGroup.get('podnosioci')?.value as PodnosilacUniversal[];

    for (let i = 0; i < podnosioci.length; i++) {
      let podnosilac: PodnosilacUniversal = podnosioci.at(i);

      if (podnosilac.isPravnoLice) {
        returnList.podnosilac.push({
            "@": {
              "autor": this.podnosilacFormGroup.get('podnosilacAutor')?.value,
            },
            "opste:pravno_lice": this.getPravnoLice(podnosilac),
          }
        );
      } else  {
        returnList.podnosilac.push({
            "@": {
              autor: this.podnosilacFormGroup.get('podnosilacAutor')?.value,
            },
          "opste:fizicko_lice": this.getFizickoLice(podnosilac),
        });
      }
    }

    return returnList;

  }

  getPravnoLice(podnosilac: PodnosilacUniversal): PravnoLice{
    let pravno_lice: PravnoLice = {
      "opste:kontakt": this.getKontakt(podnosilac.kontakt.email, podnosilac.kontakt.telefon, podnosilac.kontakt.fax),
      "opste:adresa": this.getAdresa(podnosilac.adresa.ulica, podnosilac.adresa.broj, podnosilac.adresa.grad, podnosilac.adresa.postanskiBroj, podnosilac.adresa.drzava),
      "opste:naziv": podnosilac.naziv,
      "opste:pib": podnosilac.pib,
      "opste:registarski_broj": podnosilac.registarskiBroj
    }

    return pravno_lice;
  }

  getFizickoLice(podnosilac: PodnosilacUniversal): FizickoLice {
    let fizicko_lice = {
      "opste:kontakt": this.getKontakt(podnosilac.kontakt.email, podnosilac.kontakt.telefon, podnosilac.kontakt.fax),
      "opste:adresa": this.getAdresa(podnosilac.adresa.ulica, podnosilac.adresa.broj, podnosilac.adresa.grad, podnosilac.adresa.postanskiBroj, podnosilac.adresa.drzava),
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
    if(this.punomocnikFormGroup.get('ime')?.value !== "" && this.punomocnikFormGroup.get('ime')?.value !== null){

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
            "opste:broj": this.punomocnikFormGroup.get('broj').value,
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
            "opste:broj": this.punomocnikFormGroup.get('broj').value,
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
            "opste:broj": zajednickiPredstvnik.adresa.broj,
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
            "opste:broj": zajednickiPredstvnik.adresa.broj,
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
        "opis": this.znakFormGroup.get("opis").value,
        "transliteracija_znaka": this.znakFormGroup.get("transliteracijaZnaka").value,
        "prevod": this.znakFormGroup.get("prevod").value,
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
    let nicanskaList: NicanskaKlasifikacija = {broj: []};
    for (let i = 0; i < this.znakFormGroup.get("nicanskaKlasifikacija").value.length; i++) {
      nicanskaList.broj.push( this.znakFormGroup.get("nicanskaKlasifikacija").value.at(i))
    }

    return nicanskaList;
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
    let robe: Robe = {
      roba: []
    };

    for (let i = 0; i < this.takseIPriloziFormGroup.get("spisakRoba").value.length; i++) {
      robe.roba.push({
        naziv: this.takseIPriloziFormGroup.get("spisakRoba").value.at(i),
      });
    }

    return {
      "@": {
        primerak_znaka_putanja: this.takseIPriloziFormGroup.get("primerakZnakaPutanja").value,
        punomocje_putanja: this.takseIPriloziFormGroup.get("punomocjePutanja").value,
        opsti_akt_o_kolektivnom_zigu_garancije_putanja: this.takseIPriloziFormGroup.get("opstiAktOKolektivnoZiguPutanja").value,
        dokaz_o_pravu_prvenstva_putanja: this.takseIPriloziFormGroup.get("dozakOPravuPrvenstvaPutanja").value,
        dokaz_o_uplati_takse_putanja: this.takseIPriloziFormGroup.get("dokazOUplatiTaksePutanja").value,
      },
      spisak_roba_i_usluga: robe,
      generalno_punomocje_ranije_prilozeno: this.takseIPriloziFormGroup.get("generalnoPunomocjeRanijePrilozeno").value,
      punomocje_ce_biti_naknadno_dostavljeno: this.takseIPriloziFormGroup.get("punomocjeNaknadnoDostavljeno").value
    }
  }

  prikaz() {
    console.log("kraj");
    console.log(this.podnosilacFormGroup);
    console.log(this.punomocnikFormGroup);
    console.log(this.znakFormGroup);
    console.log(this.takseIPriloziFormGroup);
  }

  sendTrademark(){
    const that = this;
    this.zigService.create(this.getTrademark()).subscribe(
      {
        next(response): void {
          that._toast.success('Uspešno ste poslali zahtev za krerianje ziga', 'Uspešno slanje');
          that._router.navigate([`/zahtev-zig/obrada/${response["body"]}`]);
        },
        error(): void {
          that._toast.error('Desila se greška prilikom slanja zahteva!', 'Greška');
        },
      });
  }

}


