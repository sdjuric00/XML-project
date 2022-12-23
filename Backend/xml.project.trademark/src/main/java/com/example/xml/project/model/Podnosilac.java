package com.example.xml.project.model;


import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="podnosilac", propOrder={"osoba"})
public class Podnosilac {

    @XmlAttribute(name="autor", required = true)
    private boolean autor;

    @XmlElements(value = {
        @XmlElement(name="fizicko_lice",
            type=FizickoLice.class, namespace = "http://ftn.ac.rs/opste"),
        @XmlElement(name="pravno_lice",
            type=PravnoLice.class, namespace = "http://ftn.ac.rs/opste")
    })
    private Object osoba;

    public boolean isAutor() {
        return autor;
    }

    public void setAutor(boolean autor) {
        this.autor = autor;
    }

    public Object getOsoba() {
        return osoba;
    }

    public void setOsoba(Object osoba) {
        this.osoba = osoba;
    }
}
