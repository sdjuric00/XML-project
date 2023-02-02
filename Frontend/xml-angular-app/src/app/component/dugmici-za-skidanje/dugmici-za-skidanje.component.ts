import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutorskaPravaService } from 'src/app/service/autorska-prava.service';
import { TransformatorService } from 'src/app/service/transformator.service';
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";
import { UspesnaTransformacija } from 'src/app/model/opste/uspesna-transformacija';
import { PatentApplicationService } from 'src/app/service/patent-application.service';
import { ZigService } from 'src/app/service/zig.service';
import { ZahtevPatentDetaljneInformacije } from 'src/app/model/patent/obj/zahtev-patent-detaljne-informacije';
import { ZahtevZigDetaljneInformacije } from 'src/app/model/zig/obj/zahtev-zig-detaljne-informacije';
import { ZahtevAutorskoPravoDetaljneInformacije } from 'src/app/model/autorsko-pravo/obj/zahtev-autorsko-pravo-detaljne-informacije';
import { Resenje } from 'src/app/model/resenje/resenje';
import { ResenjeService } from 'src/app/service/resenje.service';


@Component({
  selector: 'app-dugmici-za-skidanje',
  templateUrl: './dugmici-za-skidanje.component.html',
  styleUrls: ['./dugmici-za-skidanje.component.scss']
})
export class DugmiciZaSkidanjeComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string = '';
  @Input() tipZahteva: string = '';

  public urlHtml: string = '';
  public urlPdf: string = '';

  patentSubscription: Subscription;
  zigSubscription: Subscription;
  autorskaPravaSubscription: Subscription;
  zahtevAutorskoPravo: ZahtevAutorskoPravoDetaljneInformacije;
  zahtevPatent: ZahtevPatentDetaljneInformacije;
  zahtevZig: ZahtevZigDetaljneInformacije;

  reseno: boolean = false;

  constructor(
    private autorskaPravaService: AutorskaPravaService,
    private patentService: PatentApplicationService,
    private zigService: ZigService,
    private transformatorService: TransformatorService,
    private toast: ToastrService,
    private _patentService: PatentApplicationService,
    private _zigService: ZigService,
    private _autorskaPravaService: AutorskaPravaService
  ) { }

  pdfSubscription: Subscription;
  htmlSubscription: Subscription;

  ngOnInit(): void {
    if (this.tipZahteva === 'p') {
      this.patentSubscription = this._patentService.uzmiZahtevPoId(this.zahtevId)
          .subscribe(result=> {
            this.zahtevPatent = result;
            this.reseno = this.zahtevPatent.pregledano
          });
    } else if (this.tipZahteva === 'a') {
      this.autorskaPravaSubscription = this._autorskaPravaService.uzmiZahtevPoId(this.zahtevId)
        .subscribe(result=> {
          this.zahtevAutorskoPravo = result;
          this.reseno = this.zahtevAutorskoPravo.pregledano
        });
    } else if (this.tipZahteva === 'z') {
      this.zigSubscription = this._zigService.uzmiZahtevPoId(this.zahtevId)
        .subscribe(result=> {
          this.zahtevZig = result;
          this.reseno = this.zahtevZig.pregledano;
        });
    }
  }

  dobaviIdResenja(jeResenje: boolean): string {
    if (this.tipZahteva === "a") {
      return jeResenje ? this.zahtevAutorskoPravo.referenca_na_resenje : this.zahtevId;
    } else if (this.tipZahteva === "p") {
      return jeResenje ? this.zahtevPatent.referenca_na_resenje : this.zahtevId;
    } else {
      return jeResenje ? this.zahtevZig.referenca_na_resenje : this.zahtevId;
    }
  }

  kreirajPDF(jeResenje: boolean) {
    let putanja: string = jeResenje ? 'resenje-' : 'zahtev-';
    const idDokumenta: string = this.dobaviIdResenja(jeResenje);
    if (this.tipZahteva === "a") {
      this.autorskaPravaService.kreirajPDF(idDokumenta, jeResenje).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `${putanja}${idDokumenta}`, 'application/pdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else if (this.tipZahteva === "p") {
      this.patentService.kreirajPDF(idDokumenta, jeResenje).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `${putanja}${idDokumenta}`, 'application/pdf')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else {
      this.zigService.kreirajPDF(idDokumenta, jeResenje).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `${putanja}${idDokumenta}`, 'application/pdf')
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

  kreirajHTML(jeResenje: boolean) {
    let putanja: string = jeResenje ? 'resenje-' : 'zahtev-';
    const idDokumenta: string = this.dobaviIdResenja(jeResenje);
    if (this.tipZahteva === "a") {
      this.autorskaPravaService.kreirajHTML(idDokumenta, jeResenje).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `${jeResenje}${idDokumenta}`, 'text/html')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else if (this.tipZahteva === "p") {
      this.patentService.kreirajHTML(idDokumenta, jeResenje).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `${jeResenje}${idDokumenta}`, 'text/html')
          }
        },
        err => {
          this.toast.error("Dokument nije moguce skinuti trenutno, pokusajte ponovo kasnije.", 'Greska')
        }
      );
    } else {
      this.zigService.kreirajHTML(idDokumenta, jeResenje).subscribe(
        res => {
          if (res) {
            this.transformatorService.downloadDocument(res.odgovor, `${jeResenje}${idDokumenta}`, 'text/html')
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
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-autorsko-delo${this.zahtevId}`, 'text/rdf')
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
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-patent-${this.zahtevId}`, 'text/rdf')
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
            this.transformatorService.downloadJsonRdf(res.odgovor, `zahtev-zig-${this.zahtevId}`, 'text/rdf')
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

    if (this.patentSubscription) {
      this.patentSubscription.unsubscribe();
    }

    if (this.zigSubscription) {
      this.zigSubscription.unsubscribe();
    }

    if (this.autorskaPravaSubscription) {
      this.autorskaPravaSubscription.unsubscribe();
    }
  }

}
