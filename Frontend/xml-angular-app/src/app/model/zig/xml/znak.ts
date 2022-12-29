
export interface Znak {
    "@":{
        pismo: string
    }
    "vrsta_znaka": VrstaZnaka;
    "boje": Boje;
    "transliteracija_znaka"?: string;
    "prevod"?: string;
    "opis": string;
}

export interface VrstaZnaka {
    "vrsta_enum"?: string,
    "vrsta_custom"?: string
}

export interface Boje {
    "@"?: {},
    "boja": Boja[];
}

export interface Boja {
    "naziv": string,
}

export interface NicanskaKlasifikacija {
    "broj": string;
}

