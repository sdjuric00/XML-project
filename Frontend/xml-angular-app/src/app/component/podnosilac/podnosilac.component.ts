import { Component, Input, OnInit } from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';

@Component({
  selector: 'app-podnosilac',
  templateUrl: './podnosilac.component.html',
  styleUrls: ['./podnosilac.component.css']
})
export class PodnosilacComponent implements OnInit {

  @Input() isTrademark: boolean = false;
  @Input() btnNazad: boolean = false;
  tipPodnosioca: string='Fizičko lice';
  podnosilacAutor: boolean = false;
  public podnosilacFormGroup: FormGroup;

  podnosioci: PodnosilacUniversal[] = [];

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
    this.podnosilacFormGroup.clearValidators();

    this.podnosilacFormGroup.updateValueAndValidity();
    this.podnosilacFormGroup.reset();
    if (this.isTrademark) {
      this.podnosilacFormGroup.get('podnosioci').setValidators([Validators.required]);
      this.podnosilacFormGroup.get('podnosioci').setValue([]);
    }
    this.podnosilacFormGroup.get('podnosilacAutor').setValue(false);
  }


  changePodnosilacAutor():void {
    this.podnosilacAutor = !this.podnosilacAutor;
    this.podnosilacFormGroup.get('podnosilacAutor').setValue(this.podnosilacAutor);
  }

  izbrisiPodnosioca(podnosilac: PodnosilacUniversal): void {
    this.podnosioci = this.podnosioci.filter((item) => {
      return podnosilac !== item
    })

    this.podnosilacFormGroup.get('podnosioci').setValue(this.podnosioci);
  }

  dodajPodnosioca(podnosilac: PodnosilacUniversal): void {
    this.podnosilacFormGroup.clearValidators();
    if (this.tipPodnosioca === 'Fizičko lice'){

      this.podnosilacFormGroup.get('ime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.podnosilacFormGroup.get('ime')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('prezime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.podnosilacFormGroup.get('prezime')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('jmbg')?.setValidators([Validators.required, Validators.pattern("[0-9]{13}")]);
      this.podnosilacFormGroup.get('jmbg')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('naziv')?.setValidators([]);
      this.podnosilacFormGroup.get('naziv')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('pib')?.setValidators([]);
      this.podnosilacFormGroup.get('pib')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('registarskiBroj')?.setValidators([]);
      this.podnosilacFormGroup.get('registarskiBroj')?.updateValueAndValidity();

    } else {
      this.podnosilacFormGroup.get('naziv')?.setValidators([Validators.required]);
      this.podnosilacFormGroup.get('naziv')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('pib')?.setValidators([Validators.required, Validators.pattern("[0-9]{9}")]);
      this.podnosilacFormGroup.get('pib')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('registarskiBroj')?.setValidators([Validators.required, Validators.pattern("([0-9]{8}|([A-Za-z]{2}[0-9]{6}))")]);
      this.podnosilacFormGroup.get('registarskiBroj')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('ime')?.setValidators([]);
      this.podnosilacFormGroup.get('ime')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('prezime')?.setValidators([]);
      this.podnosilacFormGroup.get('prezime')?.updateValueAndValidity();

      this.podnosilacFormGroup.get('jmbg')?.setValidators([]);
      this.podnosilacFormGroup.get('jmbg')?.updateValueAndValidity();
    }

    this.podnosilacFormGroup.get('podnosioci').setValidators([Validators.required]);
    this.podnosilacFormGroup.markAsPristine();
    this.podnosilacFormGroup.markAsUntouched();
    this.podnosioci.push(podnosilac);
    this.podnosilacFormGroup.get("podnosioci").setValue(this.podnosioci);

    if (this.podnosioci.length > 1) {
      this.podnosilacFormGroup.get('podaciOZajednickomPredstavniku').setValidators([Validators.required]);
    }
  }

  proveriPodnosioce() {
    console.log(this.podnosioci)
    if (this.podnosioci.length > 1) {
      this.podnosilacFormGroup.get('podaciOZajednickomPredstavniku').setValidators([Validators.required]);
    }
    
    return this.podnosioci.length > 0;
  }

}
