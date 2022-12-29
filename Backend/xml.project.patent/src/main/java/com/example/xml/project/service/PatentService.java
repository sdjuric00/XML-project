package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevPatentDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviPatentiDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.PatentRepository;
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
public class PatentService {

    private final GenericRepository<ZahtevPatent> repository;
    private final PatentRepository patentRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;

    public PatentService(
        @Autowired final GenericRepository<ZahtevPatent> repository,
        @Autowired final PatentRepository patentRepository
    ) throws JAXBException
    {
        this.jaxbContext = JAXBContext.newInstance(ZahtevPatent.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(ZahtevPatent.class),
            COLLECTION_ID_PATENTI_ZAHTEV_DB
        );
        this.patentRepository = patentRepository;

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }


    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        ZahtevPatent zahtevPatent = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(PATENTI_NEW_XML);
        marshaller.marshal(zahtevPatent, os);
    }

    public void saveToDB(String zahtev) throws InvalidDocumentException {
        ZahtevPatent zahtevPatent = checkSchema(zahtev);
        repository.save(zahtevPatent, true);
    }

    public ZahtevPatent get(String documentId) throws EntityNotFoundException, JAXBException {

        return repository.get(documentId);
    }

    public ZahteviPatentiDTO uzmiZahteve(boolean obradjene) throws CannotUnmarshalException, XPathException {

        ZahteviPatentiDTO zahteviDTO = new ZahteviPatentiDTO();
        zahteviDTO.fromZahtevi(patentRepository.uzmiZahteve(obradjene));
        return zahteviDTO;
    }


    public ZahtevPatentDetaljneInformacijeDTO uzmiZahtev(String id) throws CannotUnmarshalException, XPathException {

        return new ZahtevPatentDetaljneInformacijeDTO(patentRepository.uzmiZahtev(id));
    }

    private ZahtevPatent checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(PATENTI_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            ZahtevPatent zahtevPatent = (ZahtevPatent) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return zahtevPatent;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }
}
