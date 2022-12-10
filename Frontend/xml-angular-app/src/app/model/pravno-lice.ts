import { Adresa } from "./adresa";
import { Kontakt } from "./kontakt";

export interface PravnoLiceI {
    kontakt: Kontakt;
    adresa: Adresa;
    naziv: string;
    pib: string;
    registrarskiBroj: string;
}