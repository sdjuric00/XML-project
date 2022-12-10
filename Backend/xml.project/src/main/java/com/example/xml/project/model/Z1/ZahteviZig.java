package com.example.xml.project.model.Z1;


import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name="zahtevi_z", namespace = "http://www.zig/zig")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="", propOrder={"lista_zahteva_z"})
public class ZahteviZig {

    @XmlElementWrapper(name="lista_zahteva_z")
    @XmlElement(name="zahtev_za_priznanje_ziga", namespace = "http://www.zig/zig")
    private List<ZahtevZig> lista_zahteva_z = new ArrayList<>();


    public List<ZahtevZig> getLista_zahteva_z() {
        return lista_zahteva_z;
    }

    public void setLista_zahteva_z(List<ZahtevZig> lista_zahteva_z) {
        this.lista_zahteva_z = lista_zahteva_z;
    }
}
