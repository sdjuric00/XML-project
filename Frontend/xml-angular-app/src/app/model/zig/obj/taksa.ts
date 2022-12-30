export interface TaksaObj {
  osnovna_taksa: number;
  taksa_za_graficko_resenje: number;
  taksa_za_klasu: number;
  ukupno: number;
  valuta: string;
}

export function napraviPlacenuTaksu(taksa): TaksaObj {

  return {
    osnovna_taksa: taksa.osnovna_taksa[0],
    taksa_za_graficko_resenje: taksa.taksa_za_graficko_resenje[0],
    taksa_za_klasu: taksa.taksa_za_klasu[0],
    ukupno: taksa.ukupno[0],
    valuta: taksa.valuta[0]
  }
}
