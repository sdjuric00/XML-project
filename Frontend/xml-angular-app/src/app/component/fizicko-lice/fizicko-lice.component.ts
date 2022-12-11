import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import { Adresa } from 'src/app/model/adresa';
import { Kontakt } from 'src/app/model/kontakt';
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';

@Component({
  selector: 'app-fizicko-lice',
  templateUrl: './fizicko-lice.component.html',
  styleUrls: ['./fizicko-lice.component.css']
})
export class FizickoLiceComponent implements OnInit {

  @Input() isTrademark = false;

  @Output() dodatPodnosilac = new EventEmitter<PodnosilacUniversal>();

  public formGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.formGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.formGroup = <FormGroup>this.controlContainer.control;
    if (this.isTrademark) {
      this.formGroup.get('podnosioci').setValidators([]);
      this.formGroup.get('podaciOZajednickomPredstavniku').setValidators([]);
    }
  }

  dodajPodnosioca(): void {
    const adresa: Adresa = {
      grad: this.formGroup.get('grad')?.value,
      ulica: this.formGroup.get('ulica')?.value,
      postanskiBroj: this.formGroup.get('postanskiBroj')?.value,
      drzava: this.formGroup.get('drzava')?.value,
    }
    const kontakt: Kontakt = {
      email: this.formGroup.get('email')?.value,
      telefon: this.formGroup.get('telefon')?.value,
      fax: this.formGroup.get('fax')?.value
    }
    const podnosilac: PodnosilacUniversal = {
      ime: this.formGroup.get('ime')?.value,
      prezime: this.formGroup.get('prezime')?.value,
      jmbg: this.formGroup.get('jmbg')?.value,
      adresa: adresa,
      kontakt: kontakt,
      isPravnoLice: false
    }
    console.log(podnosilac)
    let podnosioci:PodnosilacUniversal[] = this.formGroup.get('podnosioci')?.value as PodnosilacUniversal[];
    if (podnosioci === null) {
      podnosioci = [];
    }
    this.dodatPodnosilac.emit(podnosilac);
    podnosioci.push(podnosilac);
    this.formGroup.get('podnosioci')?.setValue(podnosioci);


    this.formGroup.get('ime')?.setValue('');
    this.formGroup.get('prezime')?.setValue('');
    this.formGroup.get('jmbg')?.setValue('');
    this.formGroup.get('ulica')?.setValue('');
    this.formGroup.get('grad')?.setValue('');
    this.formGroup.get('drzava')?.setValue('');
    this.formGroup.get('postanskiBroj')?.setValue('');
    this.formGroup.get('email')?.setValue('');
    this.formGroup.get('telefon')?.setValue('');
    this.formGroup.get('fax')?.setValue('');
  
  }

  isFormValid(): boolean {

    return this.formGroup.invalid;
  }

}
