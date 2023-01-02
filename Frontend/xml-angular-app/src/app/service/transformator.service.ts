import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransformatorService {

  constructor() { }

  public downloadDocument(podaci: any, ime: string = 'zahtev', tip: string = 'application/pdf'): void {
    const linkSource = `data:${tip};base64,${podaci}`;
    var downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    this.openDocumentOnly(podaci, tip)
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = ime;
    downloadLink.click(); 
  }

  public openDocumentOnly(podaci: any, tip: string): void {
    const blob = this.b64toBlob(podaci, tip);
    let pdfUrl = window.URL.createObjectURL(blob);

    var PDF_link = document.createElement('a');
    PDF_link.href = pdfUrl;

    window.open(pdfUrl, '_blank');
  }

  b64toBlob(b64Data, contentType): Blob {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: contentType});

    return blob;
}

}
