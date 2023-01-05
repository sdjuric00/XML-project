export interface NaprednaPretraga{
    napredna_pretraga: {
        "parametriPretrage":ParametriNaprednePretrage
    }
}

export interface ParametriNaprednePretrage{
    par: ParNaprednaPretraga[]
}

export interface ParNaprednaPretraga{
    naziv_elementa: string,
    vrednost: string,
    operator: string
}