import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zig-takse',
  templateUrl: './zig-takse.component.html',
  styleUrls: ['./zig-takse.component.css']
})
export class ZigTakseComponent implements OnInit {

  @Input() takseIPriloziFormGroup: FormGroup;
  valute: string[] = ['RSD', 'EUR', 'USD'];

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.takseIPriloziFormGroup = <FormGroup>this.controlContainer.control;
  }

}
