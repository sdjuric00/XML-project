export interface ZnakObj {
  pismo: string;
  boje: string[];
  opis: string;
  vrsta_znaka: string;
  prevod?: string;
  transliteracija_znaka?: string;
}

function napraviBoje(boje): string[] {
  let listaBoja: string[] = [];
  boje.forEach(boja => {
    listaBoja.push(boja.naziv[0]);
  })

  return listaBoja;
}

function napraviVrstuZnaka(vrsta_znaka): string {
  if (vrsta_znaka.vrsta_enum === null || vrsta_znaka.vrsta_enum === undefined){

    return vrsta_znaka.vrsta_custom[0];
  }

  return vrsta_znaka.vrsta_enum[0];
}

export function napraviZnak(znakJSON): ZnakObj {

  return {
    pismo: znakJSON.$.pismo,
    boje: napraviBoje(znakJSON.boje[0].boja),
    opis: znakJSON.opis[0],
    vrsta_znaka: napraviVrstuZnaka(znakJSON.vrsta_znaka[0]),
    prevod: znakJSON.prevod[0],
    transliteracija_znaka: znakJSON.transliteracija_znaka[0]
  }
}
