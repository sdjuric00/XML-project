package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevAutorskaDelaDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviAutorskaDelaDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.repository.AutorskaPravaRepository;
import com.example.xml.project.repository.GenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import com.example.xml.project.response.UspesanOdgovor;
import com.example.xml.project.transformator.Transformator;
import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.*;
import java.util.List;

import static com.example.xml.project.util.Constants.*;

@Service
public class AutorskaPravaService {

    private final GenericRepository<ZahtevAutorskaDela> repository;
    private final AutorskaPravaRepository autorskaPravaRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final Transformator transformator;

    public AutorskaPravaService(
        @Autowired final GenericRepository<ZahtevAutorskaDela> repository,
        @Autowired final AutorskaPravaRepository autorskaPravaRepository,
        @Autowired final Transformator transformator
    ) throws JAXBException
    {
        this.transformator = transformator;
        this.jaxbContext = JAXBContext.newInstance(ZahtevAutorskaDela.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(ZahtevAutorskaDela.class),
            COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB
        );
        this.autorskaPravaRepository = autorskaPravaRepository;

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }

    public UspesanOdgovor dodajHtml(String id)
            throws JAXBException, EntityNotFoundException, CannotUnmarshalException, TransformationFailedException {
        String htmlPutanja = HTML_PUTANJA + id + ".html";

        return new UspesanOdgovor(this.transformator.generateHTML(htmlPutanja, get(id)));
    }

    public UspesanOdgovor dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, CannotUnmarshalException, TransformationFailedException
    {
        String pdfPutanja = PDF_PUTANJA + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + id + ".html";
        this.dodajHtml(id);  //prvo se pravi html za slucaj da ne postoji

        return new UspesanOdgovor(this.transformator.generatePdf(htmlPutanja, pdfPutanja));
    }

    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(AUTORSKA_PRAVA_NEW_XML);
        marshaller.marshal(zahtevAutorskaDela, os);
    }

    public void saveToDB(String zahtev) throws InvalidDocumentException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(zahtev);
        repository.save(zahtevAutorskaDela, true);
    }

    public ZahtevAutorskaDela get(String documentId) throws EntityNotFoundException, JAXBException {

        return repository.get(documentId);
    }

    public ZahteviAutorskaDelaDTO uzmiZahteve(boolean obradjene) throws CannotUnmarshalException, XPathException {

        ZahteviAutorskaDelaDTO zahteviDTO = new ZahteviAutorskaDelaDTO();
        zahteviDTO.fromZahtevi(autorskaPravaRepository.uzmiZahteve(obradjene));
        return zahteviDTO;
    }


    public ZahtevAutorskaDelaDetaljneInformacijeDTO uzmiZahtev(final String id) throws CannotUnmarshalException, XPathException {

        return new ZahtevAutorskaDelaDetaljneInformacijeDTO(autorskaPravaRepository.uzmiZahtev(id));
    }

    public List<ZahtevAutorskaDela> pronadjiRezultateOsnovnePretrage(final List<String> parametriPretrage) throws Exception {

        return autorskaPravaRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage);
    }

    private ZahtevAutorskaDela checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(AUTORSKA_PRAVA_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            ZahtevAutorskaDela zahtevAutorskaDela = (ZahtevAutorskaDela) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return zahtevAutorskaDela;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }
}
