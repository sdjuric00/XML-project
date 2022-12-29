import {napraviPunomocnika, PunomocnikObj} from "../../opste/punomocnik/obj/punomocnik";

export interface ZahtevZigOsnovneInformacije {
  id: string;
  broj_prijave: string;
  datum_podnosenja: Date;
  punomocnik: PunomocnikObj;
  pregledano: boolean;
  vrsta_ziga: string;
}

export function napraviZahtevZigOsnovneInformacije(zahtevJson): ZahtevZigOsnovneInformacije{

  return {
    id: zahtevJson.id[0],
    broj_prijave: zahtevJson.broj_prijave[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    punomocnik: napraviPunomocnika(zahtevJson.punomocnik[0]),
    pregledano: zahtevJson.pregledano[0],
    vrsta_ziga: zahtevJson.vrsta_ziga[0]
  }
}
