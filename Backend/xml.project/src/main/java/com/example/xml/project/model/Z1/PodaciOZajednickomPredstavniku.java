package com.example.xml.project.model.Z1;

import com.example.xml.project.model.FizickoLice;
import com.example.xml.project.model.PravnoLice;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="podaci_o_zajednickom_predstavniku", propOrder={"osoba"}, namespace = "http://www.zig/zig")
public class PodaciOZajednickomPredstavniku {

    @XmlElements(value = {
            @XmlElement(name = "fizicko_lice",
                    type = FizickoLice.class, namespace = "http://www.zig/zig"),
            @XmlElement(name = "pravno_lice",
                    type = PravnoLice.class, namespace = "http://www.zig/zig")
    })
    private Object osoba;

    public Object getOsoba() {
        return osoba;
    }

    public void setOsoba(Object osoba) {
        this.osoba = osoba;
    }
}
