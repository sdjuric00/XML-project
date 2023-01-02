import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import Chart from 'chart.js/auto';
import {DatePipe} from "@angular/common";
import {IzvestajService} from "../../service/izvestaj.service";
import {Subscription} from "rxjs";
import {Izvestaj} from "../../model/izvestaj/izvestaj";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css']
})
export class IzvestajiComponent implements OnInit, OnDestroy {

  datumi = new FormGroup({
    pocetni: new FormControl(new Date(year, month, 1)),
    krajnji: new FormControl(new Date(year, month, 25)),
  });

  izvestajSubscription: Subscription;
  izvestajAutorskaPrava: Izvestaj = null;
  izvestajPatenti: Izvestaj = null;
  izvestajZigovi: Izvestaj = null;
  grafik: Chart;
  constructor(private _izvestajService: IzvestajService, private _datum: DatePipe) { }

  ngOnInit(): void {
    this.generisiIzvestaj();
    this.grafik = new Chart("grafik", {
      data: {
      labels: ['Autorska prava', 'Patenti', 'Žigovi'],
        datasets: [{
        label: 'Ukupan broj zahteva',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(104, 202, 68, 0.2)'
        ],
        borderWidth: 1
      },
      {
        label: 'Ukupan broj prihvaćenih zahteva',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(54, 162, 232, 0.2)'
        ],
        borderWidth: 1
      },
      {
        label: 'Ukupan broj odbijenih zahteva',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(183, 62, 62, 0.2)'
        ],
        borderWidth: 1
      },
      {
        label: 'Ukupan broj neobradjenih zahteva',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(121,114,114,0.2)'
        ],
        borderWidth: 1
      }]
    },
      type: 'bar',
      options: {
        plugins: {
          title: {
            display: true,
            font: {
              size: 20
            },
            text: `Izveštaj za period od ${this._datum.transform(this.datumi.get('pocetni').value,'dd.MM.yyyy.')} do ${this._datum.transform(this.datumi.get('krajnji').value,'dd.MM.yyyy.')}`
          }
        }
      }
    });
  }

  generisiIzvestaj() {
    const pocetniDatum = this._datum.transform(this.datumi.get('pocetni').value,'yyyy-MM-dd');
    const krajnjiDatum = this._datum.transform(this.datumi.get('krajnji').value,'yyyy-MM-dd')
    this.izvestajSubscription = this._izvestajService.uzmiIzvestajAutorskaPrava(
      {pocetni_datum: pocetniDatum, krajnji_datum: krajnjiDatum}).subscribe(izvestaj => {
        console.log(izvestaj);
        this.izvestajAutorskaPrava = izvestaj;
        this.grafik.data.datasets[0].data[0] = izvestaj.ukupan_broj;
        this.grafik.data.datasets[1].data[0] = izvestaj.broj_prihvacenih;
        this.grafik.data.datasets[2].data[0] = izvestaj.broj_odbijenih;
        this.grafik.data.datasets[3].data[0] = izvestaj.broj_nepregledanih;
        this.grafik.update();
    });

    this.izvestajSubscription = this._izvestajService.uzmiIzvestajPatenti(
      {pocetni_datum: pocetniDatum, krajnji_datum: krajnjiDatum}).subscribe(izvestaj => {
      console.log(izvestaj);
      this.izvestajPatenti = izvestaj;
      this.grafik.data.datasets[0].data[1] = izvestaj.ukupan_broj;
      this.grafik.data.datasets[1].data[1] = izvestaj.broj_prihvacenih;
      this.grafik.data.datasets[2].data[1] = izvestaj.broj_odbijenih;
      this.grafik.data.datasets[3].data[1] = izvestaj.broj_nepregledanih;
      this.grafik.update();
    });

    this.izvestajSubscription = this._izvestajService.uzmiIzvestajZigovi(
      {pocetni_datum: pocetniDatum, krajnji_datum: krajnjiDatum}).subscribe(izvestaj => {
      console.log(izvestaj);
      this.izvestajZigovi = izvestaj;
      this.grafik.data.datasets[0].data[2] = izvestaj.ukupan_broj;
      this.grafik.data.datasets[1].data[2] = izvestaj.broj_prihvacenih;
      this.grafik.data.datasets[2].data[2] = izvestaj.broj_odbijenih;
      this.grafik.data.datasets[3].data[2] = izvestaj.broj_nepregledanih;
      this.grafik.update();
    });
  }

  ngOnDestroy(): void {
    if (this.izvestajSubscription){
      this.izvestajSubscription.unsubscribe();
    }
  }
}
