import { Adresa } from "./adresa";
import { Kontakt } from "./kontakt";

export interface PravnoLice{
    "opste:kontakt": Kontakt,
    "opste:adresa": Adresa,
    "opste:naziv": string,
    "opste:pib": string,
    "opste:registarski_broj": string,
}