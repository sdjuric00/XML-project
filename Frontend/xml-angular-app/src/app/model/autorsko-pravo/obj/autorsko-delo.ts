import {napraviAutora} from "./autor";

export interface AutorskoDeloObj {
  stvoreno_u_radnom_odnosu: boolean,
  nacin_koriscenja: string,
  "vrsta_autorskog_dela": any,
  "forma_zapisa": any,
  "naslov": string,
  "alternativni_naslov"?:string,
  "podaci_o_naslovu_prerada"?: any
}

function napraviPodatkeONaslovuPrerada(podaciONaslovuPreradaElement) {

  return {
    naslov: podaciONaslovuPreradaElement.naslov[0],
    autor: napraviAutora(podaciONaslovuPreradaElement.autor[0])
  }
}

export function napraviAutorskoDelo(autorskoDeloJSON): AutorskoDeloObj {
  const vrsta_dela = (autorskoDeloJSON.vrsta_autorskog_dela[0].vrsta_custom === null ||
    autorskoDeloJSON.vrsta_autorskog_dela[0].vrsta_custom === undefined)?
    autorskoDeloJSON.vrsta_autorskog_dela[0].vrsta_enum: autorskoDeloJSON.vrsta_autorskog_dela[0].vrsta_custom;

  const forma_zapisa = (autorskoDeloJSON.forma_zapisa[0].vrsta_custom === null ||
    autorskoDeloJSON.forma_zapisa[0].vrsta_custom === undefined)?
    autorskoDeloJSON.forma_zapisa[0].vrsta_enum: autorskoDeloJSON.forma_zapisa[0].vrsta_custom;

  if (autorskoDeloJSON.alternativni_naslov === null || autorskoDeloJSON.alternativni_naslov === undefined){
    if (autorskoDeloJSON.podaci_o_naslovu_prerada === null || autorskoDeloJSON.podaci_o_naslovu_prerada === undefined){
      return {
        stvoreno_u_radnom_odnosu: autorskoDeloJSON.$.stvoreno_u_radnom_odnosu == 'true',
        nacin_koriscenja: autorskoDeloJSON.$.nacin_koriscenja,
        vrsta_autorskog_dela: vrsta_dela,
        forma_zapisa: forma_zapisa,
        naslov: autorskoDeloJSON.naslov[0]
      }
    } else {

      return {
        stvoreno_u_radnom_odnosu: autorskoDeloJSON.$.stvoreno_u_radnom_odnosu == 'true',
        nacin_koriscenja: autorskoDeloJSON.$.nacin_koriscenja,
        vrsta_autorskog_dela: vrsta_dela,
        forma_zapisa: forma_zapisa,
        naslov: autorskoDeloJSON.naslov[0],
        podaci_o_naslovu_prerada: napraviPodatkeONaslovuPrerada(autorskoDeloJSON.podaci_o_naslovu_prerada[0])
      }
    }
  }
  else {
    if (autorskoDeloJSON.podaci_o_naslovu_prerada === null || autorskoDeloJSON.podaci_o_naslovu_prerada === undefined) {
      return {
        stvoreno_u_radnom_odnosu: autorskoDeloJSON.$.stvoreno_u_radnom_odnosu == 'true',
        nacin_koriscenja: autorskoDeloJSON.$.nacin_koriscenja,
        vrsta_autorskog_dela: vrsta_dela,
        forma_zapisa: forma_zapisa,
        naslov: autorskoDeloJSON.naslov[0],
        alternativni_naslov: autorskoDeloJSON.alternativni_naslov[0]
      }
    } else {
      return {
        stvoreno_u_radnom_odnosu: autorskoDeloJSON.$.stvoreno_u_radnom_odnosu == 'true',
        nacin_koriscenja: autorskoDeloJSON.$.nacin_koriscenja,
        vrsta_autorskog_dela: vrsta_dela,
        forma_zapisa: forma_zapisa,
        naslov: autorskoDeloJSON.naslov[0],
        alternativni_naslov: autorskoDeloJSON.alternativni_naslov[0],
        podaci_o_naslovu_prerada: napraviPodatkeONaslovuPrerada(autorskoDeloJSON.podaci_o_naslovu_prerada[0])
      }
    }
  }
}
