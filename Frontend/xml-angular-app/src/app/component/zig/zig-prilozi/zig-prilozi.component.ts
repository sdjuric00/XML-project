import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, Validators } from '@angular/forms';

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
  }

  changeToRanijePrilozeno(): void {
    this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.setValue(false);
    this.punomocjeRanijePrilozeno = !this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.value;
    this.punomocjeNaknadnoDostavljeno = false;
    if (!this.punomocjeRanijePrilozeno) {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators([]);
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValue('');
      this.punomocjePutanja = '';
    } else {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators([Validators.required]);
    }
  }

  changeToNaknadnoDostavljeno(): void {
    this.takseIPriloziFormGroup.get('generalnoPunomocjeRanijePrilozeno')?.setValue(false);
    this.punomocjeRanijePrilozeno = false;
    this.punomocjeNaknadnoDostavljeno = !this.takseIPriloziFormGroup.get('punomocjeNaknadnoDostavljeno')?.value;
    if (!this.punomocjeNaknadnoDostavljeno) {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators([]);
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValue('');
      this.punomocjePutanja = '';
    } else {
      this.takseIPriloziFormGroup.get('punomocjePutanja').setValidators([Validators.required]);
    }
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
      this.takseIPriloziFormGroup.get('primerakZnakaPutanja')?.setValue(this.primerakZnakaPutanja);
    }
  }

  opstiAktOKolektivnoZiguChanged(event: any): void {
    this.opstiAktOKolektivnoZiguPutanja = event.target.files[0]?.name ?? null;
    if (this.opstiAktOKolektivnoZiguPutanja) {
      this.takseIPriloziFormGroup.get('opstiAktOKolektivnoZiguPutanja')?.setValue(this.opstiAktOKolektivnoZiguPutanja);
    }
  }

  dozakOPravuPrvenstvaChanged(event: any): void {
    this.dozakOPravuPrvenstvaPutanja = event.target.files[0]?.name ?? null;
    if (this.dozakOPravuPrvenstvaPutanja) {
      this.takseIPriloziFormGroup.get('dozakOPravuPrvenstvaPutanja')?.setValue(this.dozakOPravuPrvenstvaPutanja);
    }
  }

  dokazOUplatiTakseChanged(event: any): void {
    this.dokazOUplatiTaksePutanja = event.target.files[0]?.name ?? null;
    if (this.dokazOUplatiTaksePutanja) {
      this.takseIPriloziFormGroup.get('dokazOUplatiTaksePutanja')?.setValue(this.dokazOUplatiTaksePutanja);
    }
  }

  punomocjeChanged(event: any): void {
    this.punomocjePutanja = event.target.files[0]?.name ?? null;
    if (this.punomocjePutanja) {
      this.takseIPriloziFormGroup.get('punomocjePutanja')?.setValue(this.punomocjePutanja);
    }
  }

}
