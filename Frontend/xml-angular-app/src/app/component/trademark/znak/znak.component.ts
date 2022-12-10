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
  klasifikacije: string[] = ['1. Hemijski proizvodi'];
  tipoviZiga: string[] = ['individualni', 'kolektivni', 'garancije'];

  selectedImage: any = null;

  constructor(private controlContainer: ControlContainer) { }

  vrsteZnaka: string[] = ['verbalni', 'graficki', 'kombinovani', 'trodimenzionalni']

  ngOnInit(): void {
    this.znakFormGroup = <FormGroup>this.controlContainer.control;
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
    this.znakFormGroup.reset();
    this.znakFormGroup.markAsPristine();
    this.znakFormGroup.markAsUntouched();
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
    this.znakFormGroup.get('transliteracijaZnaka')?.setValidators([Validators.required]);
    this.znakFormGroup.get('prevod')?.setValidators([Validators.required]);
    this.znakFormGroup.reset();
    this.znakFormGroup.markAsPristine();
    this.znakFormGroup.markAsUntouched();
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0] ?? null;
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

  checkIfFormNotValid(): boolean {
    if (this.boje.length <= 0 || this.selectedImage === null) {
      
      return true;
    }

    return true;
  }

}
