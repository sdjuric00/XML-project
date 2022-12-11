import { ImenovaniPronalazac } from "./imenovani-pronalazac"

export interface PronalazacP{
    "@": {anonimno: boolean}
    "imenovani_pronalazac"?: ImenovaniPronalazac,
    "anonimni_pronalazac"?: string
}