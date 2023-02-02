package com.example.xml.project.service.implementation;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.dto.ZahtevAutorskaDelaDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviAutorskaDelaDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.A1.Autor;
import com.example.xml.project.model.A1.AutorskoDelo;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Prilozi;
import com.example.xml.project.model.Punomocnik;
import com.example.xml.project.rdf.AutorskoDeloExtractMetadata;
import com.example.xml.project.repository.AutorskaPravaRepository;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.request.ParNaprednaPretraga;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.service.interfaces.IAutorskaPravaService;
import com.example.xml.project.util.AuthenticationUtilities;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.example.xml.project.util.Constants.*;
import static com.example.xml.project.util.Constants.JSON_PUTANJA;
import static com.example.xml.project.util.SlikeTransformator.sacuvajSliku;

@Component
public class AutorskaPravaService implements IAutorskaPravaService {

    private final GenericRepository<ZahtevAutorskaDela> repository;
    private final AutorskaPravaRepository autorskaPravaRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final Transformator transformator;
    private final AutorskoDeloExtractMetadata autorskoDeloExtractMetadata;

    public AutorskaPravaService(
        @Autowired final GenericRepository<ZahtevAutorskaDela> repository,
        @Autowired final AutorskaPravaRepository autorskaPravaRepository,
        @Autowired final Transformator transformator,
        @Autowired final AutorskoDeloExtractMetadata autorskoDeloExtractMetadata
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
        this.autorskoDeloExtractMetadata = autorskoDeloExtractMetadata;
    }

    public UspesnaTransformacija dodajHtml(final String id, boolean jeGenerisanjePdf)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {
        String htmlPutanja = HTML_PUTANJA + id + ".html";

        return new UspesnaTransformacija(this.transformator.generateHTML(htmlPutanja, get(id), jeGenerisanjePdf));
    }

    public UspesnaTransformacija dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, CannotUnmarshalException, TransformationFailedException
    {
        String pdfPutanja = PDF_PUTANJA + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + id + ".html";
        this.dodajHtml(id, true);  //prvo se pravi html za slucaj da ne postoji

        return new UspesnaTransformacija(this.transformator.generatePdf(htmlPutanja, pdfPutanja));
    }

    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(AUTORSKA_PRAVA_NEW_XML);
        marshaller.marshal(zahtevAutorskaDela, os);
    }

    public ZahtevAutorskaDela saveToDB(String zahtev) throws InvalidDocumentException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(zahtev);
        repository.save(zahtevAutorskaDela, true);
        return zahtevAutorskaDela;
    }

    public String saveNewRequest(
            String id,
            final String broj_prijave,
            final LocalDate datum_podnosenja,
            final boolean pregledano,
            final String referenca_na_podnosioca,
            final Institucija institucija,
            final Podnosilac podnosilac,
            final Punomocnik punomocnik,
            final AutorskoDelo autorsko_delo,
            final List<Autor> autori,
            final Prilozi prilozi
    )
            throws JAXBException, IOException, InvalidDocumentException, TransformationFailedException
    {
        String imeSlike = sacuvajSliku(prilozi.getPrimerak());
        prilozi.setPrimerak(imeSlike);
        if (id == null) {
            id = "1";    //zbog check seme da validira, posle ce setovati dobar broj
        }

        ZahtevAutorskaDela zahtev = new ZahtevAutorskaDela(
            id,
            broj_prijave,
            datum_podnosenja,
            pregledano,
            referenca_na_podnosioca,
            institucija,
            podnosilac,
            punomocnik,
            autorsko_delo,
            autori,
            prilozi
        );
        Marshaller marshaller = jaxbContext.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        StringWriter sw = new StringWriter();
        marshaller.marshal(zahtev, sw);

        ZahtevAutorskaDela validirano = this.saveToDB(sw.toString());
        autorskoDeloExtractMetadata.extract(validirano);

        return validirano.getId();
    }

    public void saveToDBObj(ZahtevAutorskaDela zahtevAutorskaDela, boolean generisiId) throws InvalidDocumentException {

        repository.save(zahtevAutorskaDela, generisiId);
    }

    public ZahtevAutorskaDela get(String documentId) throws EntityNotFoundException, JAXBException {

        return repository.get(documentId);
    }

    public ZahteviAutorskaDelaDTO uzmiZahteve(boolean obradjene, String id) throws CannotUnmarshalException, XPathException {

        ZahteviAutorskaDelaDTO zahteviDTO = new ZahteviAutorskaDelaDTO();
        zahteviDTO.fromZahtevi(autorskaPravaRepository.uzmiZahteve(obradjene, id));
        return zahteviDTO;
    }

    public ZahtevAutorskaDela uzmiZahtevBezDTO(final String id) throws CannotUnmarshalException, XPathException {

        return autorskaPravaRepository.uzmiZahtev(id);
    }


    public ZahtevAutorskaDelaDetaljneInformacijeDTO uzmiZahtev(final String id) throws CannotUnmarshalException, XPathException {

        return new ZahtevAutorskaDelaDetaljneInformacijeDTO(autorskaPravaRepository.uzmiZahtev(id));
    }

    public ZahteviAutorskaDelaDTO pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parametriPretrage, final String idKorisnika) throws Exception {
        ZahteviAutorskaDelaDTO zahteviDTO = new ZahteviAutorskaDelaDTO();
        zahteviDTO.fromZahtevi(autorskaPravaRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage, idKorisnika));
        return zahteviDTO;
    }

    public UspesnaTransformacija generisiJson(String id) throws IOException {
        AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki = AuthenticationUtilities.setUpPropertiesFuseki();
        String json = autorskaPravaRepository.generisiJson(id, connectionPropertiesFuseki);
        return new UspesnaTransformacija(json.getBytes());
    }

    public UspesnaTransformacija generisiRdf(String id) throws IOException {
        AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki = AuthenticationUtilities.setUpPropertiesFuseki();
        String rdf = autorskaPravaRepository.generisiRdf(id, connectionPropertiesFuseki);
        return new UspesnaTransformacija(rdf.getBytes());
    }

    public ZahteviAutorskaDelaDTO pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametriPretrage, String idKorisnika) throws Exception {
        ZahteviAutorskaDelaDTO zahteviDTO = new ZahteviAutorskaDelaDTO();
        zahteviDTO.fromZahtevi(autorskaPravaRepository.pronadjiRezultateNaprednePretrage(parametriPretrage, idKorisnika));
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

    public IzvestajDTO generisiIzvestaj(final LocalDate pocetniDatum, final LocalDate krajnjiDatum) throws CannotUnmarshalException, XPathException {

        return autorskaPravaRepository.generisiIzvestaj(pocetniDatum, krajnjiDatum);
    }
}
