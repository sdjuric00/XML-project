
import { Component, EventEmitter, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Prijava } from 'src/app/model/patent/xml/prijava';

@Component({
  selector: 'app-prvobitna-prijava',
  templateUrl: './prvobitna-prijava.component.html',
  styleUrls: ['./prvobitna-prijava.component.css']
})
export class PrvobitnaPrijavaComponent {
  public prijaveFormGroup: FormGroup;
  @Output() dodataPrijava = new EventEmitter<Prijava>();
  constructor(private controlContainer: ControlContainer) {
    this.prijaveFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.prijaveFormGroup = <FormGroup>this.controlContainer.control;
  }

  dodajPrijavu(){
    const prijava: Prijava = {
      datum_podnosenja_prijave: this.prijaveFormGroup.get('datumPrijave').value,
      broj_ranije_prijave: this.prijaveFormGroup.get('brojPrijave').value,
      dvoslovna_oznaka_drzave: this.prijaveFormGroup.get('oznakaDrzave').value
    }
    const prijave: Prijava[] = this.prijaveFormGroup.get('prijave').value;
    this.dodataPrijava.emit(prijava);
    prijave.push(prijava);
    this.prijaveFormGroup.get('prijave').setValue(prijave);
    this.prijaveFormGroup.get('datumPrijave').setValue('');
    this.prijaveFormGroup.get('oznakaDrzave').setValue('');
    this.prijaveFormGroup.get('brojPrijave').setValue('');
  }
}
