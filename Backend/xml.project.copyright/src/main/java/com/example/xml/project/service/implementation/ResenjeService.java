package com.example.xml.project.service.implementation;

import com.example.xml.project.dto.KreiranoResenjeSaZahtevomDTO;
import com.example.xml.project.dto.ResenjeDTO;
import com.example.xml.project.exception.*;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.model.A1.resenje.Resenje;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.ResenjeRepository;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.service.interfaces.IResenjeService;
import com.example.xml.project.transformator.Transformator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;

import static com.example.xml.project.model.A1.resenje.Resenje.napraviResenjeZaOdbijanjeZahteva;
import static com.example.xml.project.model.A1.resenje.Resenje.napraviResenjeZaPrihvatanjeZahteva;
import static com.example.xml.project.util.Constants.*;
import static com.example.xml.project.util.Constants.HTML_PUTANJA;

@Component
public class ResenjeService implements IResenjeService {

    private final GenericRepository<Resenje> repository;
    private final ResenjeRepository resenjeRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final AutorskaPravaService autorskaPravaService;
    private final EmailService emailService;
    private final Transformator transformator;

    public ResenjeService(
        @Autowired final GenericRepository<Resenje> repository,
        @Autowired final ResenjeRepository resenjeRepository,
        @Autowired final AutorskaPravaService autorskaPravaService,
        @Autowired final EmailService emailService,
        @Autowired final Transformator transformator
    ) throws JAXBException {
        this.transformator = transformator;
        this.resenjeRepository = resenjeRepository;
        this.autorskaPravaService = autorskaPravaService;
        this.emailService = emailService;
        this.jaxbContext = JAXBContext.newInstance(Resenje.class);
        this.repository = repository;
        this.repository.setGenericRepositoryProperties(
            JAXBContext.newInstance(Resenje.class),
            COLLECTION_ID_RESENJE_AUTORSKA_PRAVA_DB
        );

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }

    public void prihvatiZahtev(
        final String sifra_obradjenog_zahteva,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev,
        final boolean dat_opis_autorskog_dela,
        final boolean dat_primer_autorskog_dela
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException, TransformationFailedException, IOException
    {
        Resenje resenje = napraviResenjeZaPrihvatanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, sifra_obradjenog_zahteva);
        KreiranoResenjeSaZahtevomDTO zahtevDTO = popuniPotrebnaPoljaZahteva(referenca_na_zahtev, dat_opis_autorskog_dela, dat_primer_autorskog_dela, resenje, true);
        byte[] pdfFajl = this.dodajResenjePdf(zahtevDTO.getResenjeId());

        emailService.posaljiResenjeOPrihvatanjuKorisniku(zahtevDTO.getZahtevAutorskaDela(), pdfFajl);
    }

    public void odbijZahtev(
        final String razlog_odbijanja,
        final String ime_prezime_sluzbenika,
        final String referenca_na_zahtev,
        final boolean dat_opis_autorskog_dela,
        final boolean dat_primer_autorskog_dela
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException, TransformationFailedException, IOException
    {
        Resenje resenje = napraviResenjeZaOdbijanjeZahteva(referenca_na_zahtev, ime_prezime_sluzbenika, razlog_odbijanja);
        KreiranoResenjeSaZahtevomDTO zahtevDTO = popuniPotrebnaPoljaZahteva(referenca_na_zahtev, dat_opis_autorskog_dela, dat_primer_autorskog_dela, resenje, false);
        byte[] pdfFajl = this.dodajResenjePdf(zahtevDTO.getResenjeId());

        emailService.posaljiResenjeOOdbijanjuKorisniku(zahtevDTO.getZahtevAutorskaDela(), pdfFajl);
    }

    public ResenjeDTO uzmi(String id) throws CannotUnmarshalException, XPathException {

        return new ResenjeDTO(resenjeRepository.uzmi(id));
    }

    public Resenje uzmiResenjeModel(String id) throws CannotUnmarshalException, XPathException {

        return resenjeRepository.uzmi(id);
    }

    public UspesnaTransformacija dodajResenjeHtml(final String id, final boolean jeGenerisanjePdf)
            throws TransformationFailedException, IOException, CannotUnmarshalException, XPathException
    {
        String htmlPutanja = HTML_PUTANJA + "resenje-" + id + ".html";

        return new UspesnaTransformacija(this.transformator.generisiResenjeHTML(htmlPutanja, uzmiResenjeModel(id), jeGenerisanjePdf));
    }

    public UspesnaTransformacija procitajPdf(final String id)
            throws CannotUnmarshalException, TransformationFailedException, XPathException, IOException
    {

        return new UspesnaTransformacija(this.dodajResenjePdf(id));
    }

    public byte[] dodajResenjePdf(final String id)
            throws IOException, CannotUnmarshalException, TransformationFailedException, XPathException
    {
        String pdfPutanja = PDF_PUTANJA + "resenje-" + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + "resenje-" + id + ".html";
        this.dodajResenjeHtml(id, true);

        return this.transformator.generatePdf(htmlPutanja, pdfPutanja);
    }

    private KreiranoResenjeSaZahtevomDTO popuniPotrebnaPoljaZahteva(
        final String referenca_na_zahtev,
        final boolean dat_opis_autorskog_dela,
        final boolean dat_primer_autorskog_dela,
        final Resenje resenje,
        boolean prihvaceno
    ) throws CannotUnmarshalException, XPathException, InvalidDocumentException {
        String resenjeId = repository.save(resenje, true);
        ZahtevAutorskaDela zahtevAutorskaDela = autorskaPravaService.uzmiZahtevBezDTO(referenca_na_zahtev);
        zahtevAutorskaDela.setPregledano(true);
        zahtevAutorskaDela.setPrihvaceno(prihvaceno);
        zahtevAutorskaDela.setReferenca_na_resenje(resenje.getId());
        zahtevAutorskaDela.getPrilozi().setOpis_prilozen(dat_opis_autorskog_dela);
        zahtevAutorskaDela.getPrilozi().setPrimerak_prilozen(dat_primer_autorskog_dela);
        autorskaPravaService.saveToDBObj(zahtevAutorskaDela, false);

        return new KreiranoResenjeSaZahtevomDTO(resenjeId, zahtevAutorskaDela);
    }

    private Resenje checkSchema(String document) throws InvalidDocumentException {
        try {
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File(RESENJE_SCHEMA));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            Resenje resenje = (Resenje) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return resenje;
        } catch (JAXBException | SAXException e) {
            throw new InvalidDocumentException();
        }
    }
}

