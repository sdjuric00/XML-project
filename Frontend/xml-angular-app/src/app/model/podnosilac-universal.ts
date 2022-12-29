import { Adresa } from "./opste/adresa/obj/adresa";
import { Kontakt } from "./opste/kontakt/obj/kontakt";

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
