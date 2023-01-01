export interface PrilogObj {
  opis: string;
  primerak: string;
}

export function napraviPriloge(prilozi): PrilogObj {
  return {
    opis: prilozi.opis,
    primerak: prilozi.primerak
  }
}
