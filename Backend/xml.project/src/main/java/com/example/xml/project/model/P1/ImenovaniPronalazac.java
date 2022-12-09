package com.example.xml.project.model.P1;

import com.example.xml.project.model.FizickoLice;
import com.example.xml.project.model.PravnoLice;

import javax.xml.bind.annotation.*;
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="imenovani_pronalazac", propOrder={"osoba"})
public class ImenovaniPronalazac {
        @XmlElements(value = {
                @XmlElement(name="fizicko_lice",
                        type= FizickoLice.class, namespace = "http://www.patent/patent"),
                @XmlElement(name="pravno_lice",
                        type= PravnoLice.class, namespace = "http://www.patent/patent")
        })
        private Object osoba;

        public Object getOsoba() {
                return osoba;
        }

        public void setOsoba(Object osoba) {
                this.osoba = osoba;
        }
}
