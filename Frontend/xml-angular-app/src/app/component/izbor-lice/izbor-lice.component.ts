import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';

@Component({
  selector: 'app-izbor-lice',
  templateUrl: './izbor-lice.component.html',
  styleUrls: ['./izbor-lice.component.css']
})
export class IzborLiceComponent implements OnInit{

  @Input() isTrademark = false;
  @Input() tipLica:string;

  @Output() dodatPodnosilac = new EventEmitter<PodnosilacUniversal>();

  tipPodnosioca: string='Fizičko lice';
  tipLicaIspis: string;
  podnosilacAutor: boolean = false;
  public podnosilacFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit():void{
    this.tipLicaIspis = this.getTipLicaZaIspis(this.tipLica);
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
    this.podnosilacFormGroup.clearValidators();
    if (this.tipPodnosioca === 'Fizičko lice'){
      this.podnosilacFormGroup.get('naziv')?.setValidators(null);
      this.podnosilacFormGroup.get('pib')?.setValidators(null);
      this.podnosilacFormGroup.get('registarskiBroj')?.setValidators(null);
    }
    else {
      this.podnosilacFormGroup.get('ime')?.setValidators(null);
      this.podnosilacFormGroup.get('prezime')?.setValidators(null);
      this.podnosilacFormGroup.get('jmbg')?.setValidators(null);
    }
    this.podnosilacFormGroup.updateValueAndValidity();
    this.podnosilacFormGroup.reset();
  }

  getTipLicaZaIspis(tipLica: string){
    return tipLica === "podnosilac" ? "podnosioca" : tipLica === "punomocnik" ? "punomoćnika" : "pronalazača";
  }

  changeRadioButton(lice: string):void {
    console.log(this.podnosilacFormGroup);
    this.tipPodnosioca = lice;
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
    if (this.podnosilacFormGroup.get('podnosioci') && this.podnosilacFormGroup.get('podnosioci').value.length === 0) {
      this.podnosilacFormGroup.reset();
    }
    this.podnosilacFormGroup.markAsPristine();
    this.podnosilacFormGroup.markAsUntouched();
    this.podnosilacFormGroup.get('tipPodnosioca').setValue(this.tipPodnosioca);
  }

  dodajPodnosioca(podnosilac: PodnosilacUniversal): void {
    this.dodatPodnosilac.emit(podnosilac);
  }
}
