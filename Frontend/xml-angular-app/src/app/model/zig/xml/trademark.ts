import { ZnakComponent } from "src/app/component/zig/znak/znak.component";
import { Institucija } from "../../opste/institucija/xml/institucija";
import { PlaceneTakse } from "./placene-takse";
import { NicanskaKlasifikacija, Znak } from "./znak";
import { Podnosioci } from "../../patent/xml/podnosilac";
import { PunomocnikIPredstavnikZ } from "../../patent/xml/punomocnik-p";
import { PravoPrvenstva, PriloziZ } from "./prilozi-z";

export interface Trademark {
    zahtev_za_priznanje_ziga: {
        "@": {},
        "institucija": Institucija,
        "podnosioci": Podnosioci[],
        "punomocnik": PunomocnikIPredstavnikZ,
        "podaci_o_zajednickom_predstavniku": PunomocnikIPredstavnikZ,
        "znak": Znak,
        "nicanska_klasifikacija": NicanskaKlasifikacija,
        "pravo_prvenstva": PravoPrvenstva,
        "placene_takse": PlaceneTakse,
        "prilozi": PriloziZ
    }
}
