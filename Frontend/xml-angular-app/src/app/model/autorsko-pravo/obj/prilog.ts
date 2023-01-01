export interface PrilogObj {
  putanja: string;
  opis: string;
}

export function napraviPriloge(prilozi): PrilogObj[] {
  let listaPriloga: PrilogObj[] = [];
  prilozi.forEach(prilog => {
    listaPriloga.push({
      putanja: prilog.$.putanja,
      opis: prilog.opis[0]
    })
  })

  return listaPriloga;
}
