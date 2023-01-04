import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import Chart from 'chart.js/auto';
import {DatePipe} from "@angular/common";
import {IzvestajService} from "../../service/izvestaj.service";
import {Subscription} from "rxjs";
import {Izvestaj, IzvestajLista, IzvestajZaPDF} from "../../model/izvestaj/izvestaj";
import { TransformatorService } from 'src/app/service/transformator.service';
import { ToastrService } from 'ngx-toastr';

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

  pocetniDatum: string;
  krajnjiDatum: string;

  constructor(
    private _izvestajService: IzvestajService, 
    private _datum: DatePipe,
    private transformatorService: TransformatorService,
    private toast: ToastrService
    ) { }

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

  generisiPDF() {
    this.generisiIzvestaj();
    
    let izvestajLista: IzvestajLista = {
      izvestaj_podaci: []
    }
    
    let izvestajAutorskoPravo: Izvestaj = {
      "@": "patent",
      "broj_nepregledanih": this.izvestajAutorskaPrava.broj_nepregledanih,
      "broj_odbijenih": this.izvestajAutorskaPrava.broj_odbijenih,
      "broj_prihvacenih": this.izvestajAutorskaPrava.broj_prihvacenih,
      "ukupan_broj": this.izvestajAutorskaPrava.ukupan_broj
    }

    let izvestajPatent: Izvestaj = {
      "@": "patent",
      "broj_nepregledanih": this.izvestajPatenti.broj_nepregledanih,
      "broj_odbijenih": this.izvestajPatenti.broj_odbijenih,
      "broj_prihvacenih": this.izvestajPatenti.broj_prihvacenih,
      "ukupan_broj": this.izvestajPatenti.ukupan_broj
    }

    let izvestajZig: Izvestaj = {
      "@": "zig",
      "broj_nepregledanih": this.izvestajZigovi.broj_nepregledanih,
      "broj_odbijenih": this.izvestajZigovi.broj_odbijenih,
      "broj_prihvacenih": this.izvestajZigovi.broj_prihvacenih,
      "ukupan_broj": this.izvestajZigovi.ukupan_broj
    }

    izvestajLista.izvestaj_podaci.push(izvestajAutorskoPravo);
    izvestajLista.izvestaj_podaci.push(izvestajPatent);
    izvestajLista.izvestaj_podaci.push(izvestajZig);

    let izvestaj: IzvestajZaPDF = {
      izvestaj: {
        "@": {"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"},
        izvestaji: izvestajLista,
        pocetni_datum: this.pocetniDatum,
        krajnji_datum: this.krajnjiDatum
      }
    }

    this._izvestajService.kreirajPDF(izvestaj).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `Izvestaj`, 'application/pdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );

  }

  generisiIzvestaj() {
    this.pocetniDatum = this._datum.transform(this.datumi.get('pocetni').value,'yyyy-MM-dd');
    this.krajnjiDatum = this._datum.transform(this.datumi.get('krajnji').value,'yyyy-MM-dd')
    this.izvestajSubscription = this._izvestajService.uzmiIzvestajAutorskaPrava(
      {pocetni_datum: this.pocetniDatum, krajnji_datum: this.krajnjiDatum}).subscribe(izvestaj => {
        console.log(izvestaj);
        this.izvestajAutorskaPrava = izvestaj;
        this.izvestajAutorskaPrava['@'] = {tip_izvestaja: "autorsko_pravo"}
        this.grafik.data.datasets[0].data[0] = izvestaj.ukupan_broj;
        this.grafik.data.datasets[1].data[0] = izvestaj.broj_prihvacenih;
        this.grafik.data.datasets[2].data[0] = izvestaj.broj_odbijenih;
        this.grafik.data.datasets[3].data[0] = izvestaj.broj_nepregledanih;
        this.grafik.update();
    });

    this.izvestajSubscription = this._izvestajService.uzmiIzvestajPatenti(
      {pocetni_datum: this.pocetniDatum, krajnji_datum: this.krajnjiDatum}).subscribe(izvestaj => {
      console.log(izvestaj);
      this.izvestajPatenti = izvestaj;
      this.izvestajPatenti['@'] = {tip_izvestaja: "patent"}
      this.grafik.data.datasets[0].data[1] = izvestaj.ukupan_broj;
      this.grafik.data.datasets[1].data[1] = izvestaj.broj_prihvacenih;
      this.grafik.data.datasets[2].data[1] = izvestaj.broj_odbijenih;
      this.grafik.data.datasets[3].data[1] = izvestaj.broj_nepregledanih;
      this.grafik.update();
    });

    this.izvestajSubscription = this._izvestajService.uzmiIzvestajZigovi(
      {pocetni_datum: this.pocetniDatum, krajnji_datum: this.krajnjiDatum}).subscribe(izvestaj => {
      console.log(izvestaj);
      this.izvestajZigovi = izvestaj;
      this.izvestajZigovi['@'] = {tip_izvestaja: "zig"}
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
