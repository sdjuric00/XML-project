package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="zahtevi_a", namespace = "http://ftn.ac.rs/a")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"lista_zahteva_a"})
public class ZahteviAutorskaDela {

    @XmlElementWrapper(name="lista_zahteva_a")
    @XmlElement(name="zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela", namespace = "http://ftn.ac.rs/a")
    private List<ZahtevAutorskaDela> lista_zahteva_a = new ArrayList<>();


    public List<ZahtevAutorskaDela> getLista_zahteva_a() {
        return lista_zahteva_a;
    }

    public void setLista_zahteva_a(List<ZahtevAutorskaDela> lista_zahteva_a) {
        this.lista_zahteva_a = lista_zahteva_a;
    }
}
