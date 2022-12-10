import { KontaktComponent } from "src/app/component/kontakt/kontakt.component";
import { Adresa } from "./adresa";
import { Kontakt } from "./kontakt";

export interface FizickoLice{
    "opste:kontakt": Kontakt,
    "opste:adresa": Adresa,
    "opste:ime": string,
    "opste:prezime": string | null | undefined,
    "opste:jmbg": string | null | undefined,
}