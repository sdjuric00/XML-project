package com.example.xml.project.model.P1;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"lista_zahteva_p"})
public class ZahteviPatenti {

    @XmlElementWrapper(name="lista_zahteva_p")
    @XmlElement(name="zahtev_za_priznavanje_patenta", namespace = "http://www.patent/patent")
    private List<ZahtevPatent> lista_zahteva_p = new ArrayList<>();


    public List<ZahtevPatent> getLista_zahteva_p() {
        return lista_zahteva_p;
    }

    public void setLista_zahteva_p(List<ZahtevPatent> lista_zahteva_p) {
        this.lista_zahteva_p = lista_zahteva_p;
    }
}
