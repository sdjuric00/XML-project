import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-punomocnik-patent',
  templateUrl: './punomocnik-patent.component.html',
  styleUrls: ['./punomocnik-patent.component.css']
})
export class PunomocnikPatentComponent implements OnInit{
  public punomocnikPatentFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.punomocnikPatentFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.punomocnikPatentFormGroup = <FormGroup>this.controlContainer.control;
    this.punomocnikPatentFormGroup.clearValidators();
    this.punomocnikPatentFormGroup.updateValueAndValidity();
    this.punomocnikPatentFormGroup.reset();
  }

}
