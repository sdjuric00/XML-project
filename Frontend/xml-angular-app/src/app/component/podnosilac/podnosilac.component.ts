import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-podnosilac',
  templateUrl: './podnosilac.component.html',
  styleUrls: ['./podnosilac.component.css']
})
export class PodnosilacComponent implements OnInit {
  tipPodnosioca: string='Fizičko lice';
  podnosilacAutor: boolean = false;
  public podnosilacFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
    this.podnosilacFormGroup.clearValidators();
   
    this.podnosilacFormGroup.updateValueAndValidity();
    this.podnosilacFormGroup.reset();
  }


  changePodnosilacAutor():void {
    this.podnosilacAutor = !this.podnosilacAutor;
  }

}
