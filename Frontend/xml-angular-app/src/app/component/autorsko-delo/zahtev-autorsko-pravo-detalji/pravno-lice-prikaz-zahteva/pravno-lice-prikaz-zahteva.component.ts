import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pravno-lice-prikaz-zahteva',
  templateUrl: './pravno-lice-prikaz-zahteva.component.html',
  styleUrls: ['./pravno-lice-prikaz-zahteva.component.css']
})
export class PravnoLicePrikazZahtevaComponent implements OnInit {

  @Input() osoba;
  constructor() { }

  ngOnInit(): void {
  }

}
