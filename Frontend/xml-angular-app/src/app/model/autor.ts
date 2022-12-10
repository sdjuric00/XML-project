import {Adresa} from "./adresa";
import {Kontakt} from "./kontakt";

export interface Autor {
  ime?: string;
  prezime?: string;
  drzavljanstvno?: string;
  adresa?:Adresa;
  kontakt?: Kontakt;
  godinaSmrti?: string;
  pseudonim?:string;
}
