import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fizicko-lice',
  templateUrl: './fizicko-lice.component.html',
  styleUrls: ['./fizicko-lice.component.css']
})
export class FizickoLiceComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {
    this.formGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.formGroup = <FormGroup>this.controlContainer.control;
    console.log(this.formGroup);
  }
}
