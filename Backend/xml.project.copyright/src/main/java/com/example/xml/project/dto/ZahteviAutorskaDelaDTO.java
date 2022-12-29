package com.example.xml.project.dto;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;

import javax.xml.bind.annotation.*;
import java.util.LinkedList;
import java.util.List;

@XmlRootElement(name = "zahtevi")
@XmlAccessorType(XmlAccessType.FIELD)
public class ZahteviAutorskaDelaDTO {
    @XmlElementWrapper(name="lista_zahteva_a")
    @XmlElement(name="zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela")
    private List<ZahtevAutorskaDelaOsnovneInformacijeDTO> lista_zahteva_a = new LinkedList<>();

    public ZahteviAutorskaDelaDTO(){}

    public List<ZahtevAutorskaDelaOsnovneInformacijeDTO> getLista_zahteva_a() {
        return lista_zahteva_a;
    }

    public void setLista_zahteva_a(List<ZahtevAutorskaDelaOsnovneInformacijeDTO> zahteviLista) {
        this.lista_zahteva_a = zahteviLista;
    }

    public void fromZahtevi(List<ZahtevAutorskaDela> zahteviAutorskaDela) {
        zahteviAutorskaDela.forEach(zahtevAutorskaDela -> lista_zahteva_a.add(new ZahtevAutorskaDelaOsnovneInformacijeDTO(zahtevAutorskaDela)));
    }
}
