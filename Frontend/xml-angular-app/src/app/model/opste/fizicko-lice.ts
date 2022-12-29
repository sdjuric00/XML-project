import { Adresa } from "./adresa/xml/adresa";
import { Kontakt } from "./kontakt/xml/kontakt";

export interface FizickoLice{
    "opste:kontakt": Kontakt,
    "opste:adresa": Adresa,
    "opste:ime": string,
    "opste:prezime": string | null | undefined,
    "opste:jmbg": string | null | undefined,
}
