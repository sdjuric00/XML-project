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
    if (lice === 'Anoniman') {
      this.pronalazacFormGroup.get('ime')?.setValue(null);
      this.pronalazacFormGroup.get('naziv')?.setValue(null);
    }
    console.log(this.pronalazac);
    
  }

  isDisabled(){
    if(this.pronalazac === 'Anoniman'){
      return false;
    }
    else if(this.pronalazacFormGroup.invalid){
      return true;
    }
    else{
      return false;
    }

  }}
