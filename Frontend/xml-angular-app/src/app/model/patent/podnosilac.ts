import { FizickoLiceComponent } from "src/app/component/fizicko-lice/fizicko-lice.component"
import { PravnoLiceComponent } from "src/app/component/pravno-lice/pravno-lice.component";
import { FizickoLice } from "../opste/fizicko-lice";
import { PravnoLice } from "../opste/pravno-lice";

export interface Podnosilac{
    "opste:fizicko-lice"?: FizickoLice | null;
    "opste:pravno-lice"?: PravnoLice | null;
    "@":{autor: boolean | null | undefined}
}