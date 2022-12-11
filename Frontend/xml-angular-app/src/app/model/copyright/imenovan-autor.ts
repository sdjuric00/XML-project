import { Adresa } from "../opste/adresa"
import {Kontakt} from "../opste/kontakt";

export interface ImenovanAutor {
  "opste:kontakt": Kontakt,
  "opste:adresa": Adresa,
  "ime": string,
  "prezime": string,
  "drzavljanstvo": string,
  "godina_smrti"?: string,
  "pseudonim"?: string
}
