import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CopyrightApplicationService} from "../../../service/copyright-application.service";
import {Institucija} from "../../../model/opste/institucija";
import {Autori, Prilozi, ZahtevAutorskoPravo} from "../../../model/copyright/zahtev-autorsko-pravo";
import {DatePipe} from "@angular/common";
import {Podnosilac} from "../../../model/patent/podnosilac";
import {FizickoLice} from "../../../model/opste/fizicko-lice";
import {Adresa} from "../../../model/opste/adresa";
import {Kontakt} from "../../../model/opste/kontakt";
import {PravnoLice} from "../../../model/opste/pravno-lice";
import {PunomocnikAutorskaPrava} from "../../../model/copyright/punomocnik-autorska-prava";
import {AutorskoDelo} from "../../../model/copyright/autorsko-delo";
import {VrstaAutorskogDela} from "../../../model/copyright/vrsta-autorskog-dela";
import {FormaZapisa} from "../../../model/copyright/forma-zapisa";
import {PodaciONaslovuPrerada} from "../../../model/copyright/podaci-o-naslovu-prerada";
import {AutorInList, AutorXml} from "../../../model/copyright/autor-xml";
import {ImenovanAutor} from "../../../model/copyright/imenovan-autor";
import {Prilog, PrilogInList} from "../../../model/copyright/prilog";
import {Autor} from "../../../model/autor";
import {PrilogForm} from "../prilozi/prilozi.component";

@Component({
  selector: 'app-copyright-application',
  templateUrl: './copyright-application.component.html',
  styleUrls: ['./copyright-application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    DatePipe
  ],
})
export class CopyrightApplicationComponent implements OnInit {

  adresa = {
    grad: "Beograd",
    ulica: "Kneginje Ljubice",
    broj: "5",
    postanskiBroj: 11000,
    drzava: "Republika Srbija"
  }

  priloziFromGroup = this._formBuilder.group({
    prilozi: new FormControl([])
  })

  autoriFromGroup = this._formBuilder.group({
    autori: new FormControl([]),
    anonimniAutor: new FormControl(false),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern("[0-9]{8,12}")]),
    fax: new FormControl('', [Validators.required, Validators.pattern("[0][0-9]{8,9}")]),
    ime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    prezime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    drzavljanstvo: new FormControl('',[Validators.required]),
    godinaSmrti: new FormControl(''),
    pseudonim: new FormControl(''),
    ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)])
  });

  podnosilacFormGroup = this._formBuilder.group({
    tipPodnosioca: new FormControl('Fizičko lice'),
    podnosilacAutor: new FormControl(false),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.pattern("[0-9]{8,12}")]),
    fax: new FormControl('', [Validators.required, Validators.pattern("[0][0-9]{8,9}")]),
    ime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    prezime: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    jmbg: new FormControl('', [Validators.required, Validators.pattern("[0-9]{13}")]),
    ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    naziv: new FormControl('', [Validators.required]),
    pib: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    registarskiBroj: new FormControl('', [Validators.required, Validators.pattern("([0-9]{8}|([A-Za-z]{2}[0-9]{6}))")])
  });

  autorskoDeloFormGroup = this._formBuilder.group({
    stvorenoURadnomOdnosu: new FormControl(false),
    deloJePrerada: new FormControl(false),
    vrstaJeCustom: new FormControl(false),
    vrsta: new FormControl(''),
    formaZapisaJeCustom: new FormControl(false),
    formaZapisa: new FormControl(''),
    naslov: new FormControl('', [Validators.required]),
    alternativniNaslov: new FormControl(''),
    nacinKoriscenja: new FormControl(''),
    naslovPrerade: new FormControl(''),
    anonimniAutor: new FormControl(false),
    email: new FormControl('' ),
    telefon: new FormControl(''),
    fax: new FormControl(''),
    ime: new FormControl(''),
    prezime: new FormControl(''),
    drzavljanstvo: new FormControl(''),
    godinaSmrti: new FormControl(''),
    pseudonim: new FormControl(''),
    ulica: new FormControl(''),
    grad: new FormControl('', ),
    postanskiBroj: new FormControl(''),
    drzava: new FormControl('')
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _copyrightService:CopyrightApplicationService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
  }

  prikaz() {
    this._copyrightService.create(this.getZahtevZaAutorskoPravo());
    console.log("kraj");
    console.log(this.podnosilacFormGroup);
    console.log(this.punomocnikFormGroup);
    console.log(this.autorskoDeloFormGroup);
    console.log(this.autoriFromGroup);
    console.log(this.priloziFromGroup);
  }

  getZahtevZaAutorskoPravo(): ZahtevAutorskoPravo {
    const institucija: Institucija = {
      "opste:naziv": "Zavod za intelektualnu svojinu",
      "opste:adresa": {
        "opste:grad": "Beograd",
        "opste:ulica": "Kneginje Ljubice",
        "opste:broj": "5",
        "opste:postanski_broj": "11000",
        "opste:drzava": "Republika Srbija"
      }
    }
    console.log(this._datePipe.transform(new Date(), 'yyyy-MM-dd'));
    return {
      zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela: {
        "@": {
          "xmlns": "http://ftn.ac.rs/a",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xmlns:opste": "http://ftn.ac.rs/opste",
          "xsi:schemaLocation": "http://ftn.ac.rs/a",
          obrazac: "A-1",
          broj_prijave: "A-2022/1",
          datum_podnosenja: this._datePipe.transform(new Date(), 'yyyy-MM-dd'),
          pregledano: "false"
        },
        institucija: institucija,
        podnosilac: this.getPodnosilac(),
        punomocnik: this.getPunomocnik(),
        autorsko_delo: this.getAutorskoDelo(),
        autori: this.getAutori(),
        prilozi: this.getPrilozi(),
      }
    };
  }

  getPodnosilac(): Podnosilac {
    let podnosilacAutor=this.podnosilacFormGroup.get('podnosilacAutor')?.value;
    if (this.podnosilacFormGroup.get('podnosilacAutor')?.value === null || this.podnosilacFormGroup.get('podnosilacAutor')?.value === undefined){
      podnosilacAutor = false;
    }
    if (this.podnosilacFormGroup.get('tipPodnosioca').value === null ||
      this.podnosilacFormGroup.get('tipPodnosioca').value === undefined ||
      this.podnosilacFormGroup.get('tipPodnosioca').value === 'Fizičko lice'
    ) {

      return {
        "@": {
          autor: podnosilacAutor + "",
        },
        "opste:fizicko_lice": this.getFizickoLice(this.podnosilacFormGroup),
      }
    } else{

      return {
        "@": {
          "autor": podnosilacAutor + "",
        },
        "opste:pravno_lice": this.getPravnoLice(this.podnosilacFormGroup),
      }
    }
  }

  getPunomocnik(): PunomocnikAutorskaPrava {
    if(this.punomocnikFormGroup.get('tipPunomocnika').value === null ||
      this.punomocnikFormGroup.get('tipPunomocnika').value === undefined ||
      this.punomocnikFormGroup.get('tipPunomocnika').value === 'Fizičko lice'){

      return {
        "opste:fizicko_lice": this.getFizickoLice(this.punomocnikFormGroup)
      }
    }
    else{

      return {
        "opste:pravno_lice": this.getPravnoLice(this.punomocnikFormGroup)
      }
    }
  }

  getAutorskoDelo(): AutorskoDelo {
    if(this.autorskoDeloFormGroup.get('alternativniNaslov').value === ''){
      if (this.autorskoDeloFormGroup.get('deloJePrerada').value){
        return {
          "@": {
            stvoreno_u_radnom_odnosu: this.autorskoDeloFormGroup.get('stvorenoURadnomOdnosu').value+"",
            nacin_koriscenja: this.autorskoDeloFormGroup.get('nacinKoriscenja').value
          },
          vrsta_autorskog_dela: this.getVrstaAutorskogDela(),
          forma_zapisa: this.getFormaZapisaAutorskogDela(),
          naslov: this.autorskoDeloFormGroup.get('naslov').value,
          podaci_o_naslovu_prerada: this.getPodaciONaslovuPrerada()
        }
      }
      else {
        return {
          "@": {
            stvoreno_u_radnom_odnosu: this.autorskoDeloFormGroup.get('stvorenoURadnomOdnosu').value+"",
            nacin_koriscenja: this.autorskoDeloFormGroup.get('nacinKoriscenja').value
          },
          vrsta_autorskog_dela: this.getVrstaAutorskogDela(),
          forma_zapisa: this.getFormaZapisaAutorskogDela(),
          naslov: this.autorskoDeloFormGroup.get('naslov').value
        }
      }
    }
    else{
      if (this.autorskoDeloFormGroup.get('deloJePrerada').value){
        return {
          "@": {
            stvoreno_u_radnom_odnosu: this.autorskoDeloFormGroup.get('stvorenoURadnomOdnosu').value+"",
            nacin_koriscenja: this.autorskoDeloFormGroup.get('nacinKoriscenja').value
          },
          vrsta_autorskog_dela: this.getVrstaAutorskogDela(),
          forma_zapisa: this.getFormaZapisaAutorskogDela(),
          naslov: this.autorskoDeloFormGroup.get('naslov').value,
          alternativni_naslov: this.autorskoDeloFormGroup.get('alternativniNaslov').value,
          podaci_o_naslovu_prerada: this.getPodaciONaslovuPrerada()
        }
      }else{
        return {
          "@": {
            stvoreno_u_radnom_odnosu: this.autorskoDeloFormGroup.get('stvorenoURadnomOdnosu').value+"",
            nacin_koriscenja: this.autorskoDeloFormGroup.get('nacinKoriscenja').value
          },
          vrsta_autorskog_dela: this.getVrstaAutorskogDela(),
          forma_zapisa: this.getFormaZapisaAutorskogDela(),
          naslov: this.autorskoDeloFormGroup.get('naslov').value,
          alternativni_naslov: this.autorskoDeloFormGroup.get('alternativniNaslov').value
        }
      }
    }
  }

  getFizickoLice(formGroup: FormGroup): FizickoLice{

    return {
      "opste:kontakt": this.getKontakt(formGroup),
      "opste:adresa": this.getAdresa(formGroup),
      "opste:ime": formGroup.get('ime')?.value,
      "opste:prezime": formGroup.get('prezime')?.value,
      "opste:jmbg": formGroup.get('jmbg')?.value
    };
  }

  getPravnoLice(formGroup: FormGroup): PravnoLice{
    return {
      "opste:kontakt": this.getKontakt(formGroup),
      "opste:adresa": this.getAdresa(formGroup),
      "opste:naziv": formGroup.get('naziv')?.value,
      "opste:pib": formGroup.get('pib')?.value,
      "opste:registarski_broj": formGroup.get('registarskiBroj')?.value
    };
  }

  getAdresa(formGroup: FormGroup): Adresa{
    /*let ulica = formGroup.get('ulica')?.value;
    console.log(ulica);
    let imeUlice = "";
    let broj = "";
    if(ulica != ""){
      let imeUlice = ulica.split(" ")[0];
      let broj = ulica.split(" ")[1];
    }*/
    let adresa = {
      "opste:grad": formGroup.get('grad')?.value,
      "opste:ulica": formGroup.get('ulica')?.value,
      "opste:broj": "21",
      "opste:postanski_broj": formGroup.get('postanskiBroj')?.value,
      "opste:drzava": formGroup.get('drzava')?.value
    }
    return adresa;
  }

  getKontakt(formGroup: FormGroup): Kontakt {
    let kontakt = {
      "opste:email": formGroup.get('email')?.value,
      "opste:telefon": formGroup.get('telefon')?.value,
      "opste:fax": formGroup.get('fax')?.value
    }
    return kontakt;
  }

  private getVrstaAutorskogDela(): VrstaAutorskogDela {
    if (this.autorskoDeloFormGroup.get('vrstaJeCustom').value){

      return {
        "vrsta_custom": this.autorskoDeloFormGroup.get('vrsta').value
      }
    }
    return {
      "vrsta_enum": this.autorskoDeloFormGroup.get('vrsta').value
    }
  }

  private getFormaZapisaAutorskogDela(): FormaZapisa {
    if (this.autorskoDeloFormGroup.get('formaZapisaJeCustom').value){

      return {
        "vrsta_custom": this.autorskoDeloFormGroup.get('formaZapisa').value
      }
    }
    return {
      "vrsta_enum": this.autorskoDeloFormGroup.get('formaZapisa').value
    }
  }

  private getPodaciONaslovuPrerada(): PodaciONaslovuPrerada {
    return {
      naslov: this.autorskoDeloFormGroup.get('naslovPrerade').value,
      autor: this.getAutor(this.autorskoDeloFormGroup)
    }
  }

  private getAutor(formGroup: FormGroup): AutorXml {
    if (formGroup.get('anonimniAutor').value) {
      return {
        anonimni_autor: ''
      }
    }
    else {
      return {
        imenovani_autor: this.getImenovaniAutor(formGroup)
      }
    }
  }

  private getImenovaniAutor(formGroup: FormGroup): ImenovanAutor {
    if (formGroup.get('godinaSmrti').value === '') {
      if (formGroup.get('pseudonim').value === '') {
        return {
          "opste:kontakt": this.getKontakt(formGroup),
          "opste:adresa": this.getAdresa(formGroup),
          "ime": formGroup.get('ime').value,
          "prezime": formGroup.get('prezime').value,
          "drzavljanstvo": formGroup.get('drzavljanstvo').value
        }
      }
      else {
        return {
          "opste:kontakt": this.getKontakt(formGroup),
          "opste:adresa": this.getAdresa(formGroup),
          "ime": formGroup.get('ime').value,
          "prezime": formGroup.get('prezime').value,
          "drzavljanstvo": formGroup.get('drzavljanstvo').value,
          "pseudonim": formGroup.get('pseudonim').value
        }
      }

    }
    else {
      if (this.autorskoDeloFormGroup.get('pseudonim').value === '') {
        return {
          "opste:kontakt": this.getKontakt(formGroup),
          "opste:adresa": this.getAdresa(formGroup),
          ime: formGroup.get('ime').value,
          prezime: formGroup.get('prezime').value,
          drzavljanstvo: formGroup.get('drzavljanstvo').value,
          godina_smrti: formGroup.get('godinaSmrti').value
        }
      }
      else {
        return {
          "opste:kontakt": this.getKontakt(formGroup),
          "opste:adresa": this.getAdresa(formGroup),
          ime: formGroup.get('ime').value,
          prezime: formGroup.get('prezime').value,
          drzavljanstvo: formGroup.get('drzavljanstvo').value,
          godina_smrti: formGroup.get('godinaSmrti').value,
          pseudonim: formGroup.get('pseudonim').value
        }
      }
    }
  }

  private getPrilozi(): Prilozi {
    let prilozi: Prilozi = {prilog: []};
    this.priloziFromGroup.get('prilozi').value.forEach(pr =>
    {
      prilozi.prilog.push(this.getPrilog(pr))
    })

    return prilozi;
  }

  private getAutori(): Autori {
    let autori: Autori = {autor: []};
    this.autoriFromGroup.get('autori').value.forEach(autor =>
    {
      autori.autor.push(this.getAutorFromObject(autor))
    })

    return autori;
  }


  private getAutorFromObject(autor: Autor): AutorXml {
    if (autor.ime === '') {
      return {
        anonimni_autor: ''
      }
    }
    else {
      return {
        imenovani_autor: this.getImenovaniAutorFromObject(autor)
      }
    }
  }

  private getImenovaniAutorFromObject(autor: Autor): ImenovanAutor {
    if (autor.godinaSmrti === null || autor.godinaSmrti === undefined || autor.godinaSmrti === '') {
      if (autor.pseudonim === null || autor.pseudonim === undefined || autor.pseudonim === '') {
        return {
          "opste:kontakt": this.getKontaktFromObject(autor),
          "opste:adresa": this.getAdresaFromObject(autor),
          "ime": autor.ime,
          "prezime": autor.prezime,
          "drzavljanstvo": autor.drzavljanstvno
        }
      }
      else {
        return {
          "opste:kontakt": this.getKontaktFromObject(autor),
          "opste:adresa": this.getAdresaFromObject(autor),
          "ime": autor.ime,
          "prezime": autor.prezime,
          "drzavljanstvo": autor.drzavljanstvno,
          "pseudonim": autor.pseudonim
        }
      }

    }
    else {
      if (this.autorskoDeloFormGroup.get('pseudonim').value === '') {
        return {
          "opste:kontakt": this.getKontaktFromObject(autor),
          "opste:adresa": this.getAdresaFromObject(autor),
          ime: autor.ime,
          prezime: autor.prezime,
          drzavljanstvo: autor.drzavljanstvno,
          godina_smrti: autor.godinaSmrti
        }
      }
      else {
        return {
          "opste:kontakt": this.getKontaktFromObject(autor),
          "opste:adresa": this.getAdresaFromObject(autor),
          ime: autor.ime,
          prezime: autor.prezime,
          drzavljanstvo: autor.drzavljanstvno,
          godina_smrti: autor.godinaSmrti,
          pseudonim: autor.pseudonim
        }
      }
    }
  }

  private getKontaktFromObject(autor: Autor): Kontakt {

    return {
      "opste:email": autor.kontakt.email,
      "opste:telefon": autor.kontakt.telefon,
      "opste:fax": autor.kontakt.fax
    };
  }

  private getAdresaFromObject(autor: Autor): Adresa {

    return {
      "opste:grad": autor.adresa.grad,
      "opste:ulica": autor.adresa.ulica,
      "opste:broj": "21",
      "opste:postanski_broj": autor.adresa.postanskiBroj,
      "opste:drzava": autor.adresa.drzava
    };
  }

  private getPrilog(prilog: PrilogForm): Prilog {

    return {
      "@": {
        putanja: prilog.putanja?.name
      },
      opis: prilog.opis
    };
  }
}