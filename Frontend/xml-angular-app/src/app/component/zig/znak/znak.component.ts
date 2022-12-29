import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-znak',
  templateUrl: './znak.component.html',
  styleUrls: ['./znak.component.css']
})
export class ZnakComponent implements OnInit {

  @Input() znakFormGroup: FormGroup;

  cirilica: boolean = true;
  latinica: boolean = false;
  ostalo: boolean = false;
  
  boje: string[] = [];
  klasifikacije: string[] = ['1. Hemijski proizvodi', '2. Boje i lakovi', '3. Nemedicinska kozmetika',
  '4. Industrija ulja i masti', '5. Farmaceutski proizvodi'];

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

  changeVrstaZnaka(value: any) {
    this.vrstaZnaka = value;
    if (value !== 'Ostalo'){
      this.znakFormGroup?.controls['vrstaZnaka']?.setValue(value);
    }
    else {
      this.znakFormGroup?.controls['vrstaZnaka']?.setValue('');
    }
  }

  changeCustomVrstaZnaka(value: string) {
    this.vrstaZnaka = 'Ostalo';
    this.znakFormGroup?.controls['vrstaZnaka']?.setValue(value);
  }

  changeTipZiga(value: any) {
    this.tipZiga = value;
    if (value !== 'Ostalo'){
      this.znakFormGroup?.controls['tipZig']?.setValue(value);
    }
    else {
      this.znakFormGroup?.controls['tipZig']?.setValue('');
    }
  }

  changeCustomTipZiga(value: string) {
    this.tipZiga = 'Ostalo';
    this.znakFormGroup?.controls['tipZig']?.setValue(value);
  }

}
