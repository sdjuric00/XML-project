package com.example.xml.project.model.Korisnici;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="korisnici", namespace = "http://www.korisnici/korisnici")
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

    //    @XmlElementWrapper(name="lista_korisnika", required=false)
//    @XmlElement(name="korisnik", required=false)
//    private List<Korisnik> lista_korisnika = new ArrayList<Korisnik>();
//
//    public List<Korisnik> getKorisnici() {
//        return lista_korisnika;
//    }
//
//    public void setKorisnici(List<Korisnik> korisnici) {
//        this.lista_korisnika = korisnici;
//    }
//
//    @Override
//    public String toString() {
//        return "Korisnici{" +
//            "korisnici=" + lista_korisnika +
//            '}';
//    }
}
