package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="autor", propOrder={"vrsta_autora"}, namespace = "http://ftn.ac.rs/a")
public class Autor {

    @XmlElements(value = {
        @XmlElement(name="anonimni_autor", type=AnonimniAutor.class, namespace = "http://ftn.ac.rs/a"),
        @XmlElement(name="imenovani_autor", type= ImenovaniAutor.class, namespace = "http://ftn.ac.rs/a")
    })
    private Object vrsta_autora;

    public Object getVrsta_autora() {
        return vrsta_autora;
    }

    public void setVrsta_autora(Object vrsta_autora) {
        this.vrsta_autora = vrsta_autora;
    }
}
