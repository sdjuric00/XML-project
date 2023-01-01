

export interface OsnovnaPretraga{
    pretraga: {
        "parametriPretrage": ParametriPretrage;
    }
}

export interface ParametriPretrage{
    parametar: ParametarPretrage[];
}

export interface ParametarPretrage{
    "#": string;
}
