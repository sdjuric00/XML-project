import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-prilozi',
  templateUrl: './prilozi.component.html',
  styleUrls: ['./prilozi.component.css']
})
export class PriloziComponent implements OnInit {
  prilozi: any[] = [];
  public priloziFormGroup: FormGroup;
  selectedImage: any = null;

  constructor(private controlContainer: ControlContainer) {
    this.priloziFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.priloziFormGroup = <FormGroup>this.controlContainer.control;
  }

  izbrisiPrilog(prilog: any) {
    const prilozi:string[] = this.priloziFormGroup.get('prilozi')?.value as string[];
    const index = prilozi?.indexOf(prilog);

    if (index >= 0) {
      prilozi.splice(index, 1);
      this.prilozi = prilozi;
      this.priloziFormGroup.get('prilozi')?.setValue(this.prilozi);
    }
  }

  dodajPrilog(event: any) {
    if(event?.target?.files?.length > 0)
    {
      this.prilozi.push(event?.target?.files[0]?.name);
      this.priloziFormGroup.get('prilozi')?.setValue(this.prilozi);
    }
  }

  onFileSelected(event: any): void {
    if(event?.target?.files?.length > 0)
    {
      this.prilozi.push(event?.target?.files[0]?.name);
      this.priloziFormGroup.get('prilozi')?.setValue(this.prilozi);
    }
    this.selectedImage = event.target.files[0] ?? null;
  }
}
