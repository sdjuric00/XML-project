import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fizicko-lice-prikaz-zahteva',
  templateUrl: './fizicko-lice-prikaz-zahteva.component.html',
  styleUrls: ['./fizicko-lice-prikaz-zahteva.component.css']
})
export class FizickoLicePrikazZahtevaComponent implements OnInit {

  @Input() osoba;
  constructor() { }

  ngOnInit(): void {
  }

}
