import { X } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
declare const Xonomy: any
@Injectable({
  providedIn: 'root'
})
export class XonomyService {

  constructor() { }

  public patentSpecification = {
    elements: {
        zahtev_za_priznavanje_patenta: {
          expanded: true,
          collapsed: true,
        menu: [
        //   {
        //   caption: 'Dodaj <institucija>',
        //   action: Xonomy.newElementChild,
        //   actionParameter: '<institucija><opste:naziv>Zavod za intelektulanu svojinu</opste:naziv><opste:adresa><opste:grad>Beograd</opste:grad><opste:ulica>Kneginje Ljubice</opste:ulica><opste:broj>5</opste:broj></opste:adresa></institucija>',
        //   hideIf: function (jsElement) {
        //     return jsElement.hasChildElement("institucija")
        //   },
        // },
        {
          caption: 'Dodaj <podaci_o_pronalasku>',
          action: Xonomy.newElementChild,
          actionParameter: '<podaci_o_pronalasku></podaci_o_pronalasku>',
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("podaci_o_pronalasku")
          },
        },
        {
            caption: 'Dodaj <podnosilac>',
          action: Xonomy.newElementChild,
          actionParameter: '<podnosilac></podnosilac>',
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("podnosilac")
        }
    },
        {
          caption: 'Dodaj <pronalazac>',
          action: Xonomy.newElementChild,
          actionParameter: '<pronalazac></pronalazac>',
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("pronalazac")
        }
    },
    {
        caption: 'Dodaj <punomocnik>',
        action: Xonomy.newElementChild,
        actionParameter: '<punomocnik></punomocnik>',
        hideIf: function (jsElement) {
          return jsElement.hasChildElement("punomocnik")
      }
  }, 
  {
    caption: 'Dodaj <dostavljanje>',
    action: Xonomy.newElementChild,
    actionParameter: '<dostavljanje></dostavljanje>',
    hideIf: function (jsElement) {
      return jsElement.hasChildElement("dostavljanje")
  }
}, 
{
    caption: 'Dodaj <zahtev_za_priznanje_prava_iz_ranijih_prijava>',
    action: Xonomy.newElementChild,
    actionParameter: '<zahtev_za_priznanje_prava_iz_ranijih_prijava></zahtev_za_priznanje_prava_iz_ranijih_prijava>',
    hideIf: function (jsElement) {
      return jsElement.hasChildElement("zahtev_za_priznanje_prava_iz_ranijih_prijava")
  }
}, 

{
  caption: 'Dodaj @dopunska_prijava',
  action: Xonomy.newAttribute,
  actionParameter: { name: 'dopunska_prijava', value: false },
  hideIf: function (jsElement) {
    return jsElement.hasAttribute("dopunska_prijava");
  }
}
],
    attributes: {
        dopunska_prijava:{
            asker: Xonomy.askString
        }
      }
    },
    podaci_o_pronalasku:{
        mustBeBefore:['podnosilac', 'pronalazac', 'punomocnik', 'dostavljanje', 'zahtev_za_priznanje_prava_iz_ranijih_prijava' ],
        menu: [{
        caption: 'Dodaj <naziv_patenta>',
        action: Xonomy.newElementChild,
        actionParameter: "<naziv_patenta></naziv_patenta>",
        hideIf: function (jsElement) {
          return jsElement.hasChildElement("naziv_patenta");
        }
      }]
    },
    naziv_patenta:{
      menu:[{
        caption: 'Dodaj @jezik',
        action: Xonomy.newAttribute,
        actionParameter: { name: 'jezik', value: "" },
        hideIf: function (jsElement) {
        return jsElement.hasAttribute("jezik");
    }
      }],
      attributes: {
        jezik:{
            asker: Xonomy.askString
        }
      },
      hasText: true,
        oneliner: true,
        asker: Xonomy.askString,
    },
    podnosilac:{
      mustBeBefore:['pronalazac', 'punomocnik', 'dostavljanje', 'zahtev_za_priznanje_prava_iz_ranijih_prijava' ],
      menu:[{
        caption: 'Dodaj @autor',
        action: Xonomy.newAttribute,
        actionParameter: { name: 'autor', value: "false" },
        hideIf: function (jsElement) {
        return jsElement.hasAttribute("autor");
    }
      },
    {
      caption: 'Dodaj <fizicko_lice>',
      action: Xonomy.newElementChild,
      actionParameter: '<fizicko_lice></fizicko_lice>',
      hideIf: function (jsElement) {
        return jsElement.hasChildElement("fizicko_lice") || jsElement.hasChildElement("pravno_lice")
    }
  }, 
  {
    caption: 'Dodaj <pravno_lice>',
    action: Xonomy.newElementChild,
    actionParameter: '<pravno_lice></pravno_lice>',
    hideIf: function (jsElement) {
      return jsElement.hasChildElement("pravno_lice") || jsElement.hasChildElement("fizicko_lice")
  }
}, 
    
    ],
    attributes: {
      autor:{
          asker: Xonomy.askString
      }
    },
    },
pravno_lice:{
  menu:[{
    caption: 'Dodaj naziv',
    action: Xonomy.newElementChild,
    actionParameter: '<naziv></naziv>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("naziv");
    }
  },
  {
    caption: 'Dodaj pib',
    action: Xonomy.newElementChild,
    actionParameter: '<pib></pib>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("pib");
    }
  },
  {
    caption: 'Dodaj registarski_broj',
    action: Xonomy.newElementChild,
    actionParameter: '<registarski_broj></registarski_broj>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("registarski_broj");
    }
  },
  {
    caption: 'Dodaj kontakt',
    action: Xonomy.newElementChild,
    actionParameter: '<kontakt></kontakt>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("kontakt");
    }
  },
  {
    caption: 'Dodaj adresa',
    action: Xonomy.newElementChild,
    actionParameter: '<adresa></adresa>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("adresa");
    }
  },
]
},
fizicko_lice:{
  menu:[{
    caption: 'Dodaj ime',
    action: Xonomy.newElementChild,
    actionParameter: '<ime></ime>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("ime");
    }
  },
  {
    caption: 'Dodaj prezime',
    action: Xonomy.newElementChild,
    actionParameter: '<prezime></prezime>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("prezime");
    }
  },
  {
    caption: 'Dodaj jmbg',
    action: Xonomy.newElementChild,
    actionParameter: '<jmbg></jmbg>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("jmbg");
    }
  },
  {
    caption: 'Dodaj kontakt',
    action: Xonomy.newElementChild,
    actionParameter: '<kontakt></kontakt>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("kontakt");
    }
  },
  {
    caption: 'Dodaj adresa',
    action: Xonomy.newElementChild,
    actionParameter: '<adresa></adresa>',
    hideIf: function (jsElement) {
      return jsElement.hasAttribute("adresa");
    }
  }
]
},
pib:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
naziv:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
registarski_broj:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
ime:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
prezime:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
jmbg:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
kontakt:{
  menu:[
    {
      caption: 'Dodaj email',
      action: Xonomy.newElementChild,
      actionParameter: '<email></email>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("email");
      }
    },
    {
      caption: 'Dodaj telefon',
      action: Xonomy.newElementChild,
      actionParameter: '<telefon></telefon>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("telefon");
      }
    },
    {
      caption: 'Dodaj fax',
      action: Xonomy.newElementChild,
      actionParameter: '<fax></fax>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("fax");
      }
    },
  ]
},
adresa:{
  menu:[
    {
      caption: 'Dodaj grad',
      action: Xonomy.newElementChild,
      actionParameter: '<grad></grad>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("grad");
      }
    },
    {
      caption: 'Dodaj ulica',
      action: Xonomy.newElementChild,
      actionParameter: '<ulica></ulica>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("ulica");
      }
    },
    {
      caption: 'Dodaj broj',
      action: Xonomy.newElementChild,
      actionParameter: '<broj></broj>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("broj");
      }
    },
    {
      caption: 'Dodaj postanski_broj',
      action: Xonomy.newElementChild,
      actionParameter: '<postanski_broj></postanski_broj>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("postanski_broj");
      }
    },
    {
      caption: 'Dodaj drzava',
      action: Xonomy.newElementChild,
      actionParameter: '<drzava></drzava>',
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("drzava");
      }
    },
  ]
},
email:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
telefon:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
fax:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
ulica:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
broj:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
grad:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
drzava:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
postanski_broj:{
  hasText: true,
  oneliner: true,
  asker: Xonomy.askString,
},
pronalazac:{
  mustBeBefore:['punomocnik', 'dostavljanje', 'zahtev_za_priznanje_prava_iz_ranijih_prijava' ],
  menu:[
    {
      caption: 'Dodaj @anonimno',
      action: Xonomy.newAttribute,
      actionParameter: { name: 'anonimno', value: false },
      hideIf: function (jsElement) {
        return jsElement.hasAttribute("anonimno");
      }
    },{
    caption: 'Dodaj <imenovani_pronalazac>',
    action: Xonomy.newElementChild,
    actionParameter: '<imenovani_pronalazac></imenovani_pronalazac>',
    hideIf: function (jsElement) {
      return jsElement.hasChildElement("imenovani_pronalazac") || jsElement.hasChildElement("anonimni_pronalazac")
  }},
  {
    caption: 'Dodaj <anonimni_pronalazac>',
    action: Xonomy.newElementChild,
    actionParameter: '<anonimni_pronalazac></anonimni_pronalazac>',
    hideIf: function (jsElement) {
      return jsElement.hasChildElement("anonimni_pronalazac") || jsElement.hasChildElement("imenovani_pronalazac")
  }}],
  attributes: {
    anonimno:{
        asker: Xonomy.askString
    }
  },
},
imenovani_pronalazac:{
  menu:[{
    caption: 'Dodaj <fizicko_lice>',
    action: Xonomy.newElementChild,
    actionParameter: '<fizicko_lice></fizicko_lice>',
    hideIf: function (jsElement) {
      return jsElement.hasChildElement("fizicko_lice")
  }
}, 
{
  caption: 'Dodaj <pravno_lice>',
  action: Xonomy.newElementChild,
  actionParameter: '<pravno_lice></pravno_lice>',
  hideIf: function (jsElement) {
    return jsElement.hasChildElement("pravno_lice")
}
}]
},
punomocnik:{
  mustBeBefore:['dostavljanje', 'zahtev_za_priznanje_prava_iz_ranijih_prijava' ],
  menu:[{
    caption: 'Dodaj @za_zastupanje',
    action: Xonomy.newAttribute,
    actionParameter: { name: 'za_zastupanje', value: "false" },
    hideIf: function (jsElement) {
    return jsElement.hasAttribute("za_zastupanje");
}
  },
  {
    caption: 'Dodaj @za_prijem_pismeno',
    action: Xonomy.newAttribute,
    actionParameter: { name: 'za_prijem_pismeno', value: "false" },
    hideIf: function (jsElement) {
    return jsElement.hasAttribute("za_prijem_pismeno");
}
  },
{
  caption: 'Dodaj <fizicko_lice>',
  action: Xonomy.newElementChild,
  actionParameter: '<fizicko_lice></fizicko_lice>',
  hideIf: function (jsElement) {
    return jsElement.hasChildElement("fizicko_lice") || jsElement.hasChildElement("pravno_lice")
}
}, 
{
caption: 'Dodaj <pravno_lice>',
action: Xonomy.newElementChild,
actionParameter: '<pravno_lice></pravno_lice>',
hideIf: function (jsElement) {
  return jsElement.hasChildElement("pravno_lice") || jsElement.hasChildElement("fizicko_lice")
}
}],
attributes: {
  za_prijem_pismeno:{
      asker: Xonomy.askString
  },
  za_zastupanje:{
    asker: Xonomy.askString
}
}, 
},
dostavljanje:{
  mustBeBefore:['zahtev_za_priznanje_prava_iz_ranijih_prijava' ],
  menu:[{
    caption: 'Dodaj @elektronski',
    action: Xonomy.newAttribute,
    actionParameter: { name: 'elektronski', value: "false" },
    hideIf: function (jsElement) {
    return jsElement.hasAttribute("elektronski");
  }
  },
  {
    caption: 'Dodaj @pismeno',
    action: Xonomy.newAttribute,
    actionParameter: { name: 'pismeno', value: "false" },
    hideIf: function (jsElement) {
    return jsElement.hasAttribute("pismeno");
  }
  },
  {
  caption: 'Dodaj <adresa>',
  action: Xonomy.newElementChild,
  actionParameter: '<adresa></adresa>',
  hideIf: function (jsElement) {
    return jsElement.hasChildElement("adresa")
  }
  } ],
  attributes: {
    elektronski:{
        asker: Xonomy.askString
    },
    pismeno:{
      asker: Xonomy.askString
  },
  },

    },
  zahtev_za_priznanje_prava_iz_ranijih_prijava:{
      menu:[
        {
          caption: 'Dodaj <prijava>',
          action: Xonomy.newElementChild,
          actionParameter: '<prijava></prijava>',
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("prijava")
        }
      }
      ]
    },
    prijava:{
      menu:[
        {
          caption: 'Dodaj <datum_podnosenja_prijave>',
          action: Xonomy.newElementChild,
          actionParameter: '<datum_podnosenja_prijave></datum_podnosenja_prijave>',
          hideIf: function (jsElement) {
            return jsElement.hasChildElement("datum_podnosenja_prijave")
        }
      },
      {
        caption: 'Dodaj <broj_ranije_prijave>',
        action: Xonomy.newElementChild,
        actionParameter: '<broj_ranije_prijave></broj_ranije_prijave>',
        hideIf: function (jsElement) {
          return jsElement.hasChildElement("broj_ranije_prijave")
      }
    },
    {
      caption: 'Dodaj <dvoslovna_oznaka_drzave>',
      action: Xonomy.newElementChild,
      actionParameter: '<dvoslovna_oznaka_drzave></dvoslovna_oznaka_drzave>',
      hideIf: function (jsElement) {
        return jsElement.hasChildElement("dvoslovna_oznaka_drzave")
    }
  }
      ]
    },
    dvoslovna_oznaka_drzave:{
      hasText: true,
      oneliner: true,
      asker: Xonomy.askString,
    },
    broj_ranije_prijave:{
      hasText: true,
      oneliner: true,
      asker: Xonomy.askString,
    },
    datum_podnosenja_prijave:{
      hasText: true,
      oneliner: true,
      asker: Xonomy.askString,
    }
  }
}
}