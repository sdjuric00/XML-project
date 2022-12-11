
export interface PriloziZ {
    "@": {
        "primerak_znaka_putanja": string;
        "punomocje_putanja"?: string;
        "opsti_akt_o_kolektivnom_zigu_garancije_putanja": string;
        "dokaz_o_pravu_prvenstva_putanja"?: string;
        "dokaz_o_uplati_takse_putanja": string;
    }
    "spisak_roba_i_usluga": Robe;
    "generalno_punomocje_ranije_prilozeno": boolean;
    "punomocje_ce_biti_naknadno_dostavljeno": boolean;
}

export interface Robe {
    "@"?: {},
    "roba": Roba[];
}

export interface Roba {
    "naziv": string;
}

export interface PravoPrvenstva {
    "@": {
        "zatrazeno": string;
    }
    "osnov"?: string;
}