import { ImenovaniPronalazac } from "./imenovani-pronalazac"

export interface PronalazacP{
    "@": {anoniman: boolean}
    "imenovani_pronalazac"?: ImenovaniPronalazac,
    "anonimni_pronalazac"?: string
}