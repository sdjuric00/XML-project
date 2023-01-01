import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutorskaPravaService } from 'src/app/service/autorska-prava.service';
import { TransformatorService } from 'src/app/service/transformator.service';
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";
import { UspesnaTransformacija } from 'src/app/model/opste/uspesna-transformacija';


@Component({
  selector: 'app-dugmici-za-skidanje',
  templateUrl: './dugmici-za-skidanje.component.html',
  styleUrls: ['./dugmici-za-skidanje.component.css']
})
export class DugmiciZaSkidanjeComponent implements OnInit, OnDestroy {

  @Input() zahtevId: string = '';

  public urlHtml: string = environment.staticPodaciHtml;
  public urlPdf: string = environment.staticPodaciPdf;

  constructor(
    private autorskaPravaService: AutorskaPravaService,
    private transformatorService: TransformatorService,
    private toast: ToastrService
  ) { }

  pdfSubscription: Subscription;
  htmlSubscription: Subscription;

  ngOnInit(): void {
  }

  kreirajPDF() {
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
  }

  kreirajHTML() {
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
