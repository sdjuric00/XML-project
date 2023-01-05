package com.example.xml.project.rdf;

import com.example.xml.project.model.A1.AnonimniAutor;
import com.example.xml.project.model.A1.Autor;
import com.example.xml.project.model.A1.ImenovaniAutor;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.Osoba;
import com.example.xml.project.util.AuthenticationUtilities;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static com.example.xml.project.rdf.RdfConstants.*;

@Component
public class AutorskoDeloExtractMetadata extends ExtractMetadata {
    public AutorskoDeloExtractMetadata() {
        super(AuthenticationUtilities.setUpPropertiesFuseki());
    }

    public void extract(ZahtevAutorskaDela zahtevAutorskaDela) throws IOException {
        Model model = createModel();
//        broj prijave, datum, referenca, email za punomocnika, email za podnosioca, naslov, vrsta dela, forma zapisa, prerada naslov

        Resource resource = model.createResource(AUTORSKO_DELO_NAMESPACE + zahtevAutorskaDela.getId());

        Property datum_prijema = model.createProperty(PREDICATE_NAMESPACE, "datum_prijema");
        Literal datum_prijema_lit = model.createLiteral(zahtevAutorskaDela.getDatum_podnosenja().toString());
        model.add(model.createStatement(resource, datum_prijema, datum_prijema_lit));

        Property referenca_na_resenje = model.createProperty(PREDICATE_NAMESPACE, "referenca_na_resenje");
        Literal referenca_na_resenje_lit = model.createLiteral(zahtevAutorskaDela.getReferenca_na_resenje());
        model.add(model.createStatement(resource, referenca_na_resenje, referenca_na_resenje_lit));

        Property broj_prijave = model.createProperty(PREDICATE_NAMESPACE, "broj_prijave");
        Literal broj_prijave_lit = model.createLiteral(zahtevAutorskaDela.getBroj_prijave());
        model.add(model.createStatement(resource, broj_prijave, broj_prijave_lit));

        Property podnosilac_email = model.createProperty(PREDICATE_NAMESPACE, "podnosilac_email");
        Osoba podnosilac = (Osoba) zahtevAutorskaDela.getPodnosilac().getOsoba();
        Literal podnosilac_email_lit = model.createLiteral(podnosilac.getKontakt().getEmail());
        model.add(model.createStatement(resource, podnosilac_email, podnosilac_email_lit));

        Property punomocnik_email = model.createProperty(PREDICATE_NAMESPACE, "punomocnik_email");
        Osoba punomocnik = (Osoba) zahtevAutorskaDela.getPunomocnik().getOsoba();
        Literal punomocnik_email_lit = model.createLiteral(punomocnik.getKontakt().getEmail());
        model.add(model.createStatement(resource, punomocnik_email, punomocnik_email_lit));

        List<Autor> autori = zahtevAutorskaDela.getAutori();
        for (int i = 0; i < autori.size(); i++) {
            Property autor = model.createProperty(PREDICATE_NAMESPACE, "autor_email");
            if(autori.get(i).getVrsta_autora() instanceof ImenovaniAutor) {
                Literal autor_lit = model.createLiteral(((Osoba) autori.get(i).getVrsta_autora()).getKontakt().getEmail());
                model.add(model.createStatement(resource, autor, autor_lit));
            }
        }

        Property naslov = model.createProperty(PREDICATE_NAMESPACE, "naslov_autorskog_dela");
        Literal naslov_lit = model.createLiteral(zahtevAutorskaDela.getAutorsko_delo().getNaslov());
        model.add(model.createStatement(resource, naslov, naslov_lit));

        Property forma_zapisa = model.createProperty(PREDICATE_NAMESPACE, "forma_zapisa_autorskog_dela");
        Literal forma_zapisa_lit = model.createLiteral(zahtevAutorskaDela.getAutorsko_delo().getForma_zapisa().getZapis().toString());
        model.add(model.createStatement(resource, forma_zapisa, forma_zapisa_lit));

        Property vrsta_dela = model.createProperty(PREDICATE_NAMESPACE, "vrsta_autorskog_dela");
        Literal vrsta_dela_lit = model.createLiteral(zahtevAutorskaDela.getAutorsko_delo().getVrsta_autorskog_dela().getVrsta().toString());
        model.add(model.createStatement(resource, vrsta_dela, vrsta_dela_lit));

        if (zahtevAutorskaDela.getAutorsko_delo().getPodaci_o_naslovu_prerada() != null && !zahtevAutorskaDela.getAutorsko_delo().getPodaci_o_naslovu_prerada().getNaslov().equals((""))) {
            Property naslov_prerada = model.createProperty(PREDICATE_NAMESPACE, "autorsko_delo_naslov_prerada");
            Literal naslov_prerada_lit = model.createLiteral(zahtevAutorskaDela.getAutorsko_delo().getPodaci_o_naslovu_prerada().getNaslov());
            model.add(model.createStatement(resource, naslov_prerada, naslov_prerada_lit));
        }

        super.modelWrite(model, AUTORSKO_DELO_NAMED_GRAPH_URI);
    }
}
