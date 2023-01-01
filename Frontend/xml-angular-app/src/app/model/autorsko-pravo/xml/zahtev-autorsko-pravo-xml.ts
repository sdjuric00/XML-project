
import { Institucija } from "../../opste/institucija/xml/institucija";
import {Podnosilac} from "../../patent/xml/podnosilac";
import {PunomocnikAutorskaPrava} from "./punomocnik-autorska-prava";
import {AutorskoDelo} from "./autorsko-delo";
import {AutorInList, AutorXml} from "./autor-xml";
import {Prilog, PrilogInList} from "./prilog";

export interface Autori {
  "@"?:{},
  autor:AutorXml[]
}

export interface Prilozi {
  "opis": string,
  "primerak": string
}

export interface ZahtevAutorskoPravoXml {
  zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela: {
    "@":{},
    "institucija": Institucija,
    "podnosilac": Podnosilac,
    "punomocnik": PunomocnikAutorskaPrava,
    "autorsko_delo": AutorskoDelo,
    "autori": Autori,
    "prilozi": Prilozi
  }
}
