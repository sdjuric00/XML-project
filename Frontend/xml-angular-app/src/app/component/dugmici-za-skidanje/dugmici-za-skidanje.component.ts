import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutorskaPravaService } from 'src/app/service/autorska-prava.service';
import { TransformatorService } from 'src/app/service/transformator.service';
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";
import { UspesnaTransformacija } from 'src/app/model/opste/uspesna-transformacija';
import { PatentApplicationService } from 'src/app/service/patent-application.service';
import { ZigService } from 'src/app/service/zig.service';


@Component({
  selector: 'app-dugmici-za-skidanje',
  templateUrl: './dugmici-za-skidanje.component.html',
  styleUrls: ['./dugmici-za-skidanje.component.css']
})
export class DugmiciZaSkidanjeComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string = '';
  @Input() tipZahteva: string = '';

  public urlHtml: string = '';
  public urlPdf: string = '';

  constructor(
    private autorskaPravaService: AutorskaPravaService,
    private patentService: PatentApplicationService,
    private zigService: ZigService,
    private transformatorService: TransformatorService,
    private toast: ToastrService
  ) { }

  pdfSubscription: Subscription;
  htmlSubscription: Subscription;

  ngOnInit(): void {
  }

  kreirajPDF() {
    if (this.tipZahteva === "a") {
      this.autorskaPravaService.kreirajPDF(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-${this.zahtevId}`, 'application/pdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else if (this.tipZahteva === "p") {
      this.patentService.kreirajPDF(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-${this.zahtevId}`, 'application/pdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else {
      this.zigService.kreirajPDF(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-${this.zahtevId}`, 'application/pdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    }
  }

  getHtmlPdfUrls() {
    if (this.tipZahteva === "a") {
      this.urlHtml = environment.staticPodaciHtmlA;
      this.urlPdf = environment.staticPodaciPdfA;
    } else if (this.tipZahteva === "p") {
      this.urlHtml = environment.staticPodaciHtmlP;
      this.urlPdf = environment.staticPodaciPdfP;
    } else {
      this.urlHtml = environment.staticPodaciHtmlZ;
      this.urlPdf = environment.staticPodaciPdfZ;
    }
  }

  kreirajHTML() {
    if (this.tipZahteva === "a") {
      this.autorskaPravaService.kreirajHTML(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-${this.zahtevId}`, 'text/html')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else if (this.tipZahteva === "p") {
      this.patentService.kreirajHTML(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-${this.zahtevId}`, 'text/html')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else {
      this.zigService.kreirajHTML(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-${this.zahtevId}`, 'text/html')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    }
  }

  kreirajJson(){
    if (this.tipZahteva === "a") {
      this.autorskaPravaService.kreirajJson(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-autorsko-delo-${this.zahtevId}`, 'application/json')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else if (this.tipZahteva === "p") {
      this.patentService.kreirajJson(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `zahtev-patent-${this.zahtevId}`, 'application/json')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else {
      this.zigService.kreirajJson(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-zig-${this.zahtevId}`, 'application/json')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    }
  }

  kreirajRdf(){
    if (this.tipZahteva === "a") {
      this.autorskaPravaService.kreirajRdf(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-autorsko-delo${this.zahtevId}`, 'application/rdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else if (this.tipZahteva === "p") {
      this.patentService.kreirajRdf(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-patent-${this.zahtevId}`, 'application/rdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else {
      this.zigService.kreirajRdf(this.zahtevId).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-zig-${this.zahtevId}`, 'application/rdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.pdfSubscription) {
      this.pdfSubscription.unsubscribe();
    }

    if (this.htmlSubscription) {
      this.htmlSubscription.unsubscribe();
    }
  }

}
