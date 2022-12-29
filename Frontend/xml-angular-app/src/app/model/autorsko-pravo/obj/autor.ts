import {Kontakt, napraviKontakt} from "../../kontakt";
import {Adresa, napraviAdresu} from "../../adresa";

export interface AutorObj {
  anonimni_autor?: string,
  kontakt?: Kontakt,
  adresa?: Adresa,
  ime?: string,
  prezime?: string,
  drzavljanstvo?: string,
  godina_smrti?: string,
  pseudonim?: string
}

export function napraviAutora(autor): AutorObj {
  if (autor.imenovani_autor === null || autor.imenovani_autor === undefined){
    return {
      anonimni_autor: ''
    }
  } else {
    return napraviImenovanogAutora(autor.imenovani_autor[0]);
  }
}

export function napraviAutore(autori): AutorObj[] {
  let listaAutora: AutorObj[] = [];
  autori.forEach(autor => {
    listaAutora.push(napraviAutora(autor));
  })

  return listaAutora;
}

export function napraviImenovanogAutora(imenovani_autor): AutorObj{
  if ((imenovani_autor.godina_smrti === null || imenovani_autor.godina_smrti === undefined)){
    if ((imenovani_autor.pseudonim === null || imenovani_autor.pseudonim === undefined)){
      return {
        kontakt: napraviKontakt(imenovani_autor.kontakt[0]),
        adresa: napraviAdresu(imenovani_autor.adresa[0]),
        ime: imenovani_autor.ime[0],
        prezime: imenovani_autor.prezime[0],
        drzavljanstvo: imenovani_autor.drzavljanstvo[0]
      }
    }
    else {
      return {
        kontakt: napraviKontakt(imenovani_autor.kontakt[0]),
        adresa: napraviAdresu(imenovani_autor.adresa[0]),
        ime: imenovani_autor.ime[0],
        prezime: imenovani_autor.prezime[0],
        drzavljanstvo: imenovani_autor.drzavljanstvo[0],
        pseudonim: imenovani_autor.pseudonim[0]
      }
    }
  }

  else {
    if ((imenovani_autor.pseudonim === null || imenovani_autor.pseudonim === undefined)){
      return {
        kontakt: napraviKontakt(imenovani_autor.kontakt[0]),
        adresa: napraviAdresu(imenovani_autor.adresa[0]),
        ime: imenovani_autor.ime[0],
        prezime: imenovani_autor.prezime[0],
        drzavljanstvo: imenovani_autor.drzavljanstvo[0],
        godina_smrti: imenovani_autor.godina_smrti[0]
      }
    }
    else {
      return {
        kontakt: napraviKontakt(imenovani_autor.kontakt[0]),
        adresa: napraviAdresu(imenovani_autor.adresa[0]),
        ime: imenovani_autor.ime[0],
        prezime: imenovani_autor.prezime[0],
        drzavljanstvo: imenovani_autor.drzavljanstvo[0],
        godina_smrti: imenovani_autor.godina_smrti[0],
        pseudonim: imenovani_autor.pseudonim[0]
      }
    }
  }
}
