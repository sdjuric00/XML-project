import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import { map, Observable, startWith } from 'rxjs';
import { Country } from 'src/app/model/country';
import { countries } from 'src/app/model/country-data';

@Component({
  selector: 'app-adresa',
  templateUrl: './adresa.component.html',
  styleUrls: ['./adresa.component.css']
})
export class AdresaComponent implements OnInit {
  public podnosilacFormGroup: FormGroup;

  public countries: Country[] = countries;
  public filteredCountries: Observable<Country[]> | undefined;

  constructor(private controlContainer: ControlContainer) {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
  }

  ngOnInit(): void {
    this.podnosilacFormGroup = <FormGroup>this.controlContainer.control;
    if (this.podnosilacFormGroup) {
      this.filteredCountries = this.podnosilacFormGroup.get('drzava')?.valueChanges.pipe(
          startWith(''),
          map((country: string) => (country ? this._filterCountries(country) : this.countries.slice()))
        );
    }
  }

  _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

}
