import {napraviPodnosioca, PodnosilacObj} from "./podnosilac";
import {Institucija} from "../../opste/institucija/xml/institucija";
import {Podnosilac} from "../../patent/podnosilac";
import {PunomocnikAutorskaPrava} from "../xml/punomocnik-autorska-prava";
import {AutorskoDelo} from "../xml/autorsko-delo";
import {Autori, Prilozi} from "../xml/zahtev-autorsko-pravo-xml";
import {InstitucijaObj, napraviInstituciju} from "../../opste/institucija/obj/institucija";
import {napraviPunomocnika, PunomocnikObj} from "./punomocnik";
import {AutorskoDeloObj, napraviAutorskoDelo} from "./autorsko-delo";
import {AutorObj, napraviAutore} from "./autor";
import {napraviPriloge, PrilogObj} from "./prilog";

export interface ZahtevAutorskoPravoDetaljneInformacije {
  id: string;
  broj_prijave: string;
  datum_podnosenja: Date;
  pregledano: boolean;
  podnosilac: PodnosilacObj;
  institucija: InstitucijaObj;
  punomocnik: PunomocnikObj;
  autorsko_delo: AutorskoDeloObj;
  autori: AutorObj[];
  prilozi: PrilogObj[];
}

export function napraviZahtevAutorskoPravoDetaljneInformacije(zahtevJson): ZahtevAutorskoPravoDetaljneInformacije{

  return {
    id: zahtevJson.id[0],
    broj_prijave: zahtevJson.broj_prijave[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    pregledano: zahtevJson.pregledano[0],
    podnosilac: napraviPodnosioca(zahtevJson.podnosilac[0]),
    institucija: napraviInstituciju(zahtevJson.institucija[0]),
    punomocnik: napraviPunomocnika(zahtevJson.punomocnik[0]),
    autorsko_delo: napraviAutorskoDelo(zahtevJson.autorsko_delo[0]),
    autori: napraviAutore(zahtevJson.autori),
    prilozi: napraviPriloge(zahtevJson.prilozi)
  }
}
