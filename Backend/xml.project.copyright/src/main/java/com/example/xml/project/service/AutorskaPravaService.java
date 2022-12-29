package com.example.xml.project.service;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.repository.AutorskaPravaRepository;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.GeneratorId;
import org.exist.xmldb.EXistResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;
import org.xmldb.api.DatabaseManager;
import org.xmldb.api.base.Collection;
import org.xmldb.api.base.Database;
import org.xmldb.api.base.XMLDBException;
import org.xmldb.api.modules.CollectionManagementService;
import org.xmldb.api.modules.XMLResource;

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

    public AutorskaPravaService(
        @Autowired final GenericRepository<ZahtevAutorskaDela> repository,
        @Autowired final AutorskaPravaRepository autorskaPravaRepository
    ) throws JAXBException
    {
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


    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(AUTORSKA_PRAVA_NEW_XML);
        marshaller.marshal(zahtevAutorskaDela, os);
    }

    public void saveToDB(String zahtev) throws InvalidDocumentException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(zahtev);
        repository.save(zahtevAutorskaDela, true);
    }

    public ZahtevAutorskaDela get(String documentId) throws EntityNotFoundException, CannotUnmarshalException, JAXBException {

        return repository.get(documentId);
    }

    public List<ZahtevAutorskaDela> pronadjiRezultateOsnovnePretrage(List<String> parametriPretrage) throws Exception {
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
