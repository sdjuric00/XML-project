import { Adresa } from "./adresa/xml/adresa";
import { Kontakt } from "./kontakt/xml/kontakt";

export interface PravnoLice{
    "opste:kontakt": Kontakt,
    "opste:adresa": Adresa,
    "opste:naziv": string,
    "opste:pib": string,
    "opste:registarski_broj": string,
}
