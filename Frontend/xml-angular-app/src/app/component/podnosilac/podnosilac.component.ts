import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

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
  }

  changeRadioButton(lice: string):void {
    this.tipPodnosioca = lice;
  }


  changePodnosilacAutor() {
    this.podnosilacAutor = !this.podnosilacAutor;
  }
}
