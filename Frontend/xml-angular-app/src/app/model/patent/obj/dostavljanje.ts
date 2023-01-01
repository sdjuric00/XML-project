import {Adresa, napraviAdresu} from "../../opste/adresa/obj/adresa";

export interface DostavljanjeObj {
  elektronski: boolean;
  pismeno: boolean;
  adresa: Adresa;
}

export function napraviDostavljanje(dostavljanje): DostavljanjeObj {

  return {
    elektronski: dostavljanje.$?.elektronski == 'true',
    pismeno: dostavljanje.$?.pismeno == 'true',
    adresa: napraviAdresu(dostavljanje.adresa[0])
  };
}

export function napraviListuDostavljanja(dostavljanja): DostavljanjeObj[] {
  let listaDostavljanja: DostavljanjeObj[] = [];
  dostavljanja.forEach(dostavljanje => {
    listaDostavljanja.push(napraviDostavljanje(dostavljanje));
  })

  return listaDostavljanja;
}
