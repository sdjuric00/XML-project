package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevPatentDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviPatentiDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.Prijava;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.PatentRepository;
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
import java.util.ArrayList;
import java.util.List;

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

    public void saveToDBObj(ZahtevPatent zahtevPatent, boolean generisiId) throws InvalidDocumentException {

        repository.save(zahtevPatent, generisiId);
    }



    public ZahtevPatent get(String documentId) throws EntityNotFoundException, JAXBException {

        return repository.get(documentId);
    }

    public ZahteviPatentiDTO uzmiZahteve(final boolean obradjene) throws CannotUnmarshalException, XPathException {

        ZahteviPatentiDTO zahteviDTO = new ZahteviPatentiDTO();
        zahteviDTO.fromZahtevi(patentRepository.uzmiZahteve(obradjene));
        return zahteviDTO;
    }


    public ZahtevPatentDetaljneInformacijeDTO uzmiZahtev(final String id) throws CannotUnmarshalException, XPathException {
        ZahtevPatentDetaljneInformacijeDTO z = new ZahtevPatentDetaljneInformacijeDTO(patentRepository.uzmiZahtev(id));
        return new ZahtevPatentDetaljneInformacijeDTO(patentRepository.uzmiZahtev(id));
    }

    public ZahteviPatentiDTO pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parametriPretrage) throws Exception {
        ZahteviPatentiDTO zahteviDTO = new ZahteviPatentiDTO();
        zahteviDTO.fromZahtevi(patentRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage));
        return zahteviDTO;
    }
    public ZahtevPatent uzmiZahtevBezDTO(final String id) throws CannotUnmarshalException, XPathException {

        return patentRepository.uzmiZahtev(id);
    }

    public ZahteviPatentiDTO pronadjiDokumenteKojiReferenciraju(final String documentId) throws Exception {
        List<ZahtevPatent> obradjeniZahtevi = patentRepository.uzmiZahteve(true);
        List<ZahtevPatent> neobradjeniZahtevi = patentRepository.uzmiZahteve(false);

        List<ZahtevPatent> dokumentiKojiReferenciraju = new ArrayList<>();
        for(ZahtevPatent zahtev : obradjeniZahtevi){
            for(Prijava prijava : zahtev.getZahtev_za_priznanje_prava_iz_ranijih_prijava()){
                if(prijava.getBroj_ranije_prijave().equals(documentId)){
                    dokumentiKojiReferenciraju.add(zahtev);
                }
            }
        }

        for(ZahtevPatent zahtev : neobradjeniZahtevi){
            for(Prijava prijava : zahtev.getZahtev_za_priznanje_prava_iz_ranijih_prijava()){
                if(prijava.getBroj_ranije_prijave().equals(documentId)){
                    dokumentiKojiReferenciraju.add(zahtev);
                }
            }
        }

        ZahteviPatentiDTO zahteviDTO = new ZahteviPatentiDTO();
        zahteviDTO.fromZahtevi(dokumentiKojiReferenciraju);
        return zahteviDTO;
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
