import {Kontakt, napraviKontakt} from "../../opste/kontakt/obj/kontakt";
import {Adresa, napraviAdresu} from "../../opste/adresa/obj/adresa";

export interface PodnosilacObj {
  autor: boolean;
  kontakt: Kontakt;
  adresa: Adresa;
  ime?: string;
  prezime?:string;
  jmbg?:string;
  naziv?: string,
  pib?: string,
  registarski_broj?: string
}

export function napraviPodnosioca(podnosilac): PodnosilacObj{
  if (podnosilac.fizicko_lice === null || podnosilac.fizicko_lice === undefined){
    const pravno_lice = podnosilac.pravno_lice[0];
    return {
      autor: podnosilac.$.autor,
      kontakt: napraviKontakt(pravno_lice.kontakt[0]),
      adresa: napraviAdresu(pravno_lice.adresa[0]),
      naziv: pravno_lice.naziv[0],
      pib: pravno_lice.pib[0],
      registarski_broj: pravno_lice.registarski_broj[0]
    }
  } else {
    const fizicko_lice = podnosilac.fizicko_lice[0];

    return {
      autor: podnosilac.$.autor,
      kontakt: napraviKontakt(fizicko_lice.kontakt[0]),
      adresa: napraviAdresu(fizicko_lice.adresa[0]),
      ime: fizicko_lice.ime[0],
      prezime: fizicko_lice.prezime[0],
      jmbg: fizicko_lice.jmbg[0]
    }
  }
}
