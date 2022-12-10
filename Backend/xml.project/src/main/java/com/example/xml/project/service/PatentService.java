package com.example.xml.project.service;

import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.model.P1.ZahteviPatenti;
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

@Service
public class PatentService {

    public void savePatentDoc(String zahtevPatent) throws JAXBException, FileNotFoundException {
        ZahtevPatent zahtevPatent1 = checkSchema(zahtevPatent);
        JAXBContext jc = JAXBContext.newInstance(ZahtevPatent.class);
        Unmarshaller unmarshaller = jc.createUnmarshaller();
        File xml = new File("./data/P-1.xml");
        ZahtevPatent zahtevPatentObj = (ZahtevPatent) unmarshaller.unmarshal(xml);
        Marshaller marshaller = jc.createMarshaller();

//        // Konfiguracija marshaller-a custom prefiks maperom
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        OutputStream os = new FileOutputStream( "./data/P-1_new.xml" );
        marshaller.marshal(zahtevPatent1, os);
    }

    public ZahtevPatent checkSchema(String document) {
        try {
            JAXBContext context = JAXBContext.newInstance(ZahtevPatent.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File("./data/P-1.xsd"));

            // Podešavanje unmarshaller-a za XML schema validaciju
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            ZahtevPatent zahtevPatent = (ZahtevPatent) unmarshaller.unmarshal
                    (new StreamSource( new StringReader(document)));

            //noinspection unchecked
            return zahtevPatent;
        } catch (JAXBException | SAXException e) {
            e.printStackTrace();
            return null;
        }
    }
}
