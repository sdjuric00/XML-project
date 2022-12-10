import { Component, Input, OnInit } from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";
import { PodnosilacUniversal } from 'src/app/model/podnosilac-universal';

@Component({
  selector: 'app-podnosilac',
  templateUrl: './podnosilac.component.html',
  styleUrls: ['./podnosilac.component.css']
})
export class PodnosilacComponent implements OnInit {

  @Input() isTrademark: boolean = false;
 
  tipPodnosioca: string='Fizičko lice';
  podnosilacAutor: boolean = false;
  public podnosilacFormGroup: FormGroup;

  podnosioci: PodnosilacUniversal[] = [];

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

  izbrisiPodnosioca(podnosilac: PodnosilacUniversal): void {
    this.podnosioci = this.podnosioci.filter((item) => {
      return podnosilac !== item
    })

    this.podnosilacFormGroup.get('podnosioci').setValue(this.podnosioci);
  }

  dodajPodnosioca(podnosilac: PodnosilacUniversal): void {
    this.podnosioci.push(podnosilac);
    this.podnosilacFormGroup.get('podnosioci').setValidators([Validators.required]);
    this.podnosilacFormGroup.get('podaciOZajednickomPredstavniku').setValidators([Validators.required]);
  }

  checkValidityDisabled(): boolean {
    if (this.isTrademark) {
      let podnosiociList: PodnosilacUniversal[] = this.podnosilacFormGroup.get('podnosioci').value;
      
      return podnosiociList.length <= 0;
    }

    return this.podnosilacFormGroup.invalid;
  }

}
