import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-autorsko-delo',
  templateUrl: './autorsko-delo.component.html',
  styleUrls: ['./autorsko-delo.component.css']
})
export class AutorskoDeloComponent implements OnInit {

  public autorskoDeloFormGroup: FormGroup;
  tipForme: string = 'AUTORSKO_DELO';
  stvorenoURadnomOdnosu: boolean = false;
  anonimniAutor: boolean = false;
  deloPrerada: boolean = false;
  vrstaAutorskogDela: string = '';
  formaAutorskogDela: string = '';
  customVrstaAutorskogDela: string = '';
  customFormaAutorskogDela: string = '';
  customNacinKoriscenja: string = '';
  errorNacinKoriscenja: boolean = false;

  constructor(private controlContainer: ControlContainer) {
    this.autorskoDeloFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.autorskoDeloFormGroup = <FormGroup>this.controlContainer.control;
  }

  changeStvorenoURadnomOdnosu():void {
    this.stvorenoURadnomOdnosu = !this.stvorenoURadnomOdnosu;
    this.autorskoDeloFormGroup?.controls['stvorenoURadnomOdnosu']?.setValue(this.stvorenoURadnomOdnosu);
  }

  changeDeloPrerada(): void {
    this.deloPrerada = !this.deloPrerada;
    this.autorskoDeloFormGroup?.controls['deloJePrerada']?.setValue(this.deloPrerada);

    if (!this.deloPrerada){
      this.autorskoDeloFormGroup.get('naslovPrerade')?.setErrors(null);
      this.setAllFieldsToNullErrors();
      this.autorskoDeloFormGroup.updateValueAndValidity();
    }
    else {
      this.autorskoDeloFormGroup.get('naslovPrerade')?.setValidators([Validators.required]);
      this.setAllFieldsValidators();
      this.autorskoDeloFormGroup.updateValueAndValidity();
    }
  }

  changeRadioButtonVrsta(value: any) {
    this.vrstaAutorskogDela = value;
    if (this.vrstaAutorskogDela !== 'Ostalo'){
      this.customVrstaAutorskogDela = '';
      this.autorskoDeloFormGroup?.controls['vrstaJeCustom']?.setValue(false);
      this.autorskoDeloFormGroup?.controls['vrsta']?.setValue(value);
    }
    else {
      this.autorskoDeloFormGroup?.controls['vrstaJeCustom']?.setValue(true);
    }
  }

  changeCustomVrstaAutorskogDela(value: string) {
    this.customVrstaAutorskogDela = value;
    this.autorskoDeloFormGroup?.controls['vrsta']?.setValue(this.customVrstaAutorskogDela);
  }

  changeRadioButtonForma(value: string) {
    this.formaAutorskogDela = value;
    if (this.formaAutorskogDela !== 'Ostalo'){
      this.customFormaAutorskogDela = '';
      this.autorskoDeloFormGroup?.controls['formaZapisaJeCustom']?.setValue(false);
      this.autorskoDeloFormGroup?.controls['formaZapisa']?.setValue(value);
    }
    else {
      this.autorskoDeloFormGroup?.controls['formaZapisaJeCustom']?.setValue(true);
    }
  }

  changeCustomFormaAutorkogDela(value: string) {
    this.customFormaAutorskogDela = value;
    this.autorskoDeloFormGroup?.controls['formaZapisa']?.setValue(this.customFormaAutorskogDela);
  }

  changeNacinKoriscenja(value: string) {
    this.customNacinKoriscenja = value;
    this.autorskoDeloFormGroup?.controls['nacinKoriscenja']?.setValue(value);
    console.log(this.autorskoDeloFormGroup);
  }

  checkNacinKoriscenja(value: string) {
    this.errorNacinKoriscenja = value === "";
  }

  changeAnonimniAutor() {
    this.anonimniAutor = !this.anonimniAutor;
    if (this.anonimniAutor || !this.deloPrerada){
     this.setAllFieldsToNullErrors();
    }
    else {
      this.setAllFieldsValidators();
    }
    this.autorskoDeloFormGroup.updateValueAndValidity();
  }

  private setAllFieldsToNullErrors() {
    this.autorskoDeloFormGroup.get('ime')?.setErrors(null);
    this.autorskoDeloFormGroup.get('prezime')?.setErrors(null);
    this.autorskoDeloFormGroup.get('drzavljanstvo')?.setErrors(null);
    this.autorskoDeloFormGroup.get('ulica')?.setErrors(null);
    this.autorskoDeloFormGroup.get('broj')?.setErrors(null);
    this.autorskoDeloFormGroup.get('grad')?.setErrors(null);
    this.autorskoDeloFormGroup.get('postanskiBroj')?.setErrors(null);
    this.autorskoDeloFormGroup.get('drzava')?.setErrors(null);
    this.autorskoDeloFormGroup.get('email')?.setErrors(null);
    this.autorskoDeloFormGroup.get('telefon')?.setErrors(null);
    this.autorskoDeloFormGroup.get('fax')?.setErrors(null);
    this.autorskoDeloFormGroup.get('godinaSmrti')?.setValue('');
    this.autorskoDeloFormGroup.get('pseudonim')?.setValue('');
  }

  private setAllFieldsValidators() {
    this.autorskoDeloFormGroup.get('ime')?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.autorskoDeloFormGroup.get('prezime')?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.autorskoDeloFormGroup.get('drzavljanstvo')?.setValidators([Validators.required]);
    this.autorskoDeloFormGroup.get('ulica')?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.autorskoDeloFormGroup.get('broj')?.setValidators([Validators.required, Validators.pattern("[0-9A-Za-z ]{1,5}")]);
    this.autorskoDeloFormGroup.get('grad')?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.autorskoDeloFormGroup.get('postanskiBroj')?.setValidators([Validators.required, Validators.pattern("[0-9]{5}")]);
    this.autorskoDeloFormGroup.get('drzava')?.setValidators([Validators.required, Validators.maxLength(50)]);
    this.autorskoDeloFormGroup.get('email')?.setValidators([Validators.required, Validators.email]);
    this.autorskoDeloFormGroup.get('telefon')?.setValidators([Validators.required, Validators.pattern("[0-9]{8,12}")]);
    this.autorskoDeloFormGroup.get('fax')?.setValidators([Validators.required, Validators.pattern("[0][0-9]{8,9}")]);

  }
}
