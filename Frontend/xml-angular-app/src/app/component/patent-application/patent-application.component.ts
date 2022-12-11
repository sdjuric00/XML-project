import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adresa } from 'src/app/model/opste/adresa';
import { FizickoLice } from 'src/app/model/opste/fizicko-lice';
import { Institucija } from 'src/app/model/opste/institucija';
import { Kontakt } from 'src/app/model/opste/kontakt';
import { PravnoLice } from 'src/app/model/opste/pravno-lice';
import { Dostavljanje } from 'src/app/model/patent/dostavljanje';
import { ImenovaniPronalazac } from 'src/app/model/patent/imenovani-pronalazac';
import { Naziv } from 'src/app/model/patent/naziv';
import { Patent } from 'src/app/model/patent/patent';
import { PodaciOPronalasku } from 'src/app/model/patent/podaci_o_pronalasku';
import { Podnosilac } from 'src/app/model/patent/podnosilac';
import { Prijava } from 'src/app/model/patent/prijava';
import { PronalazacP } from 'src/app/model/patent/pronalazac-p';
import { PunomocnikP } from 'src/app/model/patent/punomocnik-p';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patent-application',
  templateUrl: './patent-application.component.html',
  styleUrls: ['./patent-application.component.css']
})
export class PatentApplicationComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  nazivFormGroup = this.formBuilder.group({
    nazivSrpskiCtrl: new FormControl(''),
    nazivEngleskiCtrl: new FormControl('')
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
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    naziv: new FormControl('', [Validators.required]),
    pib: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    registarskiBroj: new FormControl('', [Validators.required, Validators.pattern("([0-9]{8}|([A-Za-z]{2}[0-9]{6}))")])
  });

  pronalazacFormGroup = this.formBuilder.group({
    tipPronalazaca: new FormControl('Fizičko lice'),
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

  punomocnikFormGroup = this.formBuilder.group({
    zaPismeno: new FormControl(true),
    zaZastupanje: new FormControl(true),
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

  dostavljanjeFormGroup = this.formBuilder.group({
    ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    elektronski: new FormControl(false),
    pismeno: new FormControl(false)
  });
  getPodaciOPronalasku(): PodaciOPronalasku{

    let podaci: Naziv[] = [];
    let nazivSrpski:Naziv = {
    naziv:{
        "@": {jezik: "srpski"},
        "#": this.nazivFormGroup.get('nazivSrpskiCtrl').value
      
    }};

    let nazivEngleski:Naziv = {
      naziv:{
        "@": {jezik: "engleski"},
        "#": this.nazivFormGroup.get('nazivEngleskiCtrl').value
      }
    };
    podaci.push(nazivSrpski);
    podaci.push(nazivEngleski);

  
    return {"#": podaci};
      
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
          broj_prijave:"",
          datum_prijema:"",
          priznati_datum_podnosenja:"",
          dopunska_prijava:false
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
    if(this.podnosilacFormGroup.get('ime')?.value !== ""){
     
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
    if(this.pronalazacFormGroup.get('ime')?.value === "" && this.pronalazacFormGroup.get('naziv')?.value === ""){
      return{
        "@":{
          anoniman: true
        },
        "anonimni_pronalazac":""
      }
    }
    else{
      if(this.pronalazacFormGroup.get('ime')?.value !== ""){

        let imenovani_pronalazac: ImenovaniPronalazac = {
          "fizicko_lice" : this.getFizickoLice(this.pronalazacFormGroup)
        }
        return {
          "@": {
            anoniman: false
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
            anoniman: false
          },
          "imenovani_pronalazac": imenovani_pronalazac,
        }
      }
    }
  }

  getPunomocnik(): PunomocnikP {
    if(this.podnosilacFormGroup.get('ime')?.value !== ""){
     
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
    /*let ulica = formGroup.get('ulica')?.value;
    console.log(ulica);
    let imeUlice = "";
    let broj = "";
    if(ulica != ""){
      let imeUlice = ulica.split(" ")[0];
      let broj = ulica.split(" ")[1];
    }*/
    let adresa = {
      "opste:ulica": formGroup.get('ulica')?.value,
      "opste:broj": formGroup.get('broj')?.value,
      "opste:grad": formGroup.get('grad')?.value,
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
      "opste:registarski_broj": formGroup.get('registarski_broj')?.value
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

  getPrijave(): Prijava[]{
    let prijave: Prijava[] = [
    ]
    return prijave;
  }

  sendPatentDoc(){
    console.log("fafsfaf");
    let headers = new HttpHeaders({ "Content-Type": "application/xml"});
    let patent = this.getPatent();
    console.log(patent);
    var o2x = require('object-to-xml');
    console.log(o2x(patent));
    let queryParams = {};
    queryParams = {
      headers: headers, 
      observe: "response",
      responseType: "text"
    };
    const api_url = environment.apiUrl;
    this.http.post(`${api_url}/patent`, o2x(patent), queryParams).subscribe(response => {
      console.log(response);
    })
  }
}
