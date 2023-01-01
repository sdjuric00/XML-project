package com.example.xml.project.dto;

import com.example.xml.project.model.P1.ZahtevPatent;

import javax.xml.bind.annotation.*;
import java.util.LinkedList;
import java.util.List;

@XmlRootElement(name = "zahtevi")
@XmlAccessorType(XmlAccessType.FIELD)
public class ZahteviPatentiDTO {
    @XmlElementWrapper(name="lista_zahteva_p")
    @XmlElement(name="zahtev_za_priznavanje_patenta")
    private List<ZahtevPatentOsnovneInformacijeDTO> lista_zahteva_p = new LinkedList<>();

    public ZahteviPatentiDTO(){}

    public List<ZahtevPatentOsnovneInformacijeDTO> getLista_zahteva_p() {
        return lista_zahteva_p;
    }

    public void setLista_zahteva_p(List<ZahtevPatentOsnovneInformacijeDTO> zahteviLista) {
        this.lista_zahteva_p = zahteviLista;
    }

    public void fromZahtevi(List<ZahtevPatent> zahteviPatenti) {
        zahteviPatenti.forEach(zahtevPatent -> lista_zahteva_p.add(new ZahtevPatentOsnovneInformacijeDTO(zahtevPatent)));
    }
}
