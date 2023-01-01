package com.example.xml.project.service;

import com.example.xml.project.dto.ResenjeDTO;
import com.example.xml.project.dto.ZahtevZigDetaljneInformacijeDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.Z1.PopunjavaZavod;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.model.Z1.resenje.Resenje;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.ResenjeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.File;
import java.io.StringReader;

import static com.example.xml.project.model.Z1.resenje.Resenje.napraviResenjeZaOdbijanjeZahteva;
import static com.example.xml.project.model.Z1.resenje.Resenje.napraviResenjeZaPrihvatanjeZahteva;
import static com.example.xml.project.util.Constants.*;

@Service
public class ResenjeService {

    private final GenericRepository<Resenje> repository;
    private final ResenjeRepository resenjeRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final ZigService zigService;

    public ResenjeService(
        @Autowired final GenericRepository<Resenje> repository,
        @Autowired final ResenjeRepository resenjeRepository,
        @Autowired final ZigService zigService
    ) throws JAXBException {
        this.resenjeRepository = resenjeRepository;
        this.zigService = zigService;
        this.jaxbContext = JAXBContext.newInstance(Resenje.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(Resenje.class),
            COLLECTION_ID_RESENJE_ZIG_DB
        );

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }

    public void prihvatiZahtev(
        final String sifra_obradjenog_zahteva,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev,
        final boolean primerak_znaka_dat,
        final boolean spisak_robe_dat,
        final boolean punomocje_dato,
        final boolean generalno_punomocje_ranije_prilozeno,
        final boolean punomocje_ce_biti_naknadno_dostavljeno,
        final boolean opsti_akt,
        final boolean dokaz_o_pravu_prvenstva,
        final boolean dokaz_o_uplati_takse
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        Resenje resenje = napraviResenjeZaPrihvatanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, sifra_obradjenog_zahteva);
        popuniPotrebnaPoljaZahteva(referenca_na_zahtev, primerak_znaka_dat, spisak_robe_dat, punomocje_dato, generalno_punomocje_ranije_prilozeno, punomocje_ce_biti_naknadno_dostavljeno, opsti_akt, dokaz_o_pravu_prvenstva, dokaz_o_uplati_takse, resenje);
    }

    public void odbijZahtev(
        final String razlog_odbijanja,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev,
        final boolean primerak_znaka_dat,
        final boolean spisak_robe_dat,
        final boolean punomocje_dato,
        final boolean generalno_punomocje_ranije_prilozeno,
        final boolean punomocje_ce_biti_naknadno_dostavljeno,
        final boolean opsti_akt,
        final boolean dokaz_o_pravu_prvenstva,
        final boolean dokaz_o_uplati_takse
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        Resenje resenje = napraviResenjeZaOdbijanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, razlog_odbijanja);
        popuniPotrebnaPoljaZahteva(referenca_na_zahtev, primerak_znaka_dat, spisak_robe_dat, punomocje_dato, generalno_punomocje_ranije_prilozeno, punomocje_ce_biti_naknadno_dostavljeno, opsti_akt, dokaz_o_pravu_prvenstva, dokaz_o_uplati_takse, resenje);
    }

    private void popuniPotrebnaPoljaZahteva(
        final String referenca_na_zahtev,
        final boolean primerak_znaka_dat,
        final boolean spisak_robe_dat,
        final boolean punomocje_dato,
        final boolean generalno_punomocje_ranije_prilozeno,
        final boolean punomocje_ce_biti_naknadno_dostavljeno,
        final boolean opsti_akt,
        final boolean dokaz_o_pravu_prvenstva,
        final boolean dokaz_o_uplati_takse,
        final Resenje resenje
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        repository.save(resenje, true);
        ZahtevZig zahtevZig = zigService.uzmiZahtevBezDTO(referenca_na_zahtev);
        zahtevZig.setPregledano(true);
        zahtevZig.setReferenca_na_resenje(resenje.getId());
        zahtevZig.setPopunjava_zavod(new PopunjavaZavod());
        zahtevZig.getPopunjava_zavod().setPrimerak_znaka(primerak_znaka_dat);
        zahtevZig.getPopunjava_zavod().setSpisak_roba_i_usluga(spisak_robe_dat);
        zahtevZig.getPopunjava_zavod().setPunomocje(punomocje_dato);
        zahtevZig.getPopunjava_zavod().setGeneralno_punomocje_ranije_prilozeno(generalno_punomocje_ranije_prilozeno);
        zahtevZig.getPopunjava_zavod().setPunomocje_ce_biti_naknadno_dostavljeno(punomocje_ce_biti_naknadno_dostavljeno);
        zahtevZig.getPopunjava_zavod().setOpsti_akt(opsti_akt);
        zahtevZig.getPopunjava_zavod().setDokaz_o_pravu_prvenstva(dokaz_o_pravu_prvenstva);
        zahtevZig.getPopunjava_zavod().setDokaz_o_uplati_takse(dokaz_o_uplati_takse);
        zigService.saveToDBObj(zahtevZig, false);
    }

//    public ZahtevAutorskaDela get(String documentId) throws EntityNotFoundException, JAXBException {
//
//        return repository.get(documentId);
//    }
//
//    public ZahteviAutorskaDelaDTO uzmiZahteve(boolean obradjene) throws CannotUnmarshalException, XPathException {
//
//        ZahteviAutorskaDelaDTO zahteviDTO = new ZahteviAutorskaDelaDTO();
//        zahteviDTO.fromZahtevi(autorskaPravaRepository.uzmiZahteve(obradjene));
//        return zahteviDTO;
//    }
//
//
//    public ZahtevAutorskaDelaDetaljneInformacijeDTO uzmiZahtev(final String id) throws CannotUnmarshalException, XPathException {
//
//        return new ZahtevAutorskaDelaDetaljneInformacijeDTO(autorskaPravaRepository.uzmiZahtev(id));
//    }
//
//    public List<ZahtevAutorskaDela> pronadjiRezultateOsnovnePretrage(final List<String> parametriPretrage) throws Exception {
//
//        return autorskaPravaRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage);
//    }

    private Resenje checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(RESENJE_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            Resenje resenje = (Resenje) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return resenje;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }

    public ResenjeDTO uzmi(String id) throws CannotUnmarshalException, XPathException {

        return new ResenjeDTO(resenjeRepository.uzmi(id));
    }
}

