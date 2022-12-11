import {VrstaAutorskogDela} from "./vrsta-autorskog-dela";
import {FormaZapisa} from "./forma-zapisa";
import {PodaciONaslovuPrerada} from "./podaci-o-naslovu-prerada";

export interface AutorskoDelo {
  "@":{
    stvoreno_u_radnom_odnosu: any,
    nacin_koriscenja: string
  },
  "vrsta_autorskog_dela": VrstaAutorskogDela,
  "forma_zapisa": FormaZapisa,
  "naslov": string,
  "alternativni_naslov"?:string,
  "podaci_o_naslovu_prerada"?: PodaciONaslovuPrerada
}
