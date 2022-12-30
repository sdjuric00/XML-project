import {Kontakt, napraviKontakt} from "../../opste/kontakt/obj/kontakt";
import {Adresa, napraviAdresu} from "../../opste/adresa/obj/adresa";

export interface PunomocnikPatentObj {
  za_zastupanje: boolean;
  za_prijem_pismeno: boolean;
  kontakt: Kontakt;
  adresa: Adresa;
  ime?: string;
  prezime?:string;
  jmbg?:string;
  naziv?: string,
  pib?: string,
  registarski_broj?: string
}

export function napraviPunomocnikaPatent(punomocnikJSON): PunomocnikPatentObj {
  if (punomocnikJSON === null || punomocnikJSON === undefined){
    return null;
  }
  if ((punomocnikJSON.fizicko_lice === null || punomocnikJSON.fizicko_lice === undefined) && (punomocnikJSON.pravno_lice === null || punomocnikJSON.pravno_lice === undefined)){

    return null;
  }

  if (punomocnikJSON.fizicko_lice === null || punomocnikJSON.fizicko_lice === undefined){
    const pravno_lice = punomocnikJSON.pravno_lice[0];

    return {
      za_zastupanje: punomocnikJSON.$.za_zastupanje,
      za_prijem_pismeno: punomocnikJSON.$.za_prijem_pismeno,
      kontakt: napraviKontakt(pravno_lice.kontakt[0]),
      adresa: napraviAdresu(pravno_lice.adresa[0]),
      naziv: pravno_lice.naziv[0],
      pib: pravno_lice.pib[0],
      registarski_broj: pravno_lice.registarski_broj[0]
    }
  } else {
    const fizicko_lice = punomocnikJSON.fizicko_lice[0];

    return {
      za_zastupanje: punomocnikJSON.$.za_zastupanje,
      za_prijem_pismeno: punomocnikJSON.$.za_prijem_pismeno,
      kontakt: napraviKontakt(fizicko_lice.kontakt[0]),
      adresa: napraviAdresu(fizicko_lice.adresa[0]),
      ime: fizicko_lice.ime[0],
      prezime: fizicko_lice.prezime[0],
      jmbg: fizicko_lice.jmbg[0]
    }
  }
}
