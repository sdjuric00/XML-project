import {napraviPodnosioca, PodnosilacObj} from "../../autorsko-pravo/obj/podnosilac";

export interface ZahtevPatentOsnovneInformacije {
  id: string;
  broj_prijave: string;
  datum_podnosenja: Date;
  podnosilac: PodnosilacObj;
  pregledano: boolean;
  dopunska_prijava: boolean;
}

export function napraviZahtevPatentOsnovneInformacije(zahtevJson): ZahtevPatentOsnovneInformacije{

  return {
    id: zahtevJson.id[0],
    broj_prijave: zahtevJson.broj_prijave[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    podnosilac: napraviPodnosioca(zahtevJson.podnosilac[0]),
    pregledano: zahtevJson.pregledano[0],
    dopunska_prijava: zahtevJson.dopunska_prijava[0]
  }
}
