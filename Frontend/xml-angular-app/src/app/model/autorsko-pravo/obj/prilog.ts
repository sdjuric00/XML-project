export interface PrilogObj {
  opis: string;
  primerak: string;
  opis_prilozen: boolean;
  primerak_prilozen: boolean;
}

export function napraviPriloge(prilozi): PrilogObj {
  return {
    opis: prilozi.opis,
    primerak: prilozi.primerak,
    opis_prilozen: prilozi.$.primerak_prilozen === 'true',
    primerak_prilozen: prilozi.$.primerak_prilozen === 'true'
  }
}
