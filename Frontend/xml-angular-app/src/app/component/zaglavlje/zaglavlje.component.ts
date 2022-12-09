import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zaglavlje',
  templateUrl: './zaglavlje.component.html',
  styleUrls: ['./zaglavlje.component.css']
})
export class ZaglavljeComponent implements OnInit{
  
  @Input() obrazac: string;
  imeInstitucije: string = "Zavod za intelektualnu svojinu";
  adresa = {
    grad: "Beograd",
    ulica: "Kneginje Ljubice",
    broj: "5",
    postanskiBroj: 11000,
    drzava: "Republika Srbija"
  }

  naslov: string;

  private getNaslov(obrazac: string): string{
    return obrazac === "A-1" ? 
    "Zahtev za unosenje u evidenciju i deponovanje autorskih dela" : 
    obrazac === "P-1" ? 
    "Zahtev za priznavanje patenta" :
    "Zahtev za priznanje žiga";
  }
 
  ngOnInit(): void {
    var obrazacNaslov = {
      "A-1": "Zahtev za unosenje u evidenciju i deponovanje autorskih dela",
      "P-1": "Zahtev za priznavanje patenta",
      "Z-1": "Zahtev za priznanje žiga"
    }
    this.naslov = this.getNaslov(this.obrazac);
  }
}
