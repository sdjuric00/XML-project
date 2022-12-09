package com.example.xml.project.model.Z1;

import com.example.xml.project.model.Z1.enums.VrstaZnakaEnum;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="vrsta_znaka", propOrder={"vrsta"}, namespace = "http://www.zig/zig")
public class VrstaZnaka {

    @XmlElements(value = {
            @XmlElement(name="vrsta_enum",
                    type= VrstaZnakaEnum.class, namespace = "http://www.zig/zig"),
            @XmlElement(name="vrsta_custom",
                    type=String.class, namespace = "http://www.zig/zig")
    })
    private Object vrsta;

    public Object getVrsta() {
        return vrsta;
    }

    public void setVrsta(Object vrsta) {
        this.vrsta = vrsta;
    }
}
