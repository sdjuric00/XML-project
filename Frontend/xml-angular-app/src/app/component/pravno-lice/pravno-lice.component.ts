import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pravno-lice',
  templateUrl: './pravno-lice.component.html',
  styleUrls: ['./pravno-lice.component.css']
})
export class PravnoLiceComponent implements OnInit {
  public podnosilacFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;

  }

  ngOnInit(): void {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
    console.log(this.podnosilacFormGroup);
  }

}
