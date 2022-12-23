package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="vrsta_autorskog_dela", propOrder={"vrsta"}, namespace = "http://ftn.ac.rs/a")
public class VrstaAutorskogDela {

    @XmlElements(value = {
        @XmlElement(name="vrsta_enum",
            type=VrstaAutorskogDelaEnum.class, namespace = "http://ftn.ac.rs/a"),
        @XmlElement(name="vrsta_custom",
            type=String.class,  namespace = "http://ftn.ac.rs/a")
    })
    private Object vrsta;

    public Object getVrsta() {
        return vrsta;
    }

    public void setVrsta(Object vrsta) {
        this.vrsta = vrsta;
    }
}


