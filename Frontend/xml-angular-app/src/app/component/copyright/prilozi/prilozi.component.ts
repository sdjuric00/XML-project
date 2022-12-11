import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

export interface PrilogForm {
  putanja:any;
  opis: string;
}


@Component({
  selector: 'app-prilozi',
  templateUrl: './prilozi.component.html',
  styleUrls: ['./prilozi.component.css']
})
export class PriloziComponent implements OnInit {
  prilozi: PrilogForm[] = [];
  public priloziFormGroup: FormGroup;
  selectedImage: any = null;
  opis: string = '';
  greska: boolean = false;

  constructor(private controlContainer: ControlContainer) {
    this.priloziFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.priloziFormGroup = <FormGroup>this.controlContainer.control;
  }

  izbrisiPrilog(prilog: any) {
    const prilozi:PrilogForm[] = this.priloziFormGroup.get('prilozi')?.value as PrilogForm[];
    const index = prilozi?.indexOf(prilog);

    if (index >= 0) {
      prilozi.splice(index, 1);
      this.prilozi = prilozi;
      this.priloziFormGroup.get('prilozi')?.setValue(this.prilozi);
    }
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0] ?? null;
    this.greska = false;
  }


  updateOpis(value: string) {
    this.opis = value;
  }

  addPrilog(input: HTMLInputElement) {
    if (this.selectedImage !== null && this.selectedImage !== undefined && this.selectedImage !== ''){
      this.prilozi.push({putanja:this.selectedImage, opis: this.opis});
      this.priloziFormGroup.get('prilozi')?.setValue(this.prilozi);
      this.selectedImage = '';
      this.opis = '';
      input.value = '';
    }
    else {
      this.greska = true;
    }
  }
}
