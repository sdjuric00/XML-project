export interface Adresa {
  grad: string;
  ulica: string;
  broj:string;
  postanskiBroj: string;
  drzava: string;
}


export function napraviAdresu(adresa): Adresa{

  return {
    grad: adresa.grad[0],
    ulica: adresa.ulica[0],
    broj: adresa.broj[0],
    postanskiBroj: adresa.postanski_broj[0],
    drzava: adresa.drzava[0]
  }
}
