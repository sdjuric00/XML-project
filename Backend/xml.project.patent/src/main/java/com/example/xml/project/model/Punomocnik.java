package com.example.xml.project.model;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="punomocnik", propOrder={"osoba"})
public class Punomocnik {

    @XmlElements(value = {
        @XmlElement(name="fizicko_lice",
            type=FizickoLice.class, namespace = "http://www.patent/patent"),
        @XmlElement(name="pravno_lice",
            type=PravnoLice.class, namespace = "http://www.patent/patent")
    })
    private Object osoba;

    public Object getOsoba() {
        return osoba;
    }

    public void setOsoba(Object osoba) {
        this.osoba = osoba;
    }
}

