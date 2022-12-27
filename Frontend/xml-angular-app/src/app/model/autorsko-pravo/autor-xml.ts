import {ImenovanAutor} from "./imenovan-autor";

export interface AutorXml {
  "anonimni_autor"?: string,
  "imenovani_autor"?: ImenovanAutor
}

export interface AutorInList {
  "autor" : AutorXml
}
