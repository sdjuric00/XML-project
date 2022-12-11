
export interface Znak {
    "@":{
        pismo: string
    }
    "vrsta_znaka": VrstaZnaka;
    "boje": Boja[];
    "transliteracija_znaka"?: string;
    "prevod"?: string;
    "opis": string;
}

export interface VrstaZnaka {
    "vrsta_enum"?: string,
    "vrsta_custom"?: string
}

export interface Boja {
    "boja": string;
}

export interface NicanskaKlasifikacija {
    "broj": string;
}

