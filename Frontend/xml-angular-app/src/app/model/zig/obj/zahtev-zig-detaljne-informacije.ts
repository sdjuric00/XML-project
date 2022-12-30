import {InstitucijaObj, napraviInstituciju} from "../../opste/institucija/obj/institucija";
import {napraviPunomocnika, PunomocnikObj} from "../../opste/punomocnik/obj/punomocnik";

export interface ZahtevZigDetaljneInformacije {
  id: string;
  broj_prijave: string;
  datum_podnosenja: Date;
  pregledano: boolean;
  institucija: InstitucijaObj;
  punomocnik: PunomocnikObj;
}

export function napraviZahtevZigDetaljneInformacije(zahtevJson): ZahtevZigDetaljneInformacije{

  console.log(zahtevJson);

  return {
    id: zahtevJson.id[0],
    broj_prijave: zahtevJson.broj_prijave[0],
    datum_podnosenja: zahtevJson.datum_podnosenja[0],
    pregledano: zahtevJson.pregledano[0],
    institucija: napraviInstituciju(zahtevJson.institucija[0]),
    punomocnik: napraviPunomocnika(zahtevJson.punomocnik[0])
  }
}
