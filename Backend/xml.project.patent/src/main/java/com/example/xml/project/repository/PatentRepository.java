package com.example.xml.project.repository;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.XMLParser;
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
import java.io.IOException;
import java.io.StringReader;
import java.lang.reflect.InvocationTargetException;
import java.util.LinkedList;
import java.util.List;

import static com.example.xml.project.util.Constants.*;
import static com.example.xml.project.util.Constants.OPSTE_NAMESPACE;

@Component
public class PatentRepository extends BasicXMLRepository {
    public List<ZahtevPatent> uzmiZahteve(boolean obradjene) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        List<ZahtevPatent> listaZahtevaPatenata = new LinkedList<>();

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_PATENTI_ZAHTEV_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_PATENTI_ZAHTEV_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_PATENTI_ZAHTEV_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", PATENT_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_PATENTI_ZAHTEV_DB + "');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_priznavanje_patenta[@pregledano='" + obradjene + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;

            while (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevPatent.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    ZahtevPatent zahtev = (ZahtevPatent) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                    listaZahtevaPatenata.add(zahtev);
                } catch(XMLDBException e){
                    throw new XPathException();
                } catch (JAXBException e) {
                    throw new CannotUnmarshalException();
                } finally {
                    try {
                        if (res != null)
                            ((EXistResource)res).freeResources();
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
        return listaZahtevaPatenata;
    }

    public ZahtevPatent uzmiZahtev(String id) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        ZahtevPatent zahtevPatent = null;

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_PATENTI_ZAHTEV_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_PATENTI_ZAHTEV_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_PATENTI_ZAHTEV_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", PATENT_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_PATENTI_ZAHTEV_DB + "');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_priznavanje_patenta[@id='" + id + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;
            if (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevPatent.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    zahtevPatent = (ZahtevPatent) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
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
        return zahtevPatent;
    }

    public List<ZahtevPatent> pronadjiRezultateOsnovnePretrage(List<ParametarPretrage> parameters) throws Exception {
        String xPathIzraz = "/zahtev_za_priznavanje_patenta";
        List<ZahtevPatent> listaRez = new LinkedList<>();
        try {
            ResourceSet rs = izvrsiXPathIzraz(COLLECTION_ID_PATENTI_ZAHTEV_DB, xPathIzraz, PATENT_NAMESPACE);

            if (rs == null)
                return null;

            ResourceIterator i = rs.getIterator();
            XMLResource res = null;


            while (i.hasMoreResources()) {
                res = (XMLResource) i.nextResource();

                String xml = res.getContent().toString();
                System.out.println("tralala");
                System.out.println(xml);
                for (ParametarPretrage parameter : parameters) {
                    if (xml.contains(parameter.getParametar())) {
                        System.out.println("blabla");
                        ZahtevPatent zahtevPatent = (ZahtevPatent) XMLParser.unmarshal("", "", false, true, res);
                        if (!listaRez.contains(zahtevPatent)) {
                            System.out.println("listaa");
                            listaRez.add(zahtevPatent);
                        }
                    }
                }

            }
            if (res != null) {
                try {

                    ((EXistResource) res).freeResources();
                } catch (XMLDBException exception) {
                    exception.printStackTrace();
                }
            }

            return listaRez;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static ResourceSet izvrsiXPathIzraz(String collectionId, String xpathExp, String namespace) throws NoSuchMethodException, ClassNotFoundException, InstantiationException, IllegalAccessException, XMLDBException, IOException, InvocationTargetException {
        ResourceSet result;
        AuthenticationUtilities.ConnectionProperties conn = AuthenticationUtilities.loadProperties();

        Class<?> cl = Class.forName(conn.driver);

        Database database = (Database) cl.getDeclaredConstructor().newInstance();
        database.setProperty("create-database", "true");

        DatabaseManager.registerDatabase(database);

        Collection col = null;
        XMLResource res = null;

        try {
            col = DatabaseManager.getCollection(conn.uri + collectionId);

            if (col == null) {
                return null;
            }
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "2.0");
            xpathService.setProperty("indent", "yes");

            xpathService.setNamespace("", namespace);
            result = xpathService.query(xpathExp);
            System.out.println(result.getIterator().toString());
        } finally {
            if (col != null) {
                try {
                    col.close();
                } catch (XMLDBException xe) {
                    xe.printStackTrace();
                }
            }
        }
        return result;
    }

}
