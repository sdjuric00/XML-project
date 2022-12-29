import {Adresa, napraviAdresu} from "../../adresa/obj/adresa";

export interface InstitucijaObj {
  naziv: string,
  adresa: Adresa
}

export function napraviInstituciju(institucijaJson): InstitucijaObj {

  return {
    naziv: institucijaJson.naziv[0],
    adresa: napraviAdresu(institucijaJson.adresa[0]),
  }
}

