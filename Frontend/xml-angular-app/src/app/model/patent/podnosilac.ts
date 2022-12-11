import { FizickoLice } from "../opste/fizicko-lice";
import { PravnoLice } from "../opste/pravno-lice";

export interface Podnosilac {
    "opste:fizicko_lice"?: FizickoLice | null;
    "opste:pravno-lice"?: PravnoLice | null;
    "@":{autor: boolean | null | undefined}
}
