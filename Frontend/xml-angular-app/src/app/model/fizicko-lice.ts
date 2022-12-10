import { Adresa } from "./adresa";
import { Kontakt } from "./kontakt";

export interface FizickoLiceI {
    kontakt: Kontakt;
    adresa: Adresa;
    ime: string;
    prezime: string;
    jmbg: string;
}