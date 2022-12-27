package com.example.xml.project.repository;

import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.model.Korisnici.Korisnik;
import org.exist.xmldb.EXistResource;
import org.springframework.stereotype.Component;
import org.w3c.dom.Node;
import org.xmldb.api.DatabaseManager;
import org.xmldb.api.base.*;
import org.xmldb.api.modules.XMLResource;
import org.xmldb.api.modules.XPathQueryService;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.stream.StreamSource;

import java.io.StringReader;

import static com.example.xml.project.exception.ErrorMessagesConstants.NIJE_PRONADJEN_KORISNIK_EXCEPTION_MESSAGE;
import static com.example.xml.project.exception.ErrorMessagesConstants.NOT_FOUND_EXCEPTION_MESSAGE;
import static com.example.xml.project.util.Constants.*;

@Component
public class KorisniciRepository extends BasicXMLRepository {

    public Korisnik getKorisnikByEmail(String email, boolean trebaDaPostoji) throws EntityNotFoundException {
        Collection col = null;
        XMLResource resXml = null;
        Korisnik korisnik = null;

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_KORISNICI_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_KORISNICI_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_KORISNICI_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", KORISNICI_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);


            String xpathExp = String.format("//opste:kontakt[opste:email='%s']/..", email);

            // execute xpath expression
            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            // handle the results
            System.out.println("[INFO] Handling the results... ");

            ResourceIterator i = result.getIterator();
            Resource res = i.nextResource();

            if (trebaDaPostoji && res == null){
                throw new EntityNotFoundException(NIJE_PRONADJEN_KORISNIK_EXCEPTION_MESSAGE);
            }
            if (!trebaDaPostoji && res == null){
               return korisnik;
            }
            JAXBContext context = JAXBContext.newInstance(Korisnik.class);
            Unmarshaller u = context.createUnmarshaller();
            System.out.println(res.getContent());
            String str = res.getContent().toString();
            korisnik = (Korisnik) u.unmarshal(new StreamSource(new StringReader(str)));
            ((EXistResource)res).freeResources();


        } catch (XMLDBException e) {
            throw new EntityNotFoundException(NOT_FOUND_EXCEPTION_MESSAGE);
        } catch (JAXBException e) {
            e.printStackTrace();
        } finally {
            cleanUp(col, resXml);
        }
        return korisnik;
    }
}
