import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pregled-zahteva-autorska-prava',
  templateUrl: './pregled-zahteva-autorska-prava.component.html',
  styleUrls: ['./pregled-zahteva-autorska-prava.component.css']
})
export class PregledZahtevaAutorskaPravaComponent implements OnInit {

  pregledNeobradjenih: boolean;
  constructor() {
    this.pregledNeobradjenih = true;
  }

  ngOnInit(): void {
  }

  promeniVrstuPregleda(vrstaPregleda: string) {
    this.pregledNeobradjenih = vrstaPregleda === 'pregledano';
  }
}
