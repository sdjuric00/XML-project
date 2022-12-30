
export interface PriloziZigObj {
  primerak_znaka_putanja: string;
  punomocje_putanja: string;
  opsti_akt_o_kolektivnom_zigu_garancije_putanja: string;
  dokaz_o_pravu_prvenstva_putanja: string;
  dokaz_o_uplati_takse_putanja: string;
  generalno_punomocje_ranije_prilozeno:boolean;
  punomocje_ce_biti_naknadno_dostavljeno: boolean;
  spisak_roba_i_usluga: Roba[];
}

export interface Roba {
  naziv: string;
}

export function napraviPrilogeZig(priloziJSON): PriloziZigObj {

  return {
    primerak_znaka_putanja: priloziJSON.$.primerak_znaka_putanja,
    punomocje_putanja: priloziJSON.$.punomocje_putanja,
    opsti_akt_o_kolektivnom_zigu_garancije_putanja: priloziJSON.$.opsti_akt_o_kolektivnom_zigu_garancije_putanja,
    dokaz_o_pravu_prvenstva_putanja: priloziJSON.$.dokaz_o_pravu_prvenstva_putanja,
    dokaz_o_uplati_takse_putanja: priloziJSON.$.dokaz_o_uplati_takse_putanja,
    generalno_punomocje_ranije_prilozeno: priloziJSON.generalno_punomocje_ranije_prilozeno[0] === 'true',
    punomocje_ce_biti_naknadno_dostavljeno: priloziJSON.punomocje_ce_biti_naknadno_dostavljeno[0] === 'true',
    spisak_roba_i_usluga: napraviListuRobeIUsluga(priloziJSON.spisak_roba_i_usluga[0].roba)
  }
}

export function napraviRobu(robaJSON): Roba {

  return {
    naziv: robaJSON.naziv[0]
  }
}

export function napraviListuRobeIUsluga(robeIUslugeJSON): Roba[] {
  let listaRobe: Roba[] = [];
  robeIUslugeJSON.forEach(roba => {
    listaRobe.push(napraviRobu(roba));
  })

  return listaRobe;
}
