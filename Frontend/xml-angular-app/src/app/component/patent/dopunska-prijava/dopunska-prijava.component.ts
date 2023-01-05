import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Prijava } from 'src/app/model/patent/xml/prijava';

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

  izbrisiPrijavu(prijava: Prijava){    
    let prijave: Prijava[] = this.prijaveFormGroup.get('prijave').value;
    prijave.splice(prijave.indexOf(prijava),1);

    this.prijaveFormGroup.get('prijave').setValue(prijave);
  }

  kreirajZahtev(){
    this.createdRequest.emit();
  }
}
