import {napraviPodnosioca, PodnosilacObj} from "./podnosilac";

export interface ZahtevAutorskoPravoOsnovneInformacije {
  id: string;
  broj_prijave: string;
  datum_podnosenja: Date;
  podnosilac: PodnosilacObj;
  pregledano: boolean;
}

export function napraviZahtevAutorskoPravoOsnovneInformacije(zahtevJson): ZahtevAutorskoPravoOsnovneInformacije{

  return {
    id: zahtevJson.id[0],
    broj_prijave: zahtevJson.broj_prijave[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    podnosilac: napraviPodnosioca(zahtevJson.podnosilac[0]),
    pregledano: zahtevJson.pregledano[0]
  }
}
