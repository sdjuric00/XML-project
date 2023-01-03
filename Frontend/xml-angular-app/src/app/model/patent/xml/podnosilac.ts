import { FizickoLice } from "../../opste/fizicko-lice";
import { PravnoLice } from "../../opste/pravno-lice";

export interface Podnosilac{
    "opste:fizicko_lice"?: FizickoLice | null;
    "opste:pravno_lice"?: PravnoLice | null;
    "@":{autor: boolean | string | null | undefined}
}

export interface Podnosioci {
    "podnosilac": Podnosilac[]
}
