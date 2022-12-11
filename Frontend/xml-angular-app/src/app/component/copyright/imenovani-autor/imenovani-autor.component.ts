import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {Autor} from "../../../model/autor";
import {Adresa} from "../../../model/adresa";
import {Kontakt} from "../../../model/kontakt";

@Component({
  selector: 'app-imenovani-autor',
  templateUrl: './imenovani-autor.component.html',
  styleUrls: ['./imenovani-autor.component.css']
})
export class ImenovaniAutorComponent implements OnInit {
  @Input() tipForme: string;
  @Output() dodatAutor = new EventEmitter<Autor>();
  public formGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.formGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.formGroup = <FormGroup>this.controlContainer.control;
    console.log(this.formGroup)
  }

  dodajAutora() {
    const adresa: Adresa = {
      ulica: this.formGroup.get('ulica')?.value,
      broj: this.formGroup.get('broj')?.value,
      grad: this.formGroup.get('grad')?.value,
      drzava: this.formGroup.get('drzava')?.value,
      postanskiBroj: this.formGroup.get('postanskiBroj')?.value
    }
    const kontakt: Kontakt = {
      email: this.formGroup.get('email')?.value,
      telefon: this.formGroup.get('telefon')?.value,
      fax: this.formGroup.get('fax')?.value
    }
    const autor: Autor = {
      ime: this.formGroup.get('ime')?.value,
      prezime: this.formGroup.get('prezime')?.value,
      drzavljanstvno: this.formGroup.get('drzavljanstvo')?.value,
      godinaSmrti: this.formGroup.get('godinaSmrti')?.value,
      pseudonim:this.formGroup.get('pseudonim')?.value,
      adresa: adresa,
      kontakt: kontakt
    }
    const autori:Autor[] = this.formGroup.get('autori')?.value as Autor[];
    this.dodatAutor.emit(autor);
    autori.push(autor);
    this.formGroup.get('autori')?.setValue(autori);

    this.formGroup.get('ime')?.reset();
    this.formGroup.get('ime')?.setValue('');

    this.formGroup.get('prezime')?.reset();
    this.formGroup.get('prezime')?.setValue('');

    this.formGroup.get('drzavljanstvo')?.reset();
    this.formGroup.get('drzavljanstvo')?.setValue('');

    this.formGroup.get('godinaSmrti')?.reset();
    this.formGroup.get('godinaSmrti')?.setValue('');

    this.formGroup.get('pseudonim')?.reset();
    this.formGroup.get('pseudonim')?.setValue('');

    this.formGroup.get('ulica')?.reset();
    this.formGroup.get('ulica')?.setValue('');

    this.formGroup.get('broj')?.reset();
    this.formGroup.get('broj')?.setValue('');

    this.formGroup.get('grad')?.reset();
    this.formGroup.get('grad')?.setValue('');

    this.formGroup.get('drzava')?.reset();
    this.formGroup.get('drzava')?.setValue('');

    this.formGroup.get('postanskiBroj')?.reset();
    this.formGroup.get('postanskiBroj')?.setValue('');

    this.formGroup.get('email')?.reset();
    this.formGroup.get('email')?.setValue('');

    this.formGroup.get('telefon')?.reset();
    this.formGroup.get('telefon')?.setValue('');

    this.formGroup.get('fax')?.reset();
    this.formGroup.get('fax')?.setValue('');
  }
}
