package com.example.xml.project.service;

import com.example.xml.project.dto.ResenjeDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.A1.resenje.Resenje;
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

import static com.example.xml.project.model.A1.resenje.Resenje.napraviResenjeZaOdbijanjeZahteva;
import static com.example.xml.project.model.A1.resenje.Resenje.napraviResenjeZaPrihvatanjeZahteva;
import static com.example.xml.project.util.Constants.COLLECTION_ID_RESENJE_AUTORSKA_PRAVA_DB;
import static com.example.xml.project.util.Constants.RESENJE_SCHEMA;

@Service
public class ResenjeService {

    private final GenericRepository<Resenje> repository;
    private final ResenjeRepository resenjeRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final AutorskaPravaService autorskaPravaService;
    private final EmailService emailService;

    public ResenjeService(
        @Autowired final GenericRepository<Resenje> repository,
        @Autowired final ResenjeRepository resenjeRepository,
        @Autowired final AutorskaPravaService autorskaPravaService,
        @Autowired final EmailService emailService
    ) throws JAXBException {
        this.resenjeRepository = resenjeRepository;
        this.autorskaPravaService = autorskaPravaService;
        this.emailService = emailService;
        this.jaxbContext = JAXBContext.newInstance(Resenje.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(Resenje.class),
            COLLECTION_ID_RESENJE_AUTORSKA_PRAVA_DB
        );

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }


    public void prihvatiZahtev(
        final String sifra_obradjenog_zahteva,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev,
        final boolean dat_opis_autorskog_dela,
        final boolean dat_primer_autorskog_dela
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        Resenje resenje = napraviResenjeZaPrihvatanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, sifra_obradjenog_zahteva);
        ZahtevAutorskaDela zahtevAutorskaDela = popuniPotrebnaPoljaZahteva(referenca_na_zahtev, dat_opis_autorskog_dela, dat_primer_autorskog_dela, resenje);

        emailService.posaljiResenjeOPrihvatanjuKorisniku(zahtevAutorskaDela);
    }

    public void odbijZahtev(
        final String razlog_odbijanja,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev,
        final boolean dat_opis_autorskog_dela,
        final boolean dat_primer_autorskog_dela
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        Resenje resenje = napraviResenjeZaOdbijanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, razlog_odbijanja);
        ZahtevAutorskaDela zahtevAutorskaDela = popuniPotrebnaPoljaZahteva(referenca_na_zahtev, dat_opis_autorskog_dela, dat_primer_autorskog_dela, resenje);

        emailService.posaljiResenjeOOdbijanjuKorisniku(zahtevAutorskaDela);
    }

    public ResenjeDTO uzmi(String id) throws CannotUnmarshalException, XPathException {

        return new ResenjeDTO(resenjeRepository.uzmi(id));
    }

    private ZahtevAutorskaDela popuniPotrebnaPoljaZahteva(
        final String referenca_na_zahtev,
        final boolean dat_opis_autorskog_dela,
        final boolean dat_primer_autorskog_dela,
        final Resenje resenje
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        repository.save(resenje, true);
        ZahtevAutorskaDela zahtevAutorskaDela = autorskaPravaService.uzmiZahtevBezDTO(referenca_na_zahtev);
        zahtevAutorskaDela.setPregledano(true);
        zahtevAutorskaDela.setReferenca_na_resenje(resenje.getId());
        zahtevAutorskaDela.getPrilozi().setOpis_prilozen(dat_opis_autorskog_dela);
        zahtevAutorskaDela.getPrilozi().setPrimerak_prilozen(dat_primer_autorskog_dela);
        autorskaPravaService.saveToDBObj(zahtevAutorskaDela, false);

        return zahtevAutorskaDela;
    }

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
}

