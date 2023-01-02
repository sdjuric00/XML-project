package com.example.xml.project.repository;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.Z1.ZahtevZig;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

import static com.example.xml.project.util.Constants.*;

@Component
public class ZigRepository extends BasicXMLRepository {
    public List<ZahtevZig> uzmiZahteve(final boolean obradjene) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        List<ZahtevZig> listaZahtevZig = new LinkedList<>();

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_ZIG_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_ZIG_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_ZIG_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", ZIG_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_ZIG_DB + "');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_priznanje_ziga[@pregledano='" + obradjene + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;

            while (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    ZahtevZig zahtev = (ZahtevZig) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                    listaZahtevZig.add(zahtev);
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
        return listaZahtevZig;
    }

    public ZahtevZig uzmiZahtev(final String id) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        ZahtevZig zahtevZig = null;

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_ZIG_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_ZIG_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_ZIG_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", ZIG_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_ZIG_DB + "');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_priznanje_ziga[@id='" + id + "']\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;
            if (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    zahtevZig = (ZahtevZig) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
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
        return zahtevZig;
    }

    public List<ZahtevZig> pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parameters) throws Exception {
        String xPathIzraz = "/zahtev_za_priznanje_ziga";
        List<ZahtevZig> listaRez = new LinkedList<>();
        try {
            ResourceSet rs = izvrsiXPathIzraz(COLLECTION_ID_ZIG_DB, xPathIzraz, ZIG_NAMESPACE);

            if (rs == null)
                return null;

            ResourceIterator i = rs.getIterator();
            XMLResource res = null;


            while (i.hasMoreResources()) {
                res = (XMLResource) i.nextResource();

                String xml = res.getContent().toString();
                System.out.println(xml);
                for (ParametarPretrage parameter : parameters) {
                    if (xml.contains(parameter.getParametar())) {
                        ZahtevZig zahtevZig = (ZahtevZig) XMLParser.unmarshal("", "", false, true, res);
                        if (!listaRez.contains(zahtevZig)) {

                            listaRez.add(zahtevZig);
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


    public static ResourceSet izvrsiXPathIzraz(final String collectionId, String xpathExp, String namespace) throws NoSuchMethodException, ClassNotFoundException, InstantiationException, IllegalAccessException, XMLDBException, IOException, InvocationTargetException {
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

    public IzvestajDTO generisiIzvestaj(final LocalDate pocetniDatum, final LocalDate krajnjiDatum) throws CannotUnmarshalException, XPathException {
        Collection col = null;
        XMLResource resXml = null;
        int ukupnoZahteva = 0;
        int brojOdobrenih = 0;
        int brojOdbijenih = 0;

        try {
            // get the collection
            System.out.println("[INFO] Retrieving the collection: " + COLLECTION_ID_ZIG_DB);
            col = DatabaseManager.getCollection(connectionProp.uri + COLLECTION_ID_ZIG_DB);
            if (col == null) {
                col = getOrCreateCollection(COLLECTION_ID_ZIG_DB);
            }
            col.setProperty(OutputKeys.INDENT, "yes");


            // get an instance of xpath query service
            XPathQueryService xpathService = (XPathQueryService) col.getService("XPathQueryService", "1.0");
            xpathService.setProperty("indent", "yes");

            // make the service aware of namespaces, using the default one
            xpathService.setNamespace("", ZIG_NAMESPACE);
            xpathService.setNamespace("opste", OPSTE_NAMESPACE);

            String pocetniDatumTekst = pocetniDatum.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String krajnjiDatumTekst = krajnjiDatum.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-zig');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_priznanje_ziga[xs:date(@datum_podnosenja)>xs:date('" +  pocetniDatumTekst + "') and xs:date(@datum_podnosenja)<xs:date('" +  krajnjiDatumTekst + "')]\n" +
                "return $v\n";

            System.out.println("[INFO] Invoking XPath query service for: " + xpathExp);
            ResourceSet result = xpathService.query(xpathExp);

            ResourceIterator i = result.getIterator();
            Resource res = null;
            while (i.hasMoreResources()) {
                try {
                    res = i.nextResource();
                    String response = (String) res.getContent();

                    JAXBContext context = JAXBContext.newInstance(ZahtevZig.class);

                    Unmarshaller unmarshaller = context.createUnmarshaller();

                    //noinspection unchecked
                    ZahtevZig zahtevZig = (ZahtevZig) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                    if (daLiJeOdobrenZahtev(zahtevZig)){
                        brojOdobrenih ++;
                    }

                    if (daLiJeOdbijenZahtev(zahtevZig)){
                        brojOdbijenih ++;
                    }
                    ukupnoZahteva ++;
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

        return new IzvestajDTO(ukupnoZahteva, brojOdobrenih, brojOdbijenih, ukupnoZahteva - brojOdobrenih - brojOdbijenih);
    }

    private boolean daLiJeOdobrenZahtev(ZahtevZig zahtevZig) {

        return zahtevZig.isPrihvaceno();
    }

    private boolean daLiJeOdbijenZahtev(ZahtevZig zahtevZig) {

        return zahtevZig.isPregledano() && !zahtevZig.isPrihvaceno();
    }
}