import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

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

}
