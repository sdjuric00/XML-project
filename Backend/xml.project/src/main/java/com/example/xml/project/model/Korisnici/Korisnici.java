package com.example.xml.project.model.Korisnici;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"lista_korisnika"})
public class Korisnici {

    @XmlElementWrapper(name="lista_korisnika")
    @XmlElement(name="korisnik")
    private List<Korisnik> lista_korisnika = new ArrayList<>();

    public List<Korisnik> getLista_korisnika() {
        return lista_korisnika;
    }

    public void setLista_korisnika(List<Korisnik> lista_korisnika) {
        this.lista_korisnika = lista_korisnika;
    }
}
