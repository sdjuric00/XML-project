
export interface PrijavaObj {
  datum_podnosenja_prijave: Date;
  broj_ranije_prijave: string;
  dvoslovna_oznaka_drzave: string;
}

export function napraviPrijavu(prijava): PrijavaObj {

  return {
    datum_podnosenja_prijave: prijava.datum_podnosenja_prijave[0],
    broj_ranije_prijave: prijava.broj_ranije_prijave[0],
    dvoslovna_oznaka_drzave: prijava.dvoslovna_oznaka_drzave[0]
  }
}

export function napraviListuPrijava(prijave): PrijavaObj[] {
  let listaPrijava: PrijavaObj[] = [];
  if (prijave){
    prijave.forEach(prijava => {
      listaPrijava.push(napraviPrijavu(prijava));
    })
  }

  return listaPrijava;
}
