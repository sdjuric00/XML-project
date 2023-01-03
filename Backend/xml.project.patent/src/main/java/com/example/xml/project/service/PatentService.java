package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevPatentDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviPatentiDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.P1.*;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.PatentRepository;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.transformator.Transformator;
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
import java.time.LocalDate;
import java.util.List;

import static com.example.xml.project.util.Constants.*;

@Service
public class PatentService {

    private final GenericRepository<ZahtevPatent> repository;
    private final PatentRepository patentRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final Transformator transformator;

    public PatentService(
        @Autowired final GenericRepository<ZahtevPatent> repository,
        @Autowired final PatentRepository patentRepository,
        @Autowired final Transformator transformator
    ) throws JAXBException
    {
        this.transformator = transformator;
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
        System.out.println(obradjeniZahtevi.size() + " " + neobradjeniZahtevi.size());

        List<ZahtevPatent> dokumentiKojiReferenciraju = new ArrayList<>();
        ZahtevPatent zahtevPatent = patentRepository.uzmiZahtev(documentId);
        for(ZahtevPatent zahtev : obradjeniZahtevi){
            for(Prijava prijava : zahtev.getZahtev_za_priznanje_prava_iz_ranijih_prijava()){
                System.out.println(prijava.getBroj_ranije_prijave() + "  " + zahtevPatent.getBroj_prijave());
                if(prijava.getBroj_ranije_prijave().equals(zahtevPatent.getBroj_prijave())){
                    dokumentiKojiReferenciraju.add(zahtev);
                }
            }
        }

        for(ZahtevPatent zahtev : neobradjeniZahtevi){
            for(Prijava prijava : zahtev.getZahtev_za_priznanje_prava_iz_ranijih_prijava()){
                System.out.println(prijava.getBroj_ranije_prijave() + "  " + zahtevPatent.getBroj_prijave());
                if(prijava.getBroj_ranije_prijave().equals(zahtevPatent.getBroj_prijave())){
                    dokumentiKojiReferenciraju.add(zahtev);
                }
            }
        }

        ZahteviPatentiDTO zahteviDTO = new ZahteviPatentiDTO();
        zahteviDTO.fromZahtevi(dokumentiKojiReferenciraju);
        return zahteviDTO;
    }


    public UspesnaTransformacija dodajHtml(String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {
        String htmlPutanja = HTML_PUTANJA + id + ".html";

        return new UspesnaTransformacija(this.transformator.generateHTML(htmlPutanja, get(id)));
    }

    public UspesnaTransformacija dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, CannotUnmarshalException, TransformationFailedException
    {
        String pdfPutanja = PDF_PUTANJA + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + id + ".html";
        this.dodajHtml(id);  //prvo se pravi html za slucaj da ne postoji

        return new UspesnaTransformacija(this.transformator.generatePdf(htmlPutanja, pdfPutanja));

    }

    public void saveNewRequest(
            String id,
            final String broj_prijave,
            final LocalDate datum_prijema,
            final LocalDate priznati_datum_podnosenja,
            final boolean dopunska_prijava,
            final boolean pregledano,
            final Institucija institucija,
            final List<Naziv> podaci_o_pronalasku,
            final Podnosilac podnosilac,
            final PronalazacP pronalazac,
            final PunomocnikP punomocnik,
            final Dostavljanje dostavljanje,
            final List<Prijava> zahtev_za_priznanje_prava_iz_ranijih_prijava
    ) throws InvalidDocumentException, JAXBException {
        if (id == null) {
            id = "1";    //zbog check seme da validira, posle ce setovati dobar broj
        }
        System.out.println("blaaa");

        ZahtevPatent zahtev = new ZahtevPatent(id, broj_prijave, datum_prijema, priznati_datum_podnosenja, dopunska_prijava,
                pregledano, institucija, podaci_o_pronalasku, podnosilac, pronalazac, punomocnik, dostavljanje, zahtev_za_priznanje_prava_iz_ranijih_prijava);
        Marshaller marshaller = jaxbContext.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        StringWriter sw = new StringWriter();
        marshaller.marshal(zahtev, sw);

        this.saveToDB(sw.toString());
    }

    private ZahtevPatent checkSchema(String document) throws InvalidDocumentException {
        try {
            System.out.println(document);
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
