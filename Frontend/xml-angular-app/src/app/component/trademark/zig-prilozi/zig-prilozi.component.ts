import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zig-prilozi',
  templateUrl: './zig-prilozi.component.html',
  styleUrls: ['./zig-prilozi.component.css']
})
export class ZigPriloziComponent implements OnInit {

  @Input() takseIPriloziFormGroup: FormGroup;

  punomocjeRanijePrilozeno: boolean;
  punomocjeNaknadnoDostavljeno: boolean;

  robe: string[] = [];

  constructor(private controlContainer: ControlContainer) {

  }

  ngOnInit(): void {
    this.takseIPriloziFormGroup = <FormGroup>this.controlContainer.control;
    this.punomocjeRanijePrilozeno = this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.value;
    this.punomocjeNaknadnoDostavljeno = this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.value;
  }

  changeToRanijePrilozeno(): void {
    this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.setValue(false);
    this.punomocjeRanijePrilozeno = !this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.value;
    this.punomocjeNaknadnoDostavljeno = false;
  }

  changeToNaknadnoDostavljeno(): void {
    this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.setValue(false);
    this.punomocjeRanijePrilozeno = false;
    this.punomocjeNaknadnoDostavljeno = !this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.value;
  }

  getPravoPrvenstva(): boolean {

    return this.takseIPriloziFormGroup.get('pravoPrvenstvaZatrazeno')?.value;
  }

  izbrisiRobu(roba: string): void {
    this.robe = this.robe.filter((item) => {
      return roba !== item
    })

    this.takseIPriloziFormGroup.get('spisakRoba')?.setValue(this.robe);
  }

  dodajRobu(roba: string): void {
    if (!this.robe.includes(roba)){
        this.robe.push(roba)    //zbog duplikata
    }

    this.takseIPriloziFormGroup.get('spisakRoba')?.setValue(this.robe);
  }

}
