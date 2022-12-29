import {Adresa} from "./adresa";

export interface Kontakt {
  email: string;
  telefon: string;
  fax: string;
}


export function napraviKontakt(kontakt): Kontakt{

  return {
    email: kontakt.email[0],
    telefon: kontakt.telefon[0],
    fax: kontakt.fax[0]
  }
}
