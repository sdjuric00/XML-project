package com.example.xml.project.service;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.model.Korisnici.Korisnik;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.KorisniciRepository;
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
import java.io.*;

import static com.example.xml.project.util.Constants.*;

@Service
public class KorisniciService {

    private final GenericRepository<Korisnik> repository;
    private final KorisniciRepository korisniciRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;

    public KorisniciService(
        @Autowired final GenericRepository<Korisnik> repository,
        @Autowired final KorisniciRepository korisniciRepository
    ) throws JAXBException
    {
        this.jaxbContext = JAXBContext.newInstance(Korisnik.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(Korisnik.class),
            COLLECTION_ID_KORISNICI_DB
        );
        this.korisniciRepository = korisniciRepository;

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }


    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        Korisnik korisnik = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(KORISNICI_NEW_XML);
        marshaller.marshal(korisnik, os);
    }

    public void saveToDB(String zahtev) throws InvalidDocumentException {
        Korisnik korisnik = checkSchema(zahtev);
        repository.save(korisnik, true);
    }

    public Korisnik get(String documentId) throws EntityNotFoundException, CannotUnmarshalException, JAXBException {

        return repository.get(documentId);
    }

    private Korisnik checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(KORISNICI_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            Korisnik korisnik = (Korisnik) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return korisnik;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }
}
