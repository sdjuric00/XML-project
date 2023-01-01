package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevAutorskaDelaDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviAutorskaDelaDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.repository.AutorskaPravaRepository;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.request.ParametarPretrage;
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

    public ZahteviAutorskaDelaDTO pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parametriPretrage) throws Exception {
        ZahteviAutorskaDelaDTO zahteviDTO = new ZahteviAutorskaDelaDTO();
        zahteviDTO.fromZahtevi(autorskaPravaRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage));
        return zahteviDTO;
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
