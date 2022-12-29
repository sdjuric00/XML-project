package com.example.xml.project.repository;

import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
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
import java.util.LinkedList;
import java.util.List;
import static com.example.xml.project.util.Constants.*;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.XMLParser;
import org.xmldb.api.base.ResourceIterator;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

@Component
public class AutorskaPravaRepository extends BasicXMLRepository {

    public List<ZahtevAutorskaDela> pronadjiRezultateOsnovnePretrage(List<String> parameters) throws Exception {
        String xPathIzraz = "/zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela";
        List<ZahtevAutorskaDela> listaRez = new ArrayList<ZahtevAutorskaDela>();
        try {
            ResourceSet rs = izvrsiXPathIzraz(COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB, xPathIzraz, AUTORSKA_PRAVA_NAMESPACE);

            if (rs == null)
                return null;

            ResourceIterator i = rs.getIterator();
            XMLResource res = null;


            while (i.hasMoreResources()) {
                res = (XMLResource) i.nextResource();

                String xml = res.getContent().toString();
                System.out.println(xml);
                for (String parameter : parameters) {
                    if (xml.contains(parameter)) {
                        ZahtevAutorskaDela zahtevAutorskaDela = (ZahtevAutorskaDela) XMLParser.unmarshal("", "", false, true, res);
                        if (!listaRez.contains(zahtevAutorskaDela)) {

                            listaRez.add(zahtevAutorskaDela);
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


    public static ResourceSet izvrsiXPathIzraz(String collectionId, String xpathExp, String namespace) throws IOException, NoSuchMethodException, ClassNotFoundException, InvocationTargetException, InstantiationException, IllegalAccessException, XMLDBException, IOException, InvocationTargetException {
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

    public List<ZahtevAutorskaDela> uzmiZahteve(boolean obradjene) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        List<ZahtevAutorskaDela> listaZahtevAutorskaDela = new LinkedList<>();

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", AUTORSKA_PRAVA_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-autorska-prava');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela[@pregledano='" + obradjene + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;

            while (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevAutorskaDela.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    ZahtevAutorskaDela zahtev = (ZahtevAutorskaDela) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                    listaZahtevAutorskaDela.add(zahtev);
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
        return listaZahtevAutorskaDela;
    }

    public ZahtevAutorskaDela uzmiZahtev(String id) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        ZahtevAutorskaDela zahtevAutorskaDela = null;

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_AUTORSKA_PRAVA_ZAHTEV_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", AUTORSKA_PRAVA_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-autorska-prava');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela[@id='" + id + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;
            if (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevAutorskaDela.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    zahtevAutorskaDela = (ZahtevAutorskaDela) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
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
        return zahtevAutorskaDela;
    }
}
