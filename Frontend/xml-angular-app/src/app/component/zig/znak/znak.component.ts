import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-znak',
  templateUrl: './znak.component.html',
  styleUrls: ['./znak.component.css']
})
export class ZnakComponent implements OnInit {
  @ViewChild('customVrsta') input: ElementRef

  @Input() znakFormGroup: FormGroup;

  cirilica: boolean = true;
  latinica: boolean = false;
  ostalo: boolean = false;
  
  boje: string[] = [];
  brojevi: string[] = [];

  vrstaZnaka: string = '';
  tipZiga: string = '';

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.znakFormGroup = <FormGroup>this.controlContainer.control;
    this.notOstalo();
  }

  changePismoToCirilicno(): void {
    this.cirilica = true;
    this.latinica = false;
    this.ostalo = false;
    this.znakFormGroup.get('pismo')?.setValue('Cirilica');
    this.notOstalo();
  }

  notOstalo(): void {
    this.znakFormGroup.get('transliteracijaZnaka')?.setValidators([]);
    this.znakFormGroup.get('prevod')?.setValidators([]);
  }

  changePismoToLatinicno(): void {
    this.cirilica = false;
    this.latinica = true;
    this.ostalo = false;
    this.znakFormGroup.get('pismo')?.setValue('Latinica')
    this.notOstalo();
  }

  changePismoToOstalo(): void {
    this.cirilica = false;
    this.latinica = false;
    this.ostalo = true;
    this.znakFormGroup.get('pismo')?.setValue('')
    this.znakFormGroup.get('transliteracijaZnaka')?.setValue('')
    this.znakFormGroup.get('prevod')?.setValue('')
    this.znakFormGroup.get('transliteracijaZnaka')?.setValidators([Validators.required]);
    this.znakFormGroup.get('prevod')?.setValidators([Validators.required]);
  }

  izbrisiBoju(boja: string): void {
    this.boje = this.boje.filter((item) => {
      return boja !== item
    })

    this.znakFormGroup.get('boje')?.setValue(this.boje);
  }

  dodajBoju(boja: string): void {
    if (!this.boje.includes(boja)){
        this.boje.push(boja)    //zbog duplikata
    }

    this.znakFormGroup.get('boje')?.setValue(this.boje);
  }

  dodajNicansku(izabraniBroj: string) {
    if (!this.brojevi.includes(izabraniBroj)){
        this.brojevi.push(izabraniBroj)
    } else {
      this.brojevi = this.brojevi.filter((item) => {
        return izabraniBroj !== item
      });
    }

    this.znakFormGroup.get('nicanskaKlasifikacija')?.setValue(this.brojevi);
  }

  changeVrstaZnaka(value: any) {
    if (value !== 'Ostalo'){
      this.znakFormGroup?.controls['vrstaZnaka']?.setValue(value);
      this.input.nativeElement.value = '';
    }
    else if (value === 'Ostalo' && this.vrstaZnaka !== 'Ostalo') {
      this.znakFormGroup?.controls['vrstaZnaka']?.setValue('');
    }
    this.vrstaZnaka = value;
  }

  changeCustomVrstaZnaka(value: string) {
    this.vrstaZnaka = 'Ostalo';
    if (value != "") {
      this.znakFormGroup?.controls['vrstaZnaka']?.setValue(value);
    }
  }

  changeTipZiga(value: any) {
    this.tipZiga = value;
    this.znakFormGroup?.controls['tipZig']?.setValue(value);
  }

}
