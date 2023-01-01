package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevZigDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviZigDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.ZigRepository;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.transformator.Transformator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;
import com.example.xml.project.response.UspesanOdgovor;

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
public class ZigService {

    private final GenericRepository<ZahtevZig> repository;
    private final ZigRepository zigRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final Transformator transformator;

    public ZigService (
        @Autowired final GenericRepository<ZahtevZig> repository,
        @Autowired final ZigRepository zigRepository,
        @Autowired final Transformator transformator
    ) throws JAXBException
    {
        this.transformator = transformator;
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

    public ZahteviZigDTO uzmiZahteve(boolean obradjene) throws CannotUnmarshalException, XPathException {

        ZahteviZigDTO zahteviDTO = new ZahteviZigDTO();
        zahteviDTO.fromZahtevi(zigRepository.uzmiZahteve(obradjene));
        return zahteviDTO;
    }

    public ZahtevZigDetaljneInformacijeDTO uzmiZahtev(String id) throws CannotUnmarshalException, XPathException {

        return new ZahtevZigDetaljneInformacijeDTO(zigRepository.uzmiZahtev(id));
    }

    public UspesanOdgovor dodajZigHtml(String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException
    {
        String htmlPutanja = HTML_PUTANJA + id + ".html";

        return new UspesanOdgovor(this.transformator.generateHTML(htmlPutanja, get(id)));
    }

    public ZahteviZigDTO pronadjiRezultateOsnovnePretrage(List<ParametarPretrage> parametriPretrage) throws Exception {
        ZahteviZigDTO zahteviDTO = new ZahteviZigDTO();
        zahteviDTO.fromZahtevi(zigRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage));
        return zahteviDTO;
    }

    public UspesanOdgovor dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, TransformationFailedException {
        String pdfPutanja = PDF_PUTANJA + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + id + ".html";
        this.dodajZigHtml(id);  //prvo se pravi html za slucaj da ne postoji

        return new UspesanOdgovor(this.transformator.generatePdf(htmlPutanja, pdfPutanja));
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
