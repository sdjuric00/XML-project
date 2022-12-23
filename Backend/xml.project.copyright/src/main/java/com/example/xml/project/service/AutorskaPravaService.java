package com.example.xml.project.service;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;
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
public class AutorskaPravaService {

    public void save(String doc) throws JAXBException, FileNotFoundException {
        ZahtevAutorskaDela zahtevAutorskaDela = checkSchema(doc);
        JAXBContext jc = JAXBContext.newInstance(ZahtevAutorskaDela.class);

        Marshaller marshaller = jc.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        OutputStream os = new FileOutputStream( "./data/A-1_new.xml" );
        marshaller.marshal(zahtevAutorskaDela, os);
    }

    public ZahtevAutorskaDela checkSchema(String document) {
        try {
            JAXBContext context = JAXBContext.newInstance(ZahtevAutorskaDela.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();

            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(new File("./data/A-1.xsd"));
            unmarshaller.setSchema(schema);
            document.replace("\n","");
            ZahtevAutorskaDela zahtevAutorskaDela = (ZahtevAutorskaDela) unmarshaller.unmarshal
                (new StreamSource( new StringReader(document)));

            return zahtevAutorskaDela;
        } catch (JAXBException | SAXException e) {
            e.printStackTrace();
            return null;
        }
    }
}
