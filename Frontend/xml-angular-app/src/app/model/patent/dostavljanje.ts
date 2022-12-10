import { Adresa } from "../opste/adresa"

export interface Dostavljanje{
    "@":{
        elektronski: boolean,
        pismeno: boolean
    },
    "adresa": Adresa
}