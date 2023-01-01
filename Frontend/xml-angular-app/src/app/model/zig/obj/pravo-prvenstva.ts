export interface PravoPrvenstvaObj {
  zatrazeno: boolean;
  osnov?: string;
}

export function napraviPravoPrvenstva(pravoJSON): PravoPrvenstvaObj {
  if (pravoJSON.osnov){

    return {
      zatrazeno: pravoJSON.$.zatrazeno == 'true',
      osnov: pravoJSON.osnov[0]
    }
  }

  return {
    zatrazeno: pravoJSON.$.zatrazeno,
  }
}
