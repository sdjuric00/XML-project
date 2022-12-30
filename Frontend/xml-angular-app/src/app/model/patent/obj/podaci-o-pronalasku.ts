export interface PodatakOPronalaskuObj {
  naziv: string;
  jezik: string;
}

export function napraviPodatak(podatakJSON): PodatakOPronalaskuObj {
  return {
    naziv: podatakJSON._,
    jezik: podatakJSON.$?.jezik
  };
}

export function napraviListuPodataka(podaciJSON): PodatakOPronalaskuObj[] {
  let listaPodataka: PodatakOPronalaskuObj[] = [];
  podaciJSON.forEach(podatak => {
    listaPodataka.push(napraviPodatak(podatak));
  })

  return listaPodataka;
}
