import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  razlog_odbijanja: string;
}

@Component({
  selector: 'app-odbij-zahtev',
  templateUrl: './odbij-zahtev.component.html',
  styleUrls: ['./odbij-zahtev.component.css']
})
export class OdbijZahtevComponent {

  razlog: string = '';
  stisnutoJePotvrdi: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OdbijZahtevComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancel(): void {
    this.dialogRef.close('');
  }

  confirm(): void {
    this.stisnutoJePotvrdi = true;
    if (this.formaJeValidna() && this.stisnutoJePotvrdi){
      this.data.razlog_odbijanja = this.razlog;
      this.dialogRef.close(this.data.razlog_odbijanja);
    }
  }

  formaJeValidna() {
    return this.razlog !== '';
  }
}
