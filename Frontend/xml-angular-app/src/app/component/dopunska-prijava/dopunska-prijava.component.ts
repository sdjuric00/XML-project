import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Prijava } from 'src/app/model/patent/prijava';

@Component({
  selector: 'app-dopunska-prijava',
  templateUrl: './dopunska-prijava.component.html',
  styleUrls: ['./dopunska-prijava.component.css']
})
export class DopunskaPrijavaComponent implements OnInit{
  @Output() createdRequest = new EventEmitter();
  dopunska = false;
  public prijaveFormGroup: FormGroup;
  constructor(private controlContainer: ControlContainer) {
    this.prijaveFormGroup = <FormGroup>this.controlContainer.control;
  }
  prijave: Prijava[] = [];

  ngOnInit(): void {
    this.prijaveFormGroup = <FormGroup>this.controlContainer.control;
  }

  changeRadioButton(odgovor: string){
    if(odgovor == "Da"){
      this.dopunska = true;
    }
    else{
      this.dopunska = false;
    }
  }

  dodajPrijavu(prijava: Prijava){
    this.prijave.push(prijava);
    console.log(this.prijave);
  }

  izbrisiPrijavu(prijava: Prijava){
    this.prijave.splice(this.prijave.indexOf(prijava),1);
    console.log(this.prijave);
  }

  kreirajZahtev(){
    this.createdRequest.emit();
  }
}
