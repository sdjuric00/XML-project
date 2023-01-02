package com.example.xml.project.repository;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.model.Z1.resenje.Resenje;
import org.exist.xmldb.EXistResource;
import org.springframework.stereotype.Component;
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

import static com.example.xml.project.util.Constants.*;
import static com.example.xml.project.util.Constants.COLLECTION_ID_ZIG_DB;

@Component
public class ResenjeRepository extends BasicXMLRepository {

    public Resenje uzmi(final String id) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        Resenje resenje = null;

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_RESENJE_ZIG_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_RESENJE_ZIG_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_RESENJE_ZIG_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one


            String xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_RESENJE_ZIG_DB + "');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//resenje[@id='" + id + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;
            if (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(Resenje.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    resenje = (Resenje) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                } catch (XMLDBException e) {
                    throw new XPathException();
                } catch (JAXBException e) {
                    throw new CannotUnmarshalException();
                } finally {
                    try {
                        if (res != null)
                            ((EXistResource) res).freeResources();
                    } catch (XMLDBException xe) {
                        xe.printStackTrace();
                    }
                }
            }
        } catch (XMLDBException | XPathException e) {
            throw new XPathException();
        } catch (CannotUnmarshalException e) {
            throw new CannotUnmarshalException();
        } finally {
            cleanUp(col, resXml);
        }
        return resenje;
    }
}
