import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-takse-prilozi',
  templateUrl: './takse-prilozi.component.html',
  styleUrls: ['./takse-prilozi.component.css']
})
export class TaksePriloziComponent implements OnInit {

  @Input() takseIPriloziFormGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.takseIPriloziFormGroup = <FormGroup>this.controlContainer.control;
  }

  pravoPrvenstvaZatrazeno(): void {
    if (!this.takseIPriloziFormGroup.get('pravoPrvenstvaZatrazeno').value) {
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja').setValidators([Validators.required]);
      this.takseIPriloziFormGroup.get('pravoPrvenstvaOsnov').setValidators([Validators.required]);
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja').setValue('');
      this.takseIPriloziFormGroup.get('pravoPrvenstvaOsnov').setValue('');
    } else {
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja').setValidators([]);
      this.takseIPriloziFormGroup.get('pravoPrvenstvaOsnov').setValidators([]);
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja').setValue('');
      this.takseIPriloziFormGroup.get('pravoPrvenstvaOsnov').setValue('');
    }
  }

}
