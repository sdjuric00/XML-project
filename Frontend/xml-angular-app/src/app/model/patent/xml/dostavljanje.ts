import { Adresa } from "../../opste/adresa/xml/adresa"

export interface Dostavljanje{
    "@":{
        elektronski: boolean,
        pismeno: boolean
    },
    "adresa": Adresa
}
