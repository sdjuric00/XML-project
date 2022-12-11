
import { Institucija } from "../opste/institucija"
import { Dostavljanje } from "./dostavljanje"
import { Naziv } from "./naziv"
import { PodaciOPronalasku } from "./podaci_o_pronalasku"
import { Podnosilac } from "./podnosilac"
import { Prijava } from "./prijava"
import { PronalazacP } from "./pronalazac-p"
import { PunomocnikP } from "./punomocnik-p"

export interface Patent{
    zahtev_za_priznavanje_patenta: {
        "@":{},
        "institucija": Institucija,
        "podaci_o_pronalasku": PodaciOPronalasku,
        "podnosilac": Podnosilac,
        "pronalazac": PronalazacP,
        "punomocnik": PunomocnikP,
        "dostavljanje": Dostavljanje,
        "zahtev_za_priznanje_prava_iz_ranijih_prijava": Prijava[]
    }
}
