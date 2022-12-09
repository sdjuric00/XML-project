import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pronalazac',
  templateUrl: './pronalazac.component.html',
  styleUrls: ['./pronalazac.component.css']
})
export class PronalazacComponent implements OnInit{
  public pronalazacFormGroup: FormGroup;
  pronalazac: string='Imenovan';
  constructor(private controlContainer: ControlContainer) {
    this.pronalazacFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.pronalazacFormGroup = <FormGroup>this.controlContainer.control;
    this.pronalazacFormGroup.clearValidators();
   
    this.pronalazacFormGroup.updateValueAndValidity();
    this.pronalazacFormGroup.reset();
  }
  changeRadioButton(lice: string):void {
    this.pronalazac = lice;
    console.log(this.pronalazac);
    
  }
}
