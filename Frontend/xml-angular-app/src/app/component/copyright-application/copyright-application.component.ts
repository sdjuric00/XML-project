import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-copyright-application',
  templateUrl: './copyright-application.component.html',
  styleUrls: ['./copyright-application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class CopyrightApplicationComponent implements OnInit {

  imeInstitucije: string = "Zavod za intelektualnu svojinu";
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
    vrsta: new FormControl(''),
    formaZapisa: new FormControl(''),
    naslov: new FormControl('', [Validators.required]),
    alternativniNaslov: new FormControl(''),
    nacinKoriscenja: new FormControl([Validators.required]),
    naslovPrerade: new FormControl(''),
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
    drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),

  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  prikaz() {
    console.log("kraj");
    console.log(this.podnosilacFormGroup);
    console.log(this.punomocnikFormGroup);
    console.log(this.autorskoDeloFormGroup);
    console.log(this.autoriFromGroup);
    console.log(this.priloziFromGroup);
  }
}
