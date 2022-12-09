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
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  podnosilacFormGroup = this._formBuilder.group({
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
  })

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  setEmail(email: string){
    this.podnosilacFormGroup.value.email = email;
    console.log(this.podnosilacFormGroup);
  }

  podnosilacFormHasError(){

    return this.podnosilacFormGroup.invalid;
  }

}
