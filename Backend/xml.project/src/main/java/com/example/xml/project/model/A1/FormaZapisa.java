package com.example.xml.project.model.A1;

import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="forma_zapisa", propOrder={"zapis"}, namespace = "http://ftn.ac.rs/a")
public class FormaZapisa {

    @XmlElements(value = {
        @XmlElement(name="vrsta_enum",
            type=FormaZapisaEnum.class, namespace = "http://ftn.ac.rs/a"),
        @XmlElement(name="vrsta_custom",
            type=String.class, namespace = "http://ftn.ac.rs/a")
    })
    private Object zapis;
}
