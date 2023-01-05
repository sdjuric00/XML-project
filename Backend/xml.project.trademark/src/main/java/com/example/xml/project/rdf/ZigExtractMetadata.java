package com.example.xml.project.rdf;

import com.example.xml.project.model.Osoba;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.util.AuthenticationUtilities;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static com.example.xml.project.rdf.RdfConstants.ZIG_NAMED_GRAPH_URI;
import static com.example.xml.project.rdf.RdfConstants.ZIG_NAMESPACE_PATH;


@Component
public class ZigExtractMetadata extends ExtractMetadata {
    public ZigExtractMetadata() {
        super(AuthenticationUtilities.setUpPropertiesFuseki());
    }

    public void extract(ZahtevZig zahtevZig) throws IOException {
//        podnosilac, punomocnik, predstavnik - email
//        zig vrsta
//        broj prijave
//        datum
//        referenca
//        vrsta znaka
        Model model = createModel();

        Resource resource = model.createResource(ZIG_NAMESPACE_PATH + zahtevZig.getId());

        Property datum_prijema = model.createProperty(PREDICATE_NAMESPACE, "datum_prijema");
        Literal datum_prijema_lit = model.createLiteral(zahtevZig.getDatum_podnosenja().toString());
        model.add(model.createStatement(resource, datum_prijema, datum_prijema_lit));

        Property vrsta_ziga = model.createProperty(PREDICATE_NAMESPACE, "vrsta_ziga");
        Literal vrsta_ziga_lit = model.createLiteral(zahtevZig.getZig().toString());
        model.add(model.createStatement(resource, vrsta_ziga, vrsta_ziga_lit));

        Property referenca_na_resenje = model.createProperty(PREDICATE_NAMESPACE, "referenca_na_resenje");
        Literal referenca_na_resenje_lit = model.createLiteral(zahtevZig.getReferenca_na_resenje());
        model.add(model.createStatement(resource, referenca_na_resenje, referenca_na_resenje_lit));

        Property broj_prijave = model.createProperty(PREDICATE_NAMESPACE, "broj_prijave");
        Literal broj_prijave_lit = model.createLiteral(zahtevZig.getBroj_prijave());
        model.add(model.createStatement(resource, broj_prijave, broj_prijave_lit));

        List<Podnosilac> podnosioci = zahtevZig.getPodnosioci();
        for(int i=0;i<podnosioci.size();i++){
            Property podnosilac_email = model.createProperty(PREDICATE_NAMESPACE, "podnosilac_email");
            Osoba podnosilac = (Osoba) podnosioci.get(i).getOsoba();
            Literal podnosilac_email_lit = model.createLiteral(podnosilac.getKontakt().getEmail());
            model.add(model.createStatement(resource, podnosilac_email, podnosilac_email_lit));
        }

        Property punomocnik_email = model.createProperty(PREDICATE_NAMESPACE, "punomocnik_email");
        Osoba punomocnik = (Osoba) zahtevZig.getPunomocnik().getOsoba();
        Literal punomocnik_email_lit = model.createLiteral(punomocnik.getKontakt().getEmail());
        model.add(model.createStatement(resource, punomocnik_email, punomocnik_email_lit));

        Property predstavnik_email = model.createProperty(PREDICATE_NAMESPACE, "predstavnik_email");
        Osoba predstavnik = (Osoba) zahtevZig.getPunomocnik().getOsoba();
        Literal predstavnik_email_lit = model.createLiteral(predstavnik.getKontakt().getEmail());
        model.add(model.createStatement(resource, predstavnik_email, predstavnik_email_lit));

        Property vrsta_znaka = model.createProperty(PREDICATE_NAMESPACE, "vrsta_znaka");
        Literal vrsta_znaka_lit = model.createLiteral(zahtevZig.getZnak().getVrsta_znaka().getVrsta().toString());
        model.add(model.createStatement(resource, vrsta_znaka, vrsta_znaka_lit));

        super.modelWrite(model, ZIG_NAMED_GRAPH_URI);
    }
}
