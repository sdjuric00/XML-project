package com.example.xml.project.model.Z1;

import com.example.xml.project.model.Z1.enums.BrojKlaseEnum;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="broj", propOrder={"broj"}, namespace = "http://www.zig/zig")
public class OdabraneKategorije {

    @XmlValue
    private BrojKlaseEnum broj;

    public BrojKlaseEnum getBroj() {
        return broj;
    }

    public void setBroj(BrojKlaseEnum broj) {
        this.broj = broj;
    }
}
