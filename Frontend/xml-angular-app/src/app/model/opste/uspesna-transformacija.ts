
export interface UspesnaTransformacija {
    odgovor: string
}

export function napraviUspesnuTransformaciju(zahtevJson): UspesnaTransformacija {
  console.log(zahtevJson)
  return {
    odgovor: zahtevJson.$.odgovor
  }
}