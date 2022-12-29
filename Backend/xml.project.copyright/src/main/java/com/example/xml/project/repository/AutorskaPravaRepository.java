package com.example.xml.project.repository;

import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.XMLParser;
import org.exist.xmldb.EXistResource;
import org.springframework.stereotype.Component;
import org.xmldb.api.DatabaseManager;
import org.xmldb.api.base.ResourceIterator;
import org.xmldb.api.modules.XMLResource;
import org.xmldb.api.base.*;
import org.xmldb.api.modules.XPathQueryService;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

@Component
public class AutorskaPravaRepository extends BasicXMLRepository {
    private static final String collectionId = "/db/xml/zahtevi-autorska-prava";
    private static final String schemaName = "http://ftn.ac.rs/a";

    public List<ZahtevAutorskaDela> pronadjiRezultateOsnovnePretrage(List<String> parameters) throws Exception {
        String xPathIzraz = "/zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela";
        List<ZahtevAutorskaDela> listaRez = new ArrayList<ZahtevAutorskaDela>();
        try {
            ResourceSet rs = izvrsiXPathIzraz(collectionId, xPathIzraz, schemaName);

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

            if (res != null) {
                try {
                    ((EXistResource) res).freeResources();
                } catch (XMLDBException xe) {
                    xe.printStackTrace();
                }
            }

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
