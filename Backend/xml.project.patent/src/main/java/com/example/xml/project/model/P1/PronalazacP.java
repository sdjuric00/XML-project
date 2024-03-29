package com.example.xml.project.model.P1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="pronalazac",
        propOrder={"pronalazac_osoba"}
)
public class PronalazacP {
    @XmlAttribute(name="anonimno", required = true)
    private boolean anonimno;
    @XmlElements(value = {
            @XmlElement(name="anonimni_pronalazac", type=String.class, namespace = "http://www.patent/patent"),
            @XmlElement(name="imenovani_pronalazac", type=ImenovaniPronalazac.class, namespace = "http://www.patent/patent")
    })
    private Object pronalazac_osoba;

    public Object getPronalazac_osoba() {
        return pronalazac_osoba;
    }

    public void setPronalazac_osoba(Object pronalazac_osoba) {
        this.pronalazac_osoba = pronalazac_osoba;
    }

    public boolean isAnonimno() {
        return anonimno;
    }

    public void setAnonimno(boolean anonimno) {
        this.anonimno = anonimno;
    }
}
