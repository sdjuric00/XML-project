import {Adresa} from "../../opste/adresa/xml/adresa";
import {Kontakt} from "../../opste/kontakt/xml/kontakt";

export interface KorisnikXML {
  korisnik: {
    "@":{},
    "opste:kontakt": Kontakt,
    "opste:adresa": Adresa,
    "ime": string,
    "prezime": string,
    "lozinka": string,
    "potvrdna_lozinka": string,
    "tip_naloga": string
  }
}
