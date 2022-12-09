package com.example.xml.project.model.P1;

import com.example.xml.project.model.A1.Autor;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="zahtev_za_priznavanje_patenta",
        propOrder={"nazivi"},
        namespace = "http://ftn.ac.rs/a"
)
public class PodaciOPronalasku {
    @XmlElementWrapper(name="nazivi", namespace = "http://ftn.ac.rs/a")
    @XmlElement(name="naziv", namespace = "http://ftn.ac.rs/a")
    private List<Naziv> nazivi = new ArrayList<>();

    public List<Naziv> getNazivi() {
        return nazivi;
    }

    public void setNazivi(List<Naziv> nazivi) {
        this.nazivi = nazivi;
    }
}
