import { Component } from '@angular/core';

@Component({
  selector: 'app-dopunska-prijava',
  templateUrl: './dopunska-prijava.component.html',
  styleUrls: ['./dopunska-prijava.component.css']
})
export class DopunskaPrijavaComponent {
  dopunska = false;

  changeRadioButton(odgovor: string){
    if(odgovor == "Da"){
      this.dopunska = true;
    }
    else{
      this.dopunska = false;
    }
  }
}
