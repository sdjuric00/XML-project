export interface Izvestaj {
  "@"?: {},
  broj_nepregledanih: number;
  broj_odbijenih: number;
  broj_prihvacenih: number;
  ukupan_broj: number;
}

export function napraviIzvestaj(izvestajJSON): Izvestaj {

  return {
    broj_nepregledanih: +izvestajJSON.broj_nepregledanih[0],
    broj_odbijenih: +izvestajJSON.broj_odbijenih[0],
    broj_prihvacenih: +izvestajJSON.broj_prihvacenih[0],
    ukupan_broj: +izvestajJSON.ukupan_broj[0]
  }

}

export interface IzvestajLista {
  "izvestaj_podaci": Izvestaj[]
}

export interface IzvestajZaPDF {
  izvestaj: {
    "@"?: {},
    "izvestaji": IzvestajLista,
    "pocetni_datum": string,
    "krajnji_datum": string
  }
}
