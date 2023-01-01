export interface Resenje {
  datum_obrade: Date;
  ime_prezime_sluzbenika: string;
  referenca_na_zahtev: string;
  razlog_odbijanja?: string;
  sifra_obradjenog_zahteva?: string;
}

export function napraviResenje(resenjeJSON): Resenje {
  console.log(resenjeJSON)
  if (resenjeJSON.razlog_odbijanja){
    return {
      datum_obrade: resenjeJSON.datum_obrade[0],
      ime_prezime_sluzbenika: resenjeJSON.ime_prezime_sluzbenika[0],
      referenca_na_zahtev: resenjeJSON.referenca_na_zahtev[0],
      razlog_odbijanja: resenjeJSON.razlog_odbijanja[0]
    }
  }else{
    return {
      datum_obrade: resenjeJSON.datum_obrade[0],
      ime_prezime_sluzbenika: resenjeJSON.ime_prezime_sluzbenika[0],
      referenca_na_zahtev: resenjeJSON.referenca_na_zahtev[0],
      sifra_obradjenog_zahteva: resenjeJSON.sifra_obradjenog_zahteva[0]
    }
  }
}
