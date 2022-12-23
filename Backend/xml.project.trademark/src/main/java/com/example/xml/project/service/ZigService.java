package com.example.xml.project.service;

import com.example.xml.project.model.Z1.ZahtevZig;
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
public class ZigService {

    public void saveTrademarkDoc(String zahtev) throws JAXBException, FileNotFoundException {
        ZahtevZig zahtevZig1 = checkSchema(zahtev);
        JAXBContext jc = JAXBContext.newInstance(ZahtevZig.class);
        Unmarshaller unmarshaller = jc.createUnmarshaller();
        File xml = new File("./data/Z-1.xml");
        ZahtevZig zahtevZigObj = (ZahtevZig) unmarshaller.unmarshal(xml);
        Marshaller marshaller = jc.createMarshaller();

//        // Konfiguracija marshaller-a custom prefiks maperom
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        OutputStream os = new FileOutputStream( "./data/Z-1_new.xml" );
        marshaller.marshal(zahtevZig1, os);
    }

    public ZahtevZig checkSchema(String document) {
        try {
            JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File("./data/Z-1.xsd"));

            // Podešavanje unmarshaller-a za XML schema validaciju
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            ZahtevZig zahtevZig = (ZahtevZig) unmarshaller.unmarshal
                    (new StreamSource( new StringReader(document)));

            //noinspection unchecked
            return zahtevZig;
        } catch (JAXBException | SAXException e) {
            e.printStackTrace();
            return null;
        }
    }

}
