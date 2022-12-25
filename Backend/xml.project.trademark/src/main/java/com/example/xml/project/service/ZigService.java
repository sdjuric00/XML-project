package com.example.xml.project.service;

import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.ZigRepository;
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
public class ZigService {

    private final GenericRepository<ZahtevZig> repository;
    private final ZigRepository zigRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;

    public ZigService (
        @Autowired final GenericRepository<ZahtevZig> repository,
        @Autowired final ZigRepository zigRepository
    ) throws JAXBException
    {
        this.jaxbContext = JAXBContext.newInstance(ZahtevZig.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(ZahtevZig.class),
            COLLECTION_ID_ZIG_DB
        );
        this.zigRepository = zigRepository;

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }


    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        ZahtevZig zahtevAutorskaDela = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(ZIG_NEW_XML);
        marshaller.marshal(zahtevAutorskaDela, os);
    }

    public void saveToDB(String zahtev) throws InvalidDocumentException {
        ZahtevZig zahtevAutorskaDela = checkSchema(zahtev);
        repository.save(zahtevAutorskaDela, true);
    }

    public ZahtevZig get(String documentId) throws EntityNotFoundException, JAXBException {

        return repository.get(documentId);
    }

    private ZahtevZig checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(ZIG_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            ZahtevZig zahtevZig = (ZahtevZig) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return zahtevZig;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }

}
