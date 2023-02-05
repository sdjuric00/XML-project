package com.example.xml.project.service;

import java.util.ArrayList;
import java.util.List;
import com.example.xml.project.dto.KorisnikDTO;
import com.example.xml.project.exception.*;
import com.example.xml.project.model.Adresa;
import com.example.xml.project.model.Kontakt;
import com.example.xml.project.model.Korisnici.Korisnik;
import com.example.xml.project.model.Korisnici.TipNaloga;
import com.example.xml.project.request.izvestaji.IzvestajRequest;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.KorisniciRepository;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.transformator.Transformator;
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

import static com.example.xml.project.model.Korisnici.Korisnik.passwordsDontMatch;
import static com.example.xml.project.util.Constants.*;
import static com.example.xml.project.util.JwtProperties.getHashedNewUserPassword;

@Service
public class KorisnikService {

    private final GenericRepository<Korisnik> repository;
    private final KorisniciRepository korisniciRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final Transformator transformator;

    public KorisnikService(
            @Autowired final GenericRepository<Korisnik> repository,
            @Autowired final KorisniciRepository korisniciRepository,
            @Autowired final Transformator transformator
    ) throws JAXBException
    {
        this.transformator = transformator;
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
        korisnik.setLozinka(getHashedNewUserPassword(korisnik.getLozinka()));
        repository.save(korisnik, true);
    }

    public Korisnik get(String documentId) throws EntityNotFoundException, JAXBException {

        return repository.get(documentId);
    }

    private Korisnik checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(KORISNICI_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");

            return (Korisnik) unmarshaller.unmarshal
                    (new StreamSource( new StringReader(document)));
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }

    public Korisnik getKorisnikByEmail(final String email) throws EntityNotFoundException {

        return korisniciRepository.getKorisnikByEmail(email, true);
    }

    public KorisnikDTO registrujKorisnika(
            final String email,
            final String fax,
            final String telefon,
            final String grad,
            final String ulica,
            final String broj,
            final int postanskiBroj,
            final String drzava,
            final String ime,
            final String prezime,
            final String lozinka,
            final String potvrdna_lozinka,
            final TipNaloga tip_naloga
    ) throws PasswordsDoNotMatchException, EntityAlreadyExistsException, EntityNotFoundException {
        if (passwordsDontMatch(lozinka, potvrdna_lozinka)) {
            throw new PasswordsDoNotMatchException();
        }
        if (korisnikVecPostoji(email)) {
            throw new EntityAlreadyExistsException(String.format("Korisnik sa %s već postoji.", email));
        }
        Kontakt kontakt = new Kontakt(email, telefon, fax);
        Adresa adresa = new Adresa(grad, ulica, broj, postanskiBroj, drzava);
        Korisnik korisnik = new Korisnik(kontakt, adresa, ime, prezime, lozinka, tip_naloga);
        korisnik.setLozinka(getHashedNewUserPassword(korisnik.getLozinka()));
        repository.save(korisnik, true);

        return new KorisnikDTO(korisnik);
    }

    public UspesnaTransformacija dodajHtml(final IzvestajRequest izvestaj, final boolean jeGenerisanjePdf)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException {
        String htmlPutanja = HTML_PUTANJA + "izvestaj" + ".html";

        return new UspesnaTransformacija(this.transformator.generateHTML(htmlPutanja, izvestaj, jeGenerisanjePdf));
    }

    public UspesnaTransformacija dodajPDF(final IzvestajRequest izvestaj)
            throws IOException, TransformationFailedException, JAXBException, EntityNotFoundException, InvalidDocumentException {

        JAXBContext jaxbContextIzvestaj = JAXBContext.newInstance(IzvestajRequest.class);
        Marshaller marshaller = jaxbContextIzvestaj.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        StringWriter sw = new StringWriter();
        marshaller.marshal(izvestaj, sw);

        IzvestajRequest validiranIzvestaj = checkSchemaIzvestaj(sw.toString(), jaxbContextIzvestaj);
        String pdfPutanja = PDF_PUTANJA + "izvestaj" + ".pdf";
        String htmlPutanja = HTML_PUTANJA + "izvestaj" + ".html";
        this.dodajHtml(validiranIzvestaj, true);  //prvo se pravi html za slucaj da ne postoji

        return new UspesnaTransformacija(this.transformator.generatePdf(htmlPutanja, pdfPutanja));
    }

    private boolean korisnikVecPostoji(String email) throws EntityNotFoundException {

        return korisniciRepository.getKorisnikByEmail(email, false) != null;
    }

    private IzvestajRequest checkSchemaIzvestaj(String document, JAXBContext izvestajContext) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = izvestajContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File("./data/Izvestaj.xsd"));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            IzvestajRequest izvestajRequest = (IzvestajRequest) unmarshaller.unmarshal
                    (new StreamSource( new StringReader(document)));

            return izvestajRequest;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }

}
