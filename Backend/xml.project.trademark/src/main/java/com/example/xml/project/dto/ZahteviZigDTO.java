package com.example.xml.project.dto;

import com.example.xml.project.model.Z1.ZahtevZig;

import javax.xml.bind.annotation.*;
import java.util.LinkedList;
import java.util.List;

@XmlRootElement(name = "zahtevi")
@XmlAccessorType(XmlAccessType.FIELD)
public class ZahteviZigDTO {
    @XmlElementWrapper(name="lista_zahteva_z")
    @XmlElement(name="zahtev_za_priznanje_ziga")
    private List<ZahtevZigOsnovneInformacijeDTO> lista_zahteva_z = new LinkedList<>();

    public ZahteviZigDTO(){}

    public List<ZahtevZigOsnovneInformacijeDTO> getLista_zahteva_a() {
        return lista_zahteva_z;
    }

    public void setLista_zahteva_a(List<ZahtevZigOsnovneInformacijeDTO> zahteviLista) {
        this.lista_zahteva_z = zahteviLista;
    }

    public void fromZahtevi(List<ZahtevZig> zahteviZigovi) {
        zahteviZigovi.forEach(zahtevZig -> lista_zahteva_z.add(new ZahtevZigOsnovneInformacijeDTO(zahtevZig)));
    }
}
