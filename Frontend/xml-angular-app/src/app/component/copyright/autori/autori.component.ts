import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";
import {Autor} from "../../../model/autor";
import {Adresa} from "../../../model/adresa";
import {Kontakt} from "../../../model/kontakt";

@Component({
  selector: 'app-autori',
  templateUrl: './autori.component.html',
  styleUrls: ['./autori.component.css']
})
export class AutoriComponent implements OnInit {
  public autoriFormGroup: FormGroup;
  tipForme: string = 'AUTORI';
  anonimniAutor: boolean = false;
  constructor(private controlContainer: ControlContainer) {
    this.autoriFormGroup = <FormGroup>this.controlContainer.control;
  }
  autori: Autor[] = [];

  ngOnInit(): void {
    this.autoriFormGroup = <FormGroup>this.controlContainer.control;
  }


  changeAnonimniAutor() {
    this.anonimniAutor = !this.anonimniAutor;
    if (this.anonimniAutor){
      this.autoriFormGroup.get('ime')?.setErrors(null);
      this.autoriFormGroup.get('prezime')?.setErrors(null);
      this.autoriFormGroup.get('drzavljanstvo')?.setErrors(null);
      this.autoriFormGroup.get('ulica')?.setErrors(null);
      this.autoriFormGroup.get('grad')?.setErrors(null);
      this.autoriFormGroup.get('postanskiBroj')?.setErrors(null);
      this.autoriFormGroup.get('drzava')?.setErrors(null);
      this.autoriFormGroup.get('godinaSmrti')?.setValue('');
      this.autoriFormGroup.get('pseudonim')?.setValue('');
    }
    else {
      this.autoriFormGroup.get('ime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('prezime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('drzavljanstvo')?.setValidators([Validators.required]);
      this.autoriFormGroup.get('ulica')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('grad')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('postanskiBroj')?.setValidators([Validators.required, Validators.pattern("[0-9]{5}")]);
      this.autoriFormGroup.get('drzava')?.setValidators([Validators.required, Validators.maxLength(50)]);
    }
    this.autoriFormGroup.updateValueAndValidity();
  }

  izbrisiAutora(autor: any) {
    const autori:Autor[] = this.autoriFormGroup.get('autori')?.value as Autor[];
    const index = autori?.indexOf(autor);

    if (index >= 0) {
      autori.splice(index, 1);
      this.autori = autori;
    }
  }

  addAutor(autor: Autor) {
    this.autori.push(autor);
  }

  dodajAnonimnogAutora() {
    const autor: Autor = {
      ime: ''
    }
    const autori:Autor[] = this.autoriFormGroup.get('autori')?.value as Autor[];
    autori.push(autor);
    this.autoriFormGroup.get('autori')?.setValue(autori);
    this.autori.push(autor);
  }
}
