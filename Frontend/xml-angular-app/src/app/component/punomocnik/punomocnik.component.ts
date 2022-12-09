import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-punomocnik',
  templateUrl: './punomocnik.component.html',
  styleUrls: ['./punomocnik.component.css']
})
export class PunomocnikComponent implements OnInit {
  tipPunomocnika: string='Fizičko lice';
  public punomocnikFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.punomocnikFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.punomocnikFormGroup = <FormGroup>this.controlContainer.control;
    this.punomocnikFormGroup.clearValidators();
    if (this.tipPunomocnika === 'Fizičko lice'){
      this.punomocnikFormGroup.get('naziv')?.setValidators(null);
      this.punomocnikFormGroup.get('pib')?.setValidators(null);
      this.punomocnikFormGroup.get('registarskiBroj')?.setValidators(null);
    }
    else {
      this.punomocnikFormGroup.get('ime')?.setValidators(null);
      this.punomocnikFormGroup.get('prezime')?.setValidators(null);
      this.punomocnikFormGroup.get('jmbg')?.setValidators(null);
    }
    this.punomocnikFormGroup.updateValueAndValidity();
    this.punomocnikFormGroup.reset();
  }

  changeRadioButton(lice: string):void {
    this.tipPunomocnika = lice;
    this.punomocnikFormGroup.clearValidators();
    if (this.tipPunomocnika === 'Fizičko lice'){

      this.punomocnikFormGroup.get('ime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.punomocnikFormGroup.get('ime')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('prezime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.punomocnikFormGroup.get('prezime')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('jmbg')?.setValidators([Validators.required, Validators.pattern("[0-9]{13}")]);
      this.punomocnikFormGroup.get('jmbg')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('naziv')?.setValidators([]);
      this.punomocnikFormGroup.get('naziv')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('pib')?.setValidators([]);
      this.punomocnikFormGroup.get('pib')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('registarskiBroj')?.setValidators([]);
      this.punomocnikFormGroup.get('registarskiBroj')?.updateValueAndValidity();

    } else {
      this.punomocnikFormGroup.get('naziv')?.setValidators([Validators.required]);
      this.punomocnikFormGroup.get('naziv')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('pib')?.setValidators([Validators.required, Validators.pattern("[0-9]{9}")]);
      this.punomocnikFormGroup.get('pib')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('registarskiBroj')?.setValidators([Validators.required, Validators.pattern("([0-9]{8}|([A-Za-z]{2}[0-9]{6}))")]);
      this.punomocnikFormGroup.get('registarskiBroj')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('ime')?.setValidators([]);
      this.punomocnikFormGroup.get('ime')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('prezime')?.setValidators([]);
      this.punomocnikFormGroup.get('prezime')?.updateValueAndValidity();

      this.punomocnikFormGroup.get('jmbg')?.setValidators([]);
      this.punomocnikFormGroup.get('jmbg')?.updateValueAndValidity();
    }
    this.punomocnikFormGroup.reset();
    this.punomocnikFormGroup.markAsPristine();
    this.punomocnikFormGroup.markAsUntouched();
  }
}
