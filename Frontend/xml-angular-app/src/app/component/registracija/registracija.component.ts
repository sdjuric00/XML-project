import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {AutentifikacijaService} from "../../service/autentifikacija.service";
import {KorisnikXML} from "../../model/korisnik/xml/KorisnikXML";

@Component({
  selector: 'app-registracija',
  styleUrls: ['./registracija.component.css'],
  templateUrl: './registracija.component.html',
})
export class RegistracijaComponent implements OnInit, OnDestroy {
  formaZaRegistraciju = new FormGroup(

    {
      email: new FormControl('', [Validators.required, Validators.email]),
      telefon: new FormControl('', [Validators.required, Validators.pattern("[0-9]{8,12}")]),
      fax: new FormControl('', [Validators.required, Validators.pattern("[0][0-9]{8,9}")]),
      ulica: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      broj: new FormControl('', [Validators.required, Validators.pattern("[0-9A-Za-z ]{1,5}")]),
      grad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      postanskiBroj: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
      drzava: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      ime: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      prezime: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      ponovljenaLozinka: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      lozinka: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      tipNalogaFormControl: new FormControl('', [
        Validators.required
      ]),
    }
  );

  matcher = new MyErrorStateMatcher();
  cities: string[] = ['GRADJANIN', 'SLUŽBENIK'];
  registrationSubscription: Subscription;

  submitted: boolean = false;

  ulogovanSluzbenik: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  authSubscription: Subscription;

  ngOnInit(): void {
    this.ulogovanSluzbenik = this.autentifikacijaService.korisnikJeSluzbenik();
    this.authSubscription = this.autentifikacijaService.getSubjectCurrentUser().subscribe(
      user => {
        console.log(user);

      }
    );
  }

  constructor(
    private autentifikacijaService: AutentifikacijaService,
    private toast: ToastrService,
    private router: Router
  ) {
  }

  uzmiGresku() {
    return this.formaZaRegistraciju.hasError('mismatch');
  }

  registracija() {
    if (this.formaZaRegistraciju.hasError('mismatch')) {
      this.toast.error('Lozinke se ne poklapaju');
    }
    console.log(this.formaZaRegistraciju)
    if (this.formaValidna()) {
      const obj = this.formaZaRegistraciju.value;
      const korisnikXML: KorisnikXML = {
        korisnik: {
          "@":{
            "xmlns": "http://www.korisnici/korisnici",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xmlns:opste": "http://ftn.ac.rs/opste",
            "xsi:schemaLocation": "http://www.korisnici/korisnici",
          },
          "opste:kontakt": {
            "opste:email": obj.email,
            "opste:telefon": obj.telefon,
            "opste:fax": obj.fax
          },
          "opste:adresa": {
            "opste:grad": obj.grad,
            "opste:ulica": obj.ulica,
            "opste:broj": obj.broj,
            "opste:postanski_broj": obj.postanskiBroj,
            "opste:drzava": obj.drzava
          },
          ime: obj.ime,
          prezime: obj.prezime,
          lozinka: obj.lozinka,
          potvrdna_lozinka: obj.ponovljenaLozinka,
          tip_naloga: obj.tipNalogaFormControl,
        }}

      this.registrationSubscription = this.autentifikacijaService
        .registracija(korisnikXML)
        .subscribe(
          response => {
            this.toast.success(
              'Sada možeš da se prijaviš!',
              'Uspešna registracija'
            );
            this.router.navigate([`/prijava`]);
          },
          error => this.toast.error(error.error, 'Neuspešna registracija')
        );

    }
  }

  private formaValidna(){
    if (!this.ulogovanSluzbenik){
      this.formaZaRegistraciju.get('tipNalogaFormControl').setValue('gradjanin');
    }

    return !this.formaZaRegistraciju.invalid;
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
