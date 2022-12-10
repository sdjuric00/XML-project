import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adresa } from 'src/app/model/opste/adresa';
import { FizickoLice } from 'src/app/model/opste/fizicko-lice';
import { Institucija } from 'src/app/model/opste/institucija';
import { PravnoLice } from 'src/app/model/opste/pravno-lice';
import { Naziv } from 'src/app/model/patent/naziv';
import { Patent } from 'src/app/model/patent/patent';
import { Podnosilac } from 'src/app/model/patent/podnosilac';
import { PronalazacP } from 'src/app/model/patent/pronalazac-p';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patent-application',
  templateUrl: './patent-application.component.html',
  styleUrls: ['./patent-application.component.css']
})
export class PatentApplicationComponent {
  constructor(private formBuilder: FormBuilder) {
    console.log(formBuilder);
  }

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

  /*getNewConsent(): Patent {

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

    let podaci_o_pronalasku: Naziv[] = [
      {
        "@":{jezik: "srpski"},
        "naziv": this.nazivFormGroup.get('nazivSrpskiCtrl').value
      },
      {
        "@":{jezik: "engleski"},
        "naziv": this.nazivFormGroup.get('nazivEngleskiCtrl').value
      }
    ]*/

    /*let podnosilac = this.getPodnosilac();
    let patent: Patent = {
      Patent: {
        "@": {
          "xmlns": "http://www.vakc-sistem.rs/saglasnost-za-imunizaciju",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xmlns:util": "http://www.vakc-sistem.rs/util",
          "xsi:schemaLocation": "http://www.vakc-sistem.rs/saglasnost-za-imunizaciju saglasnost_za_imunizaciju.xsd",
          broj_prijave:"",
          datum_prijema:"",
          priznati_datum_podnosenja:"",
          dopunska_prijava:false
        },
        institucija: institucija,
        podaci_o_pronalasku: podaci_o_pronalasku,
        podnosilac: podnosilac,
        pronalazac: this.Kontakt,
        punomocnik:,
        dostavljanje:,
        zahtev_za_priznanje_prava_iz_ranijih_prijava:
      }
    }
    return patent;
  }

  getPodnosilac(): Podnosilac{
    if(this.podnosilacFormGroup.get('ime')?.value !== ""){
      let fizicko_lice: FizickoLice = {
      
        "opste:kontakt":{
          "opste:email": 
          "opste:telefon": this.podnosilacFormGroup.get('telefon')?.value,
          "opste:fax": this.podnosilacFormGroup.get('fax')?.value
        },
        "opste:adresa":this.getAdresa(this.podnosilacFormGroup),
        "opste:ime": this.podnosilacFormGroup.get('ime')?.value,
        "opste:prezime": this.podnosilacFormGroup.get('prezime')?.value,
        "opste:jmbg": this.podnosilacFormGroup.get('jmbg')?.value
      }
      return {
        "@": {
          autor: this.podnosilacFormGroup.get('podnosilacAutor')?.value,
        },
        "opste:fizicko-lice": fizicko_lice,
      }
    }
    else{
      let pravno_lice: PravnoLice = {
      
        "opste:kontakt":{
          "opste:email": this.podnosilacFormGroup.get('email')?.value,
          "opste:telefon": this.podnosilacFormGroup.get('telefon')?.value,
          "opste:fax": this.podnosilacFormGroup.get('fax')?.value
        },
        "opste:adresa": {
          "opste:ulica": this.podnosilacFormGroup.get('ulica')?.value,
          "opste:broj": this.podnosilacFormGroup.get('broj')?.value,
          "opste:grad": this.podnosilacFormGroup.get('grad')?.value,
          "opste:postanski_broj": this.podnosilacFormGroup.get('postanski_broj')?.value,
          "opste:drzava": this.podnosilacFormGroup.get('drzava')?.value
        },
        "opste:naziv": this.podnosilacFormGroup.get('naziv')?.value,
        "opste:pib": this.podnosilacFormGroup.get('pib')?.value,
        "opste:registarski_broj": this.podnosilacFormGroup.get('registarski_broj')?.value
      }
      return {
        "@": {
          "autor": this.podnosilacFormGroup.get('podnosilacAutor')?.value,
        },
        "opste:pravno-lice": pravno_lice,
      }
    }
  }

  getPronalazac() : PronalazacP{
    if(this.pronalazacFormGroup.get('ime')?.value !== "" && this.pronalazacFormGroup.get('naziv')?.value !== ""){
      return{
        "@":{
          anoniman: true
        },
        "anonimni_pronalazac":""
      }
    }
    else{
      if(this.pronalazacFormGroup.get('ime')?.value !== ""){
        let fizicko_lice: FizickoLice = {
        
          "opste:kontakt":{
            "opste:email": this.pronalazacFormGroup.get('email')?.value,
            "opste:telefon": this.pronalazacFormGroup.get('telefon')?.value,
            "opste:fax": this.pronalazacFormGroup.get('fax')?.value
          },
          "opste:adresa": {
            "opste:ulica": this.pronalazacFormGroup.get('ulica')?.value,
            "opste:broj": this.pronalazacFormGroup.get('broj')?.value,
            "opste:grad": this.pronalazacFormGroup.get('grad')?.value,
            "opste:postanski_broj": this.pronalazacFormGroup.get('postanski_broj')?.value,
            "opste:drzava": this.podnosilacFormGroup.get('drzava')?.value
          },
          "opste:ime": this.pronalazacFormGroup.get('ime')?.value,
          "opste:prezime": this.pronalazacFormGroup.get('prezime')?.value,
          "opste:jmbg": this.pronalazacFormGroup.get('jmbg')?.value
        }
        return {
          "@": {
            anoniman: false
          },
          "imenovani_pronalazac": fizicko_lice
        }
      }
      else{
        let pravno_lice: PravnoLice = {
        
          "opste:kontakt":{
            "opste:email": this.pronalazacFormGroup.get('email')?.value,
            "opste:telefon": this.pronalazacFormGroup.get('telefon')?.value,
            "opste:fax": this.pronalazacFormGroup.get('fax')?.value
          },
          "opste:adresa": this.getAdresa(this.pronalazacFormGroup),
          "opste:naziv": this.pronalazacFormGroup.get('naziv')?.value,
          "opste:pib": this.pronalazacFormGroup.get('pib')?.value,
          "opste:registarski_broj": this.pronalazacFormGroup.get('registarski_broj')?.value
        }
        return {
          "@": {
            anoniman: false
          },
          "imenovani_pronalazac": pravno_lice,
        }
      }
    }
  }

  getAdresa(formGroup: FormGroup): Adresa{

    let adresa = {
      "opste:ulica": formGroup.get('ulica')?.value,
      "opste:broj": formGroup.get('broj')?.value,
      "opste:grad": formGroup.get('grad')?.value,
      "opste:postanski_broj": formGroup.get('postanski_broj')?.value,
      "opste:drzava": formGroup.get('drzava')?.value
    }
    return adresa;
  }

  sendPatentDoc(){
    const api_url = environment.apiUrl;
    var xmlHttp:XMLHttpRequest = new XMLHttpRequest();
    xmlHttp.open("POST",`${api_url}/patent`);
    var xmlDoc;
    
    xmlHttp.setRequestHeader('Content-Type', 'text/xml');
    var xml = `<?xml version="1.0" encoding="UTF-8"?>
            <zahtev_za_priznavanje_patenta xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.patent/patent" xmlns:opste="http://ftn.ac.rs/opste" broj_prijave="P-2022/2" datum_prijema="2022-11-30" priznati_datum_podnosenja="2022-11-30"
                dopunska_prijava="true">
                
                <institucija>
                    <opste:naziv>Zavod za intelektulanu svojinu</opste:naziv>
                    <opste:adresa>
                        <opste:grad>Beograd</opste:grad>
                        <opste:ulica>Kneginje Ljubice</opste:ulica>
                        <opste:broj>5</opste:broj>
                        <opste:postanski_broj>11000</opste:postanski_broj>
                        <opste:drzava>Republika Srbija</opste:drzava>
                    </opste:adresa>
                </institucija>
                
                <podaci_o_pronalasku>
                    <naziv jezik="srpski">Leteci automobil</naziv>
                    <naziv jezik="engleski">Flying car</naziv>
                </podaci_o_pronalasku>
                
                <podnosilac autor="false">
                    
                    <opste:fizicko_lice>
                        <opste:kontakt>
                            <opste:email>pera@gmail.com</opste:email>
                            <opste:telefon>213212123</opste:telefon>
                            <opste:fax>012345678</opste:fax>
                        </opste:kontakt>
                        <opste:adresa>
                            <opste:grad>Novi Sad</opste:grad>
                            <opste:ulica>Lsla Gala</opste:ulica>
                            <opste:broj>21</opste:broj>
                            <opste:postanski_broj>21000</opste:postanski_broj>
                            <opste:drzava>Republika Srbija</opste:drzava>
                        </opste:adresa>
                        <opste:ime>Pera</opste:ime>
                        <opste:prezime>Peric</opste:prezime>
                        <opste:jmbg>1234567891011</opste:jmbg>
                    </opste:fizicko_lice>
                    
                </podnosilac>
                
                <pronalazac anonimno="false">
                    <imenovani_pronalazac>
                        <fizicko_lice>
                            <opste:kontakt>
                                <opste:email>mile@gmail.com</opste:email>
                                <opste:telefon>213212123</opste:telefon>
                                <opste:fax>012345678</opste:fax>
                            </opste:kontakt>
                            <opste:adresa>
                                <opste:grad>Novi Sad</opste:grad>
                                <opste:ulica>Bul Evrope</opste:ulica>
                                <opste:broj>21</opste:broj>
                                <opste:postanski_broj>21000</opste:postanski_broj>
                                <opste:drzava>Republika Srbija</opste:drzava>
                            </opste:adresa>
                            <opste:ime>Mile</opste:ime>
                            <opste:prezime>Milic</opste:prezime>
                            <opste:jmbg>1234567891011</opste:jmbg>
                        </fizicko_lice>
                    </imenovani_pronalazac>
                </pronalazac>
                
                
                <punomocnik za_zastupanje="true" za_prijem_pismeno="false">
                    <pravno_lice>
                        <opste:kontakt>
                            <opste:email>aleksic@gmail.com</opste:email>
                            <opste:telefon>213212123</opste:telefon>
                            <opste:fax>012345678</opste:fax>
                        </opste:kontakt>
                        <opste:adresa>
                            <opste:grad>Novi Sad</opste:grad>
                            <opste:ulica>Bul Evrope</opste:ulica>
                            <opste:broj>21</opste:broj>
                            <opste:postanski_broj>21000</opste:postanski_broj>
                            <opste:drzava>Republika Srbija</opste:drzava>
                        </opste:adresa>
                        <opste:naziv>Advokatska kancelarija Aleksic</opste:naziv>
                        <opste:pib>123456789</opste:pib>
                        <opste:registarski_broj>12345678</opste:registarski_broj>
                    </pravno_lice>
    
                </punomocnik>
                
                <dostavljanje elektronski="true" pismeno="false">
                    
                    <adresa>
                        <opste:grad>Novi Sad</opste:grad>
                        <opste:ulica>Bul Oslobodjenja</opste:ulica>
                        <opste:broj>15</opste:broj>
                        <opste:postanski_broj>21000</opste:postanski_broj>
                        <opste:drzava>Republika Srbija</opste:drzava>
                    </adresa>
                </dostavljanje>
                <zahtev_za_priznanje_prava_iz_ranijih_prijava>
                    <prijava>
                        <datum_podnosenja_prijave>2022-11-30</datum_podnosenja_prijave>
                        <broj_ranije_prijave>P-2022/1</broj_ranije_prijave>
                        <dvoslovna_oznaka_drzave>RS</dvoslovna_oznaka_drzave>
                    </prijava>
                </zahtev_za_priznanje_prava_iz_ranijih_prijava>
            </zahtev_za_priznavanje_patenta>`;
    console.log(xml);

    xmlHttp.send(xml);
  }*/

}
