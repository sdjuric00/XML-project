import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dostavljanje',
  templateUrl: './dostavljanje.component.html',
  styleUrls: ['./dostavljanje.component.css']
})
export class DostavljanjeComponent {

  public dostavljanjeFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.dostavljanjeFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.dostavljanjeFormGroup = <FormGroup>this.controlContainer.control;
    this.dostavljanjeFormGroup.clearValidators();
   
    this.dostavljanjeFormGroup.updateValueAndValidity();
    this.dostavljanjeFormGroup.reset();
  }

}
