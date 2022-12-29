import {Adresa} from "../../opste/adresa/obj/adresa";
import {Kontakt} from "../../opste/kontakt/obj/kontakt";

export interface Autor {
  ime?: string;
  prezime?: string;
  drzavljanstvno?: string;
  adresa?:Adresa;
  kontakt?: Kontakt;
  godinaSmrti?: string;
  pseudonim?:string;
}
