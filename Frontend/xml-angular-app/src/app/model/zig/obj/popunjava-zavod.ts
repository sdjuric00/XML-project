export interface PopunjavaZavodObj {
  primerak_znaka: boolean;
  spisak_roba_i_usluga: boolean;
  punomocje: boolean;
  generalno_punomocje_ranije_prilozeno:boolean;
  punomocje_ce_biti_naknadno_dostavljeno: boolean;
  opsti_akt: boolean;
  dokaz_o_pravu_prvenstva: boolean;
  dokaz_o_uplati_takse: boolean;
}

export function napraviPopunjavaZavod(popunjavaZavodJSON): PopunjavaZavodObj {

  return {
    primerak_znaka: popunjavaZavodJSON.primerak_znaka[0] === 'true',
    spisak_roba_i_usluga: popunjavaZavodJSON.spisak_roba_i_usluga[0] === 'true',
    punomocje: popunjavaZavodJSON.punomocje[0] === 'true',
    generalno_punomocje_ranije_prilozeno: popunjavaZavodJSON.generalno_punomocje_ranije_prilozeno[0] === 'true',
    punomocje_ce_biti_naknadno_dostavljeno: popunjavaZavodJSON.punomocje_ce_biti_naknadno_dostavljeno[0] === 'true',
    opsti_akt: popunjavaZavodJSON.opsti_akt[0] === 'true',
    dokaz_o_pravu_prvenstva: popunjavaZavodJSON.dokaz_o_pravu_prvenstva[0] === 'true',
    dokaz_o_uplati_takse: popunjavaZavodJSON.dokaz_o_uplati_takse[0] === 'true',
  }
}
