import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fizicko-lice',
  templateUrl: './fizicko-lice.component.html',
  styleUrls: ['./fizicko-lice.component.css']
})
export class FizickoLiceComponent implements OnInit {
  public podnosilacFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
  }

}
