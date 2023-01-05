package com.example.xml.project.rdf;

import com.example.xml.project.model.Osoba;
import com.example.xml.project.model.P1.ImenovaniPronalazac;
import com.example.xml.project.model.P1.Prijava;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.util.AuthenticationUtilities;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static com.example.xml.project.rdf.RdfConstants.PATENT_NAMED_GRAPH_URI;
import static com.example.xml.project.rdf.RdfConstants.PATENT_NAMESPACE_PATH;

@Component
public class PatentExtractMetadata extends ExtractMetadata {
    public PatentExtractMetadata() {
        super(AuthenticationUtilities.setUpPropertiesFuseki());
    }

    public void extract(ZahtevPatent zahtevPatent) throws IOException {
        Model model = createModel();

        Resource resource = model.createResource(PATENT_NAMESPACE_PATH + zahtevPatent.getId());

        Property datum_prijema = model.createProperty(PREDICATE_NAMESPACE, "datum_prijema");
        Literal datum_prijema_lit = model.createLiteral(zahtevPatent.getDatum_prijema().toString());
        model.add(model.createStatement(resource, datum_prijema, datum_prijema_lit));

        Property referenca_na_resenje = model.createProperty(PREDICATE_NAMESPACE, "referenca_na_resenje");
        Literal referenca_na_resenje_lit = model.createLiteral(zahtevPatent.getReferenca_na_resenje());
        model.add(model.createStatement(resource, referenca_na_resenje, referenca_na_resenje_lit));

        Property broj_prijave = model.createProperty(PREDICATE_NAMESPACE, "broj_prijave");
        Literal broj_prijave_lit = model.createLiteral(zahtevPatent.getBroj_prijave());
        model.add(model.createStatement(resource, broj_prijave, broj_prijave_lit));

        Property naziv_srpski = model.createProperty(PREDICATE_NAMESPACE, "naziv_patenta_srpski");
        Literal naziv_srpski_lit = model.createLiteral(zahtevPatent.getPodaci_o_pronalasku().get(0).getNaziv_patenta());
        model.add(model.createStatement(resource, naziv_srpski, naziv_srpski_lit));

        Property naziv_engleski = model.createProperty(PREDICATE_NAMESPACE, "naziv_patenta_engleski");
        Literal naziv_engleski_lit = model.createLiteral(zahtevPatent.getPodaci_o_pronalasku().get(0).getNaziv_patenta());
        model.add(model.createStatement(resource, naziv_engleski, naziv_engleski_lit));

        Property podnosilac_email = model.createProperty(PREDICATE_NAMESPACE, "podnosilac_email");
        Osoba podnosilac = (Osoba) zahtevPatent.getPodnosilac().getOsoba();
        Literal podnosilac_email_lit = model.createLiteral(podnosilac.getKontakt().getEmail());
        model.add(model.createStatement(resource, podnosilac_email, podnosilac_email_lit));

        Property punomocnik_email = model.createProperty(PREDICATE_NAMESPACE, "punomocnik_email");
        Osoba punomocnik = (Osoba) zahtevPatent.getPunomocnik().getPronalazac_osoba();
        Literal punomocnik_email_lit = model.createLiteral(punomocnik.getKontakt().getEmail());
        model.add(model.createStatement(resource, punomocnik_email, punomocnik_email_lit));

        if (!zahtevPatent.getPronalazac().isAnonimno()) {
            Property pronalazac_email = model.createProperty(PREDICATE_NAMESPACE, "pronalazac_email");
            ImenovaniPronalazac pronalazac = (ImenovaniPronalazac) zahtevPatent.getPronalazac().getPronalazac_osoba();
            Literal pronalazac_email_lit = model.createLiteral(((Osoba) pronalazac.getOsoba()).getKontakt().getEmail());
            model.add(model.createStatement(resource, pronalazac_email, pronalazac_email_lit));
        }
        List<Prijava> ranije_prijave = zahtevPatent.getZahtev_za_priznanje_prava_iz_ranijih_prijava();
        if (ranije_prijave.size() != 0) {
            for (int i = 0; i < ranije_prijave.size(); i++) {
                Property broj_ranije_prijave = model.createProperty(PREDICATE_NAMESPACE, "broj_ranije_prijave");
                Literal broj_ranije_prijave_lit = model.createLiteral(ranije_prijave.get(i).getBroj_ranije_prijave());
                model.add(model.createStatement(resource, broj_ranije_prijave, broj_ranije_prijave_lit));
            }
        }
        super.modelWrite(model, PATENT_NAMED_GRAPH_URI);
    }
}
