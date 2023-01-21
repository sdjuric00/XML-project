import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Adresa } from 'src/app/model/opste/adresa/xml/adresa';
import { FizickoLice } from 'src/app/model/opste/fizicko-lice';
import { Institucija } from 'src/app/model/opste/institucija/xml/institucija';
import { Kontakt } from 'src/app/model/opste/kontakt/xml/kontakt';
import { PravnoLice } from 'src/app/model/opste/pravno-lice';
import { Dostavljanje } from 'src/app/model/patent/xml/dostavljanje';
import { ImenovaniPronalazac } from 'src/app/model/patent/xml/imenovani-pronalazac';
import { Naziv } from 'src/app/model/patent/xml/naziv';
import { Patent } from 'src/app/model/patent/xml/patent';
import { PodaciOPronalasku } from 'src/app/model/patent/xml/podaci_o_pronalasku';
import { Podnosilac } from 'src/app/model/patent/xml/podnosilac';
import { Prijava } from 'src/app/model/patent/xml/prijava';
import { Prijave } from 'src/app/model/patent/xml/prijave';
import { PronalazacP } from 'src/app/model/patent/xml/pronalazac-p';
import { PunomocnikP } from 'src/app/model/patent/xml/punomocnik-p';
import { PatentApplicationService } from 'src/app/service/patent-application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patent-application',
  templateUrl: './patent-application.component.html',
  styleUrls: ['./patent-application.component.css']
})
export class PatentApplicationComponent {
  constructor(
    private formBuilder: FormBuilder, 
    private patentService: PatentApplicationService, 
    private datePipe: DatePipe, 
    private toast: ToastrService, 
    private router: Router
    ) {}

  nazivFormGroup = this.formBuilder.group({
    nazivSrpskiCtrl: new FormControl('', [Validators.required]),
    nazivEngleskiCtrl: new FormControl('', [Validators.required])
  })

  continueBtn(){
    console.log(this.podnosilacFormGroup.value);
    console.log(this.punomocnikFormGroup.value);
    console.log(this.pronalazacFormGroup.value);
    console.log(this.dostavljanjeFormGroup.value);
  }

  podnosilacFormGroup = this.formBuilder.group({
    tipPodnosioca: new FormControl('Fizičko lice'),
    podnosilacAutor: new FormControl(false),
    email: ['', [Validators.required, Validators.email]],
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

  pronalazacFormGroup = this.formBuilder.group({
    tipPodnosioca: new FormControl('Fizičko lice'),
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

  punomocnikFormGroup = this.formBuilder.group({
    zaPismeno: new FormControl(true),
    zaZastupanje: new FormControl(true),
    tipPodnosioca: new FormControl('Fizičko lice'),
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

  dostavljanjeFormGroup = this.formBuilder.group({
    ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    broj: new FormControl('', [Validators.required, Validators.pattern("[0-9A-Za-z ]{1,5}")]),
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    elektronski: new FormControl(false),
    pismeno: new FormControl(false)
  });

  prijaveFormGroup = this.formBuilder.group({
    prijave: new FormControl([]),
    datumPrijave: new FormControl('',[Validators.required]),
    brojPrijave: new FormControl('',[Validators.required]),
    oznakaDrzave: new FormControl('',[Validators.required])
  });

  getPodaciOPronalasku(): PodaciOPronalasku{

    let podaci: PodaciOPronalasku = {naziv_patenta: []};

    let nazivSrpski:Naziv = {
        "@": {jezik: "srpski"},
        "#": this.nazivFormGroup.get('nazivSrpskiCtrl').value
    };

    let nazivEngleski:Naziv = {

        "@": {jezik: "engleski"},
        "#": this.nazivFormGroup.get('nazivEngleskiCtrl').value

    };

    podaci.naziv_patenta.push(nazivSrpski);
    podaci.naziv_patenta.push(nazivEngleski)

    return podaci;

  }
  getPatent(): Patent {

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


    let patent: Patent = {
      zahtev_za_priznavanje_patenta: {
        "@": {
          "xmlns": "http://www.patent/patent",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xmlns:opste": "http://ftn.ac.rs/opste",
          broj_prijave: "",
          datum_prijema: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          priznati_datum_podnosenja: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          dopunska_prijava:false,
          pregledano: false,
          referenca_na_podnosioca: localStorage.getItem('korisnik_id')
        },
        institucija: institucija,
        podaci_o_pronalasku: this.getPodaciOPronalasku(),
        podnosilac: this.getPodnosilac(),
        pronalazac: this.getPronalazac(),
        punomocnik: this.getPunomocnik(),
        dostavljanje: this.getDostavljanje(),
        zahtev_za_priznanje_prava_iz_ranijih_prijava: this.getPrijave(),
      }
    }
    return patent;

  }

  getPodnosilac(): Podnosilac{
    if(this.podnosilacFormGroup.get('ime')?.value !== null){

      return {
        "@": {
          autor: this.podnosilacFormGroup.get('podnosilacAutor')?.value,
        },
        "opste:fizicko_lice": this.getFizickoLice(this.podnosilacFormGroup),
      }
    }
    else{

      return {
        "@": {
          "autor": this.podnosilacFormGroup.get('podnosilacAutor')?.value,
        },
        "opste:pravno_lice": this.getPravnoLice(this.podnosilacFormGroup),
      }
    }
  }

  getPronalazac() : PronalazacP{
    console.log(this.pronalazacFormGroup);
    if(this.pronalazacFormGroup.get('ime')?.value === null && this.pronalazacFormGroup.get('naziv')?.value === null){
      return{
        "@":{
          anonimno: true
        },
        "anonimni_pronalazac":""
      }
    }
    else{
      if(this.pronalazacFormGroup.get('ime')?.value !== null){

        let imenovani_pronalazac: ImenovaniPronalazac = {
          "fizicko_lice" : this.getFizickoLice(this.pronalazacFormGroup)
        }
        return {
          "@": {
            anonimno: false
          },
          "imenovani_pronalazac": imenovani_pronalazac
        }
      }
      else{


        let imenovani_pronalazac: ImenovaniPronalazac = {
          "pravno_lice": this.getPravnoLice(this.pronalazacFormGroup)
        }
        return {
          "@": {
            anonimno: false
          },
          "imenovani_pronalazac": imenovani_pronalazac,
        }
      }
    }
  }

  getPunomocnik(): PunomocnikP {
    console.log(this.podnosilacFormGroup.get('ime')?.value );
    if(this.punomocnikFormGroup.get('ime')?.value !== null){

      return {
        "@":{
          za_zastupanje: this.punomocnikFormGroup.get('zaZastupanje').value,
          za_prijem_pismeno: this.punomocnikFormGroup.get('zaPismeno').value
      },
      fizicko_lice: this.getFizickoLice(this.punomocnikFormGroup)
      }
    }
    else{

      return {
        "@":{
          za_zastupanje: this.punomocnikFormGroup.get('zaZastupanje').value,
          za_prijem_pismeno: this.punomocnikFormGroup.get('zaPismeno').value
      },
      pravno_lice: this.getPravnoLice(this.punomocnikFormGroup)
      }
    }
  }

  getAdresa(formGroup: FormGroup): Adresa{
    let adresa = {
      "opste:grad": formGroup.get('grad')?.value,
      "opste:ulica": formGroup.get('ulica')?.value,
      "opste:broj": formGroup.get('broj').value,
      "opste:postanski_broj": formGroup.get('postanskiBroj')?.value,
      "opste:drzava": formGroup.get('drzava')?.value
    }
    return adresa;
  }

  getKontakt(formGroup: FormGroup): Kontakt{
    let kontakt = {
      "opste:email": formGroup.get('email')?.value,
      "opste:telefon": formGroup.get('telefon')?.value,
      "opste:fax": formGroup.get('fax')?.value
    }
    return kontakt;
  }

 getPravnoLice(formGroup: FormGroup): PravnoLice{
    let pravno_lice = {
      "opste:kontakt":this.getKontakt(formGroup),
      "opste:adresa": this.getAdresa(formGroup),
      "opste:naziv": formGroup.get('naziv')?.value,
      "opste:pib": formGroup.get('pib')?.value,
      "opste:registarski_broj": formGroup.get('registarskiBroj')?.value
    }
    return pravno_lice;
  }

  getDostavljanje(): Dostavljanje{
    return {
      "@":{
        elektronski: this.dostavljanjeFormGroup.get('elektronski').value,
        pismeno:this.dostavljanjeFormGroup.get('pismeno').value
    },
    "adresa": this.getAdresa(this.dostavljanjeFormGroup)
    }
  }

  getFizickoLice(formGroup: FormGroup): FizickoLice{
    let fizicko_lice = {
      "opste:kontakt":this.getKontakt(formGroup),
      "opste:adresa": this.getAdresa(formGroup),
      "opste:ime": formGroup.get('ime')?.value,
      "opste:prezime": formGroup.get('prezime')?.value,
      "opste:jmbg": formGroup.get('jmbg')?.value
    }

    return fizicko_lice;
  }

  getPrijave(): Prijave{
    let prijave: Prijave = {prijava: []};
    this.prijaveFormGroup.get('prijave').value.forEach(prijava =>
    {
      console.log(prijava)
      prijave.prijava.push(prijava)
    })
    return prijave;
  }

  richEditKomponenta(){
    this.router.navigate(['rich-edit']);
  }

  kreirajZahtevPatent(){

    let patent = this.getPatent();
    const that = this;
    this.patentService.create(patent, true).subscribe({
      next(response) {
        that.toast.success('Uspešno ste poslali zahtev za priznavanje patenta.', 'Uspešno slanje');
        that.router.navigate([`/zahtev-patent/obrada/${response["body"]}`]);
      },
      error(): void {
       that.toast.error('Desila se greška prilikom slanja zahteva!', 'Greška');
      },
    });

  }
}
