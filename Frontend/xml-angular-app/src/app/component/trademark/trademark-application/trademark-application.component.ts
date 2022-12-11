import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-trademark-application',
  templateUrl: './trademark-application.component.html',
  styleUrls: ['./trademark-application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
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
    podaciOZajednickomPredstavniku: new FormControl('', Validators.required),
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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
