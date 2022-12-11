
import { FizickoLice } from "../opste/fizicko-lice"
import { PravnoLice } from "../opste/pravno-lice"

export interface PunomocnikP{
    "@":{
        za_zastupanje: boolean,
        za_prijem_pismeno: boolean
    }
    "pravno_lice"?: PravnoLice,
    "fizicko_lice"?: FizickoLice
}
