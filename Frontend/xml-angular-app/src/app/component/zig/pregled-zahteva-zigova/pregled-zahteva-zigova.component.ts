import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregled-zahteva-zigova',
  templateUrl: './pregled-zahteva-zigova.component.html',
  styleUrls: ['./pregled-zahteva-zigova.component.css']
})
export class PregledZahtevaZigovaComponent implements OnInit {

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
