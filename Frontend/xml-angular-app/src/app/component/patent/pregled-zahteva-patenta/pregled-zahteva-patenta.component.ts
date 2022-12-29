import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregled-zahteva-patenta',
  templateUrl: './pregled-zahteva-patenta.component.html',
  styleUrls: ['./pregled-zahteva-patenta.component.css']
})
export class PregledZahtevaPatentaComponent implements OnInit {

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
