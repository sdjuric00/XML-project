package com.example.xml.project.service;

import com.example.xml.project.dto.ZahtevZigDetaljneInformacijeDTO;
import com.example.xml.project.dto.ZahteviZigDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.exception.InvalidDocumentException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.exception.TransformationFailedException;
import com.example.xml.project.model.Institucija;
import com.example.xml.project.model.Podnosilac;
import com.example.xml.project.model.Punomocnik;
import com.example.xml.project.model.Z1.*;
import com.example.xml.project.model.Z1.enums.ZigEnum;
import com.example.xml.project.rdf.ZigExtractMetadata;
import com.example.xml.project.repository.GenericRepository;
import com.example.xml.project.repository.ZigRepository;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.response.UspesnaTransformacija;
import com.example.xml.project.transformator.Transformator;
import com.example.xml.project.util.AuthenticationUtilities;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
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
import java.time.LocalDate;
import java.util.List;

import static com.example.xml.project.util.Constants.*;
import static com.example.xml.project.util.SlikeTransformator.sacuvajSliku;

@Service
public class ZigService {

    private final GenericRepository<ZahtevZig> repository;
    private final ZigRepository zigRepository;
    private final JAXBContext jaxbContext;
    private final Marshaller marshaller;
    private final Transformator transformator;

    private final ZigExtractMetadata zigExtractMetadata;

    public ZigService (
        @Autowired final GenericRepository<ZahtevZig> repository,
        @Autowired final ZigRepository zigRepository,
        @Autowired final Transformator transformator,
        @Autowired final ZigExtractMetadata zigExtractMetadata
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
        this.zigExtractMetadata = zigExtractMetadata;

        this.marshaller = jaxbContext.createMarshaller();
        this.marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
    }


    public void saveToXmlFile(final String zahtev) throws JAXBException, FileNotFoundException, InvalidDocumentException {
        ZahtevZig zahtevAutorskaDela = checkSchema(zahtev);

        OutputStream os = new FileOutputStream(ZIG_NEW_XML);
        marshaller.marshal(zahtevAutorskaDela, os);
    }

    public ZahtevZig saveToDB(String zahtev) throws InvalidDocumentException {
        ZahtevZig zahtevZig = checkSchema(zahtev);
        repository.save(zahtevZig, true);
        return zahtevZig;
    }

    public void saveToDBObj(ZahtevZig zahtevZig, boolean generisiId) throws InvalidDocumentException {

        repository.save(zahtevZig, generisiId);
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


    public ZahtevZig uzmiZahtevBezDTO(final String id) throws CannotUnmarshalException, XPathException {

        return zigRepository.uzmiZahtev(id);
    }

    public UspesnaTransformacija dodajHtml(String id)
            throws JAXBException, EntityNotFoundException, TransformationFailedException, IOException
    {
        String htmlPutanja = HTML_PUTANJA + id + ".html";

        return new UspesnaTransformacija(this.transformator.generateHTML(htmlPutanja, get(id)));
    }

    public ZahteviZigDTO pronadjiRezultateOsnovnePretrage(List<ParametarPretrage> parametriPretrage) throws Exception {
        ZahteviZigDTO zahteviDTO = new ZahteviZigDTO();
        zahteviDTO.fromZahtevi(zigRepository.pronadjiRezultateOsnovnePretrage(parametriPretrage));
        return zahteviDTO;
    }

    public UspesnaTransformacija dodajPdf(String id) throws JAXBException, EntityNotFoundException,
            IOException, TransformationFailedException {
        String pdfPutanja = PDF_PUTANJA + id + ".pdf";
        String htmlPutanja = HTML_PUTANJA + id + ".html";
        this.dodajHtml(id);  //prvo se pravi html za slucaj da ne postoji

        return new UspesnaTransformacija(this.transformator.generatePdf(htmlPutanja, pdfPutanja));
    }

    public UspesnaTransformacija generisiJson(String id) throws IOException {
        AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki = AuthenticationUtilities.setUpPropertiesFuseki();
        ObjectMapper mapper = new ObjectMapper();
        File file = new File(JSON_PUTANJA + id + ".json");
        Object json = mapper.readValue(zigRepository.generisiJson(id, connectionPropertiesFuseki), Object.class);
        String prettyFormat = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
        System.out.println(prettyFormat);
        mapper.writeValue(file, prettyFormat);
        return new UspesnaTransformacija(FileUtils.readFileToByteArray(file));
    }

    public UspesnaTransformacija generisiRdf(String id) throws IOException {
        AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki = AuthenticationUtilities.setUpPropertiesFuseki();
        ObjectMapper mapper = new ObjectMapper();
        File file = new File(RDF_PUTANJA + id + ".rdf");

        mapper.writeValue(file, zigRepository.generisiRdf(id, connectionPropertiesFuseki));
        return new UspesnaTransformacija(FileUtils.readFileToByteArray(file));
    }

    public void saveNewRequest(
            String id,
            final String broj_prijave,
            final LocalDate datum_podnosenja,
            final boolean pregledano,
            final ZigEnum zig,
            final Institucija institucija,
            final List<Podnosilac> podnosioci,
            final Punomocnik punomocnik,
            final PodaciOZajednickomPredstavniku podaci_o_zajednickom_predstavniku,
            final Znak znak, List<OdabraneKategorije> nicanska_klasifikacija,
            final PravoPrvenstva pravo_prvenstva,
            PlaceneTakse placene_takse,
            Prilozi prilozi
    ) throws JAXBException, InvalidDocumentException, TransformationFailedException, IOException {
        prilozi = sacuvajSlike(prilozi);
        placene_takse = izracunajTakse(placene_takse, nicanska_klasifikacija.size());
        if (id == null) {
            id = "1";    //zbog check seme da validira, posle ce setovati dobar broj
        }

        ZahtevZig zahtev = new ZahtevZig(id, broj_prijave, datum_podnosenja, pregledano, zig, institucija, podnosioci,
                punomocnik, podaci_o_zajednickom_predstavniku, znak, nicanska_klasifikacija, pravo_prvenstva, placene_takse, prilozi);
        Marshaller marshaller = jaxbContext.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        StringWriter sw = new StringWriter();
        marshaller.marshal(zahtev, sw);

        ZahtevZig validirano = this.saveToDB(sw.toString());
        this.zigExtractMetadata.extract(validirano);
    }

    private PlaceneTakse izracunajTakse(PlaceneTakse placeneTakse, int brojKlasa) {
        placeneTakse.setValuta(EUR);
        placeneTakse.setOsnovna_taksa(OSNOVNA_TAKSA);
        placeneTakse.setTaksa_za_graficko_resenje(TAKSA_ZA_GRAFICKO_RESENJE);
        placeneTakse.setTaksa_za_klasu(brojKlasa * TAKSA_PO_KLASI);
        placeneTakse.setUkupno(OSNOVNA_TAKSA + TAKSA_ZA_GRAFICKO_RESENJE + placeneTakse.getTaksa_za_klasu());

        return placeneTakse;
    }

    private Prilozi sacuvajSlike(Prilozi prilozi) throws TransformationFailedException {
        if (!prilozi.getDokaz_o_pravu_prvenstva_putanja().equals("")) {
            prilozi.setDokaz_o_pravu_prvenstva_putanja(sacuvajSliku(prilozi.getDokaz_o_pravu_prvenstva_putanja()));
        } else if (!prilozi.getDokaz_o_uplati_takse_putanja().equals("")) {
            prilozi.setDokaz_o_pravu_prvenstva_putanja(sacuvajSliku(prilozi.getDokaz_o_uplati_takse_putanja()));
        } else if (!prilozi.getOpsti_akt_o_kolektivnom_zigu_garancije_putanja().equals("")) {
            prilozi.setDokaz_o_pravu_prvenstva_putanja(sacuvajSliku(prilozi.getOpsti_akt_o_kolektivnom_zigu_garancije_putanja()));
        } else if (!prilozi.getPunomocje_putanja().equals("")) {
            prilozi.setDokaz_o_pravu_prvenstva_putanja(sacuvajSliku(prilozi.getPunomocje_putanja()));
        } else if (!prilozi.getPrimerak_znaka_putanja().equals("")) {
            prilozi.setDokaz_o_pravu_prvenstva_putanja(sacuvajSliku(prilozi.getPrimerak_znaka_putanja()));
        }

        return prilozi;
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
