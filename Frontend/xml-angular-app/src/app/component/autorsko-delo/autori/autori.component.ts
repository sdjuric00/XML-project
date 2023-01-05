import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";
import {Autor} from "../../../model/autorsko-pravo/xml/autor";

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

  ngOnInit(): void {
    this.autoriFormGroup = <FormGroup>this.controlContainer.control;
  }


  changeAnonimniAutor() {
    this.anonimniAutor = !this.anonimniAutor;
    this.autoriFormGroup.clearValidators();
    if (this.anonimniAutor){
      this.autoriFormGroup.get('ime')?.setErrors(null);
      this.autoriFormGroup.get('prezime')?.setErrors(null);
      this.autoriFormGroup.get('drzavljanstvo')?.setErrors(null);
      this.autoriFormGroup.get('ulica')?.setErrors(null);
      this.autoriFormGroup.get('broj')?.setErrors(null);
      this.autoriFormGroup.get('grad')?.setErrors(null);
      this.autoriFormGroup.get('postanskiBroj')?.setErrors(null);
      this.autoriFormGroup.get('drzava')?.setErrors(null);
      this.autoriFormGroup.get('email')?.setErrors(null);
      this.autoriFormGroup.get('telefon')?.setErrors(null);
      this.autoriFormGroup.get('fax')?.setErrors(null);
      this.autoriFormGroup.get('godinaSmrti')?.setValue('');
      this.autoriFormGroup.get('pseudonim')?.setValue('');
    }
    else {
      this.autoriFormGroup.get('ime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('prezime')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('drzavljanstvo')?.setValidators([Validators.required]);
      this.autoriFormGroup.get('ulica')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('broj')?.setValidators([Validators.required, Validators.pattern("[0-9A-Za-z ]{1,5}")]);
      this.autoriFormGroup.get('grad')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('postanskiBroj')?.setValidators([Validators.required, Validators.pattern("[0-9]{5}")]);
      this.autoriFormGroup.get('drzava')?.setValidators([Validators.required, Validators.maxLength(50)]);
      this.autoriFormGroup.get('email')?.setValidators([Validators.required, Validators.email]);
      this.autoriFormGroup.get('telefon')?.setValidators([Validators.required, Validators.pattern("[0-9]{8,12}")]);
      this.autoriFormGroup.get('fax')?.setValidators([Validators.required, Validators.pattern("[0][0-9]{8,9}")]);

    }
    this.autoriFormGroup.updateValueAndValidity();
  }

  izbrisiAutora(autor: any) {
    let autori:Autor[] = this.autoriFormGroup.get('autori')?.value;
    const index = autori.indexOf(autor);

    if (index >= 0) {
      autori.splice(index, 1);
    }

    this.autoriFormGroup.get('autori')?.setValue(autori);
  }

  // addAutor(autor: Autor) {
  //   this.autori.push(autor);
  // }

  dodajAnonimnogAutora() {
    const autor: Autor = {
      ime: ''
    }
    let autori:Autor[] = this.autoriFormGroup.get('autori')?.value;
    autori.push(autor);
    this.autoriFormGroup.get('autori')?.setValue(autori);
  }
}
