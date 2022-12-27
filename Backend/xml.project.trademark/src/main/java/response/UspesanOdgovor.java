package response;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UspesanOdgovor {

    @XmlAttribute
    private boolean odgovor;

    public UspesanOdgovor() {

    }

    public UspesanOdgovor(final boolean odgovor) {
        this.odgovor = odgovor;
    }

    public boolean isOdgovor() {
        return odgovor;
    }
}
