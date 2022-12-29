import { Adresa } from "./opste/adresa/obj/adresa";
import { Kontakt } from "./opste/kontakt/obj/kontakt";

export interface PravnoLiceI {
    kontakt: Kontakt;
    adresa: Adresa;
    naziv: string;
    pib: string;
    registrarskiBroj: string;
}
