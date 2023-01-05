import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-zig-prilozi',
  templateUrl: './zig-prilozi.component.html',
  styleUrls: ['./zig-prilozi.component.css']
})
export class ZigPriloziComponent implements OnInit {

  @Input() takseIPriloziFormGroup: FormGroup;

  punomocjeRanijePrilozeno: boolean;
  punomocjeNaknadnoDostavljeno: boolean;

  primerakZnakaPutanja: string = '';
  punomocjePutanja: string = '';
  opstiAktOKolektivnoZiguPutanja: string = '';
  dozakOPravuPrvenstvaPutanja: string = '';
  dokazOUplatiTaksePutanja: string = '';

  robe: string[] = [];

  constructor(private controlContainer: ControlContainer) {

  }

  ngOnInit(): void {
    this.takseIPriloziFormGroup = <FormGroup>this.controlContainer.control;
    this.punomocjeRanijePrilozeno = this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.value;
    this.punomocjeNaknadnoDostavljeno = this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.value;
    if (this.takseIPriloziFormGroup.get('pravoPrvenstvaZatrazeno')?.value) {
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja').setValidators([Validators.required]);
      this.takseIPriloziFormGroup.get('pravoPrvenstvaOsnov').setValidators([Validators.required]);
    } else {
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja').setValidators([]);
      this.takseIPriloziFormGroup.get('pravoPrvenstvaOsnov').setValidators([]);
    }
  }

  changeToRanijePrilozeno(): void {
    this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.setValue(false);
    this.punomocjeRanijePrilozeno = !this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.value;
    this.punomocjeNaknadnoDostavljeno = false;
    if (!this.punomocjeRanijePrilozeno) {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators([Validators.required]);
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValue('');
      this.punomocjePutanja = '';
    } else {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setErrors(null);
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators(null);
    }
    this.takseIPriloziFormGroup.get('punomocjePutanja').updateValueAndValidity();
  }

  changeToNaknadnoDostavljeno(): void {
    this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.setValue(false);
    this.punomocjeRanijePrilozeno = false;
    this.punomocjeNaknadnoDostavljeno = !this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.value;
    if (!this.punomocjeNaknadnoDostavljeno) {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators([Validators.required]);
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValue('');
      this.punomocjePutanja = '';
    } else {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setErrors(null);
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators(null);
    }
    this.takseIPriloziFormGroup.get('punomocjePutanja').updateValueAndValidity();
  }

  getPravoPrvenstva(): boolean {

    return this.takseIPriloziFormGroup.get('pravoPrvenstvaZatrazeno')?.value;
  }

  izbrisiRobu(roba: string): void {
    this.robe = this.robe.filter((item) => {
      return roba !== item
    })

    this.takseIPriloziFormGroup.get('spisakRoba')?.setValue(this.robe);
  }

  dodajRobu(roba: string): void {
    if (!this.robe.includes(roba)){
        this.robe.push(roba)    //zbog duplikata
    }

    this.takseIPriloziFormGroup.get('spisakRoba')?.setValue(this.robe);
  }

  primerakZnakaChanged(event: any): void {
    this.primerakZnakaPutanja = event.target.files[0]?.name ?? null;
    if (this.primerakZnakaPutanja) {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.takseIPriloziFormGroup.get('primerakZnakaPutanja')?.setValue(base64);
      });
    }
  }

  opstiAktOKolektivnoZiguChanged(event: any): void {
    this.opstiAktOKolektivnoZiguPutanja = event.target.files[0]?.name ?? null;
    if (this.opstiAktOKolektivnoZiguPutanja) {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.takseIPriloziFormGroup.get('opstiAktOKolektivnoZiguPutanja')?.setValue(base64);
      });
    }
  }

  dozakOPravuPrvenstvaChanged(event: any): void {
    this.dozakOPravuPrvenstvaPutanja = event.target.files[0]?.name ?? null;
    if (this.dozakOPravuPrvenstvaPutanja) {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja')?.setValue(base64);
      });
    }
  }

  dokazOUplatiTakseChanged(event: any): void {
    this.dokazOUplatiTaksePutanja = event.target.files[0]?.name ?? null;
    if (this.dokazOUplatiTakseChanged) {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.takseIPriloziFormGroup.get('dokazOUplatiTaksePutanja')?.setValue(base64);
      });
    }
  }

  punomocjeChanged(event: any): void {
    this.punomocjePutanja = event.target.files[0]?.name ?? null;
    if (this.punomocjePutanja) {
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.takseIPriloziFormGroup.get('punomocjePutanja')?.setValue(base64);
      });
    }
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = event => result.next(btoa(event.target.result.toString()));
    return result;
  }

}
