import { Adresa } from "./adresa";
import { Kontakt } from "./kontakt";

export interface PodnosilacUniversal {
    kontakt: Kontakt;
    adresa: Adresa;
    isPravnoLice: boolean;
    ime?: string;
    prezime?: string;
    jmbg?: string;
    naziv?: string;
    pib?: string;
    registarskiBroj?: string;
}