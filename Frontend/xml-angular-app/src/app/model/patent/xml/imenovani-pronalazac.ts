import { PravnoLiceComponent } from "src/app/component/pravno-lice/pravno-lice.component";
import { FizickoLice } from "../../opste/fizicko-lice";
import { PravnoLice } from "../../opste/pravno-lice";

export interface ImenovaniPronalazac{
    "fizicko_lice"?: FizickoLice,
    "pravno_lice"?: PravnoLice
}
