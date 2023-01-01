import {Kontakt, napraviKontakt} from "../../opste/kontakt/obj/kontakt";
import {Adresa, napraviAdresu} from "../../opste/adresa/obj/adresa";

export interface PronalazacObj {
  anonimno: boolean;
  anonimni_pronalazac?: string;
  kontakt?: Kontakt,
  adresa?: Adresa,
  ime?: string,
  prezime?: string,
  jmbg?: string,
  pib?:string,
  naziv?:string;
  registarski_broj?:string;
}

export function napraviPronalazaca(pronalazac): PronalazacObj {
  let anonimno: boolean = pronalazac.$.anonimno == 'true';
  if (pronalazac.imenovani_pronalazac=== null || pronalazac.imenovani_pronalazac === undefined){
    return {
      anonimno: anonimno,
      anonimni_pronalazac: 'anonimni_pronalazac'
    }
  } else {
    return napraviImenovanogPronalazaca(anonimno, pronalazac.imenovani_pronalazac[0]);
  }
}

export function napraviImenovanogPronalazaca(anonimno, imenovani_pronalazac): PronalazacObj{
  if ((imenovani_pronalazac.fizicko_lice === null || imenovani_pronalazac.fizicko_lice === undefined)){
    let pravnoLice = imenovani_pronalazac.pravno_lice[0];
    return {
      anonimno: anonimno,
      kontakt: napraviKontakt(pravnoLice.kontakt[0]),
      adresa: napraviAdresu(pravnoLice.adresa[0]),
      naziv: pravnoLice.naziv[0],
      pib: pravnoLice.pib[0],
      registarski_broj: pravnoLice.registarski_broj[0]
    }
  }
  else {
    let fizickoLice = imenovani_pronalazac.fizicko_lice[0];

    return {
      anonimno: anonimno,
      kontakt: napraviKontakt(fizickoLice.kontakt[0]),
      adresa: napraviAdresu(fizickoLice.adresa[0]),
      ime: fizickoLice.ime[0],
      prezime: fizickoLice.prezime[0],
      jmbg: fizickoLice.jmbg[0]
    }
  }
}
