import {InstitucijaObj, napraviInstituciju} from "../../opste/institucija/obj/institucija";
import {napraviPunomocnika, PunomocnikObj} from "../../opste/punomocnik/obj/punomocnik";
import { napraviPlacenuTaksu, TaksaObj} from "./taksa";
import {napraviListuPodnosilaca, PodnosilacObj} from "../../autorsko-pravo/obj/podnosilac";
import {napraviPravoPrvenstva, PravoPrvenstvaObj} from "./pravo-prvenstva";
import {napraviPrilogeZig, PriloziZigObj} from "./prilozi-zig";
import {napraviZnak, ZnakObj} from "./znak";
import {napraviPopunjavaZavod, PopunjavaZavodObj} from "./popunjava-zavod";

export interface ZahtevZigDetaljneInformacije {
  id: string;
  referenca_na_resenje: string;
  broj_prijave: string;
  datum_podnosenja: Date;
  institucija: InstitucijaObj;
  nicanska_klasifikacija: string[];
  placene_takse: TaksaObj;
  podaci_o_zajednickom_predstavniku: PunomocnikObj;
  podnosioci: PodnosilacObj[],
  pravo_prvenstva: PravoPrvenstvaObj,
  pregledano: boolean;
  referenca_na_podnosioca: string;
  prilozi: PriloziZigObj;
  punomocnik: PunomocnikObj;
  vrsta_ziga: string;
  znak: ZnakObj;
  popunjava_zavod: PopunjavaZavodObj;
}

export function napraviZahtevZigDetaljneInformacije(zahtevJson): ZahtevZigDetaljneInformacije{
  let podaciOZajednickomPredstavniku: PunomocnikObj = null;
  if (zahtevJson.podaci_o_zajednickom_predstavniku) {
    podaciOZajednickomPredstavniku = napraviPunomocnika(zahtevJson.podaci_o_zajednickom_predstavniku[0]);
  }
  
  return {
    id: zahtevJson.id[0],
    referenca_na_resenje: zahtevJson.referenca_na_resenje[0],
    broj_prijave: zahtevJson.broj_prijave[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    referenca_na_podnosioca: zahtevJson.referenca_na_podnosioca[0],
    institucija: napraviInstituciju(zahtevJson.institucija[0]),
    nicanska_klasifikacija: napraviListuNicanskihKlasifikacija(zahtevJson.nicanska_klasifikacija),
    placene_takse: napraviPlacenuTaksu(zahtevJson.placene_takse[0]),
    podaci_o_zajednickom_predstavniku: podaciOZajednickomPredstavniku,
    podnosioci: napraviListuPodnosilaca(zahtevJson.podnosioci),
    pravo_prvenstva: napraviPravoPrvenstva(zahtevJson.pravo_prvenstva[0]),
    pregledano: zahtevJson.pregledano[0] === 'true',
    prilozi: napraviPrilogeZig(zahtevJson.prilozi[0]),
    punomocnik: napraviPunomocnika(zahtevJson.punomocnik[0]),
    vrsta_ziga: zahtevJson.vrsta_ziga[0],
    znak: napraviZnak(zahtevJson.znak[0]),
    popunjava_zavod: napraviPopunjavaZavod(zahtevJson.popunjava_zavod[0])
  }
}

export function napraviListuNicanskihKlasifikacija(nicanske_klasifikacije){
  let listaKlasifikacija: string[] = [];
  nicanske_klasifikacije.forEach(klasifikacija => listaKlasifikacija.push(klasifikacija));

  return listaKlasifikacija;
}
