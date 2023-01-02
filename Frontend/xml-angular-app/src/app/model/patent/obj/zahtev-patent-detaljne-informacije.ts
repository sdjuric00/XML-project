import {InstitucijaObj, napraviInstituciju} from "../../opste/institucija/obj/institucija";
import {DostavljanjeObj, napraviListuDostavljanja} from "./dostavljanje";
import {napraviListuPodataka, PodatakOPronalaskuObj} from "./podaci-o-pronalasku";
import {napraviPodnosioca, PodnosilacObj} from "../../autorsko-pravo/obj/podnosilac";
import {napraviPronalazaca, PronalazacObj} from "./pronalazac";
import {napraviPunomocnikaPatent, PunomocnikPatentObj} from "./punomocnik-patent";
import {napraviListuPrijava, PrijavaObj} from "./prijava";

export interface ZahtevPatentDetaljneInformacije {
  id: string;
  referenca_na_resenje: string;
  broj_prijave: string;
  datum_obrade: Date;
  datum_podnosenja: Date;
  dopunska_prijava: boolean;
  dostavljanje: DostavljanjeObj[],
  pregledano: boolean;
  institucija: InstitucijaObj;
  podaci_o_pronalasku: PodatakOPronalaskuObj[];
  podnosilac: PodnosilacObj;
  pronalazac: PronalazacObj;
  punomocnik: PunomocnikPatentObj;
  zahtev_za_priznanje_prava_iz_ranijih_prijava: PrijavaObj[]
}

export function napraviZahtevPatentDetaljneInformacije(zahtevJson): ZahtevPatentDetaljneInformacije{

  return {
    broj_prijave: zahtevJson.broj_prijave[0],
    referenca_na_resenje: zahtevJson.referenca_na_resenje[0],
    datum_obrade: zahtevJson.datum_obrade[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    dopunska_prijava: zahtevJson.dopunska_prijava[0] === 'true',
    dostavljanje: napraviListuDostavljanja(zahtevJson.dostavljanje),
    id: zahtevJson.id[0],
    institucija: napraviInstituciju(zahtevJson.institucija[0]),
    podaci_o_pronalasku: napraviListuPodataka(zahtevJson.podaci_o_pronalasku),
    podnosilac: napraviPodnosioca(zahtevJson.podnosilac[0]),
    pregledano: zahtevJson.pregledano[0] === 'true',
    pronalazac: napraviPronalazaca(zahtevJson.pronalazac[0]),
    punomocnik: napraviPunomocnikaPatent(zahtevJson.punomocnik[0]),
    zahtev_za_priznanje_prava_iz_ranijih_prijava: napraviListuPrijava(zahtevJson.zahtev_za_priznanje_prava_iz_ranijih_prijava)
  }
}
