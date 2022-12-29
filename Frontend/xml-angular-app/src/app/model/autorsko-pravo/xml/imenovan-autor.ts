import { Adresa } from "../../opste/adresa/xml/adresa"
import {Kontakt} from "../../opste/kontakt/xml/kontakt";

export interface ImenovanAutor {
  "opste:kontakt": Kontakt,
  "opste:adresa": Adresa,
  "ime": string,
  "prezime": string,
  "drzavljanstvo": string,
  "godina_smrti"?: string,
  "pseudonim"?: string
}
