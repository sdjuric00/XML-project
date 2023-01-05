package com.example.xml.project.service;

import com.example.xml.project.dto.ResenjeDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.model.resenje.Resenje;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.ResenjeRepository;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.transformator.Transformator;
import org.apache.commons.io.FileUtils;
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
import java.io.IOException;
import java.io.StringReader;
import java.time.LocalDate;

import static com.example.xml.project.model.resenje.Resenje.napraviResenjeZaOdbijanjeZahteva;
import static com.example.xml.project.model.resenje.Resenje.napraviResenjeZaPrihvatanjeZahteva;
import static com.example.xml.project.util.Constants.*;

@Service
public class ResenjeService {

    private final GenericRepository<Resenje> repository;
    private final ResenjeRepository resenjeRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final PatentService patentService;
    private final Transformator transformator;

    public ResenjeService(
        @Autowired final GenericRepository<Resenje> repository,
        @Autowired final ResenjeRepository resenjeRepository,
        @Autowired final PatentService patentService,
        @Autowired final Transformator transformator
    ) throws JAXBException {
        this.transformator = transformator;
        this.resenjeRepository = resenjeRepository;
        this.patentService = patentService;
        this.jaxbContext = JAXBContext.newInstance(Resenje.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(Resenje.class),
            COLLECTION_ID_RESENJE_PATENTI_DB
        );

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }

    public void saveToDB(Resenje resenje) throws InvalidDocumentException {
//        Resenje resenje = checkSchema(zahtev);
        repository.save(resenje, true);
    }

    public void prihvatiZahtev(
        final String sifra_obradjenog_zahteva,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        Resenje resenje = napraviResenjeZaPrihvatanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, sifra_obradjenog_zahteva);
        repository.save(resenje, true);
        ZahtevPatent zahtevPatent = patentService.uzmiZahtevBezDTO(referenca_na_zahtev);
        zahtevPatent.setPregledano(true);
        zahtevPatent.setReferenca_na_resenje(resenje.getId());
        zahtevPatent.setPriznati_datum_podnosenja(LocalDate.now());
        zahtevPatent.setPrihvaceno(true);
        patentService.saveToDBObj(zahtevPatent, false);
    }

    public void odbijZahtev(
        final String razlog_odbijanja,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        Resenje resenje = napraviResenjeZaOdbijanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, razlog_odbijanja);
        repository.save(resenje, true);
        ZahtevPatent zahtevPatent = patentService.uzmiZahtevBezDTO(referenca_na_zahtev);
        zahtevPatent.setPregledano(true);
        zahtevPatent.setReferenca_na_resenje(resenje.getId());
        zahtevPatent.setPriznati_datum_podnosenja(LocalDate.now());
        zahtevPatent.setPrihvaceno(false);
        patentService.saveToDBObj(zahtevPatent, false);
    }

    public ResenjeDTO uzmi(String id) throws CannotUnmarshalException, XPathException {

        return new ResenjeDTO(resenjeRepository.uzmi(id));
    }

    public Resenje uzmiResenjeModel(String id) throws CannotUnmarshalException, XPathException {

        return resenjeRepository.uzmi(id);
    }

    public UspesnaTransformacija dodajResenjeHtml(String id)
            throws TransformationFailedException, IOException, CannotUnmarshalException, XPathException
    {
        String htmlPutanja = HTML_PUTANJA + "resenje-" + id + ".html";

        return new UspesnaTransformacija(this.transformator.generisiResenjeHTML(htmlPutanja, uzmiResenjeModel(id)));
    }

    public UspesnaTransformacija procitajPdf(final String id)
            throws CannotUnmarshalException, TransformationFailedException, XPathException, IOException
    {
        String putanja = this.dodajResenjePdf(id);
        File fajl = new File(putanja);

        return new UspesnaTransformacija(FileUtils.readFileToByteArray(fajl));
    }

    public String dodajResenjePdf(final String id)
            throws IOException, CannotUnmarshalException, TransformationFailedException, XPathException
    {
        String pdfPutanja = PDF_PUTANJA + "resenje-" + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + "resenje-" + id + ".html";
        this.dodajResenjeHtml(id);
        this.transformator.generatePdf(htmlPutanja, pdfPutanja);

        return pdfPutanja;
    }

    private Resenje checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(RESENJE_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");

            return (Resenje) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }

}

