import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import { Adresa } from 'src/app/model/adresa';
import { Kontakt } from 'src/app/model/kontakt';
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';

@Component({
  selector: 'app-pravno-lice',
  templateUrl: './pravno-lice.component.html',
  styleUrls: ['./pravno-lice.component.css']
})
export class PravnoLiceComponent implements OnInit {

  @Input() isTrademark = false;

  @Output() dodatPodnosilac = new EventEmitter<PodnosilacUniversal>();

  public podnosilacFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;

  }

  ngOnInit(): void {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
    if (this.isTrademark) {
      this.podnosilacFormGroup.get('podnosioci').setValidators([]);
      this.podnosilacFormGroup.get('podaciOZajednickomPredstavniku').setValidators([]);
    }
  }

  dodajPodnosioca(): void {
    const adresa: Adresa = {
      grad: this.podnosilacFormGroup.get('grad')?.value,
      ulica: this.podnosilacFormGroup.get('ulica')?.value,
      broj: this.podnosilacFormGroup.get('broj')?.value,
      drzava: this.podnosilacFormGroup.get('drzava')?.value,
      postanskiBroj: this.podnosilacFormGroup.get('postanskiBroj')?.value
    }
    const kontakt: Kontakt = {
      email: this.podnosilacFormGroup.get('email')?.value,
      telefon: this.podnosilacFormGroup.get('telefon')?.value,
      fax: this.podnosilacFormGroup.get('fax')?.value
    }
    const podnosilac: PodnosilacUniversal = {
      naziv: this.podnosilacFormGroup.get('naziv')?.value,
      pib: this.podnosilacFormGroup.get('pib')?.value,
      registarskiBroj: this.podnosilacFormGroup.get('registarskiBroj')?.value,
      adresa: adresa,
      kontakt: kontakt,
      isPravnoLice: true
    }
    let podnosioci:PodnosilacUniversal[] = this.podnosilacFormGroup.get('podnosioci')?.value as PodnosilacUniversal[];
    if (podnosioci === null) {
      podnosioci = [];
    }
    this.dodatPodnosilac.emit(podnosilac);
    podnosioci.push(podnosilac);
    this.podnosilacFormGroup.get('podnosioci')?.setValue(podnosioci);


    this.podnosilacFormGroup.get('naziv')?.setValue('');
    this.podnosilacFormGroup.get('pib')?.setValue('');
    this.podnosilacFormGroup.get('registarskiBroj')?.setValue('');
    this.podnosilacFormGroup.get('ulica')?.setValue('');
    this.podnosilacFormGroup.get('broj')?.setValue('');
    this.podnosilacFormGroup.get('grad')?.setValue('');
    this.podnosilacFormGroup.get('drzava')?.setValue('');
    this.podnosilacFormGroup.get('postanskiBroj')?.setValue('');
    this.podnosilacFormGroup.get('email')?.setValue('');
    this.podnosilacFormGroup.get('telefon')?.setValue('');
    this.podnosilacFormGroup.get('fax')?.setValue('');
  }
}
