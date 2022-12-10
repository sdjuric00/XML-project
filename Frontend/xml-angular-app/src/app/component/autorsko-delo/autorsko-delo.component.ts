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
      this.autorskoDeloFormGroup.updateValueAndValidity();
    }
    else {
      this.autorskoDeloFormGroup.get('naslovPrerade')?.setValidators([Validators.required]);
      this.autorskoDeloFormGroup.updateValueAndValidity();
    }
  }

  changeRadioButtonVrsta(value: any) {
    this.customVrstaAutorskogDela = '';
    this.vrstaAutorskogDela = value;
    if (this.vrstaAutorskogDela !== 'Ostalo'){
      this.autorskoDeloFormGroup?.controls['vrsta']?.setValue(value);
    }
    else {
      this.autorskoDeloFormGroup?.controls['vrsta']?.setValue('');
    }
  }

  changeCustomVrstaAutorkogDela(value: string) {
    this.customVrstaAutorskogDela = value;
    this.autorskoDeloFormGroup?.controls['vrsta']?.setValue('');
  }

  changeRadioButtonForma(value: string) {
    this.customFormaAutorskogDela = '';
    this.formaAutorskogDela = value;
    if (this.vrstaAutorskogDela !== 'Ostalo'){
      this.autorskoDeloFormGroup?.controls['formaZapisa']?.setValue(value);
    }
    else {
      this.autorskoDeloFormGroup?.controls['formaZapisa']?.setValue('');
    }
  }

  changeCustomFormaAutorkogDela(value: string) {
    this.customFormaAutorskogDela = value;
    this.autorskoDeloFormGroup?.controls['formaZapisa']?.setValue('');
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
    if (this.anonimniAutor){
      this.autorskoDeloFormGroup.get('ime')?.setErrors(null);
      this.autorskoDeloFormGroup.get('prezime')?.setErrors(null);
      this.autorskoDeloFormGroup.get('drzavljanstvo')?.setErrors(null);
      this.autorskoDeloFormGroup.get('ulica')?.setErrors(null);
      this.autorskoDeloFormGroup.get('grad')?.setErrors(null);
      this.autorskoDeloFormGroup.get('postanskiBroj')?.setErrors(null);
      this.autorskoDeloFormGroup.get('drzava')?.setErrors(null);
      this.autorskoDeloFormGroup.get('godinaSmrti')?.setValue('');
      this.autorskoDeloFormGroup.get('pseudonim')?.setValue('');
    }
    else {
      this.autorskoDeloFormGroup.get('ime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autorskoDeloFormGroup.get('prezime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autorskoDeloFormGroup.get('drzavljanstvo')?.setValidators([Validators.required]);
      this.autorskoDeloFormGroup.get('ulica')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autorskoDeloFormGroup.get('grad')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autorskoDeloFormGroup.get('postanskiBroj')?.setValidators([Validators.required, Validators.pattern("[0-9]{5}")]);
      this.autorskoDeloFormGroup.get('drzava')?.setValidators([Validators.required, Validators.maxLength(50)]);
    }
    this.autorskoDeloFormGroup.updateValueAndValidity();
  }
}
