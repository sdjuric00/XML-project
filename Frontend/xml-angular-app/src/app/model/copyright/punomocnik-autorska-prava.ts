
import { FizickoLice } from "../opste/fizicko-lice"
import { PravnoLice } from "../opste/pravno-lice"

export interface PunomocnikAutorskaPrava {
  "opste:pravno_lice"?: PravnoLice,
  "opste:fizicko_lice"?: FizickoLice
}
