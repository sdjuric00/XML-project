package com.example.xml.project.repository;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.Z1.ZahtevZig;
import com.example.xml.project.request.ParNaprednaPretraga;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.SparqlUtil;
import com.example.xml.project.util.XMLParser;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import org.apache.jena.query.*;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;

import static com.example.xml.project.exception.ErrorMessagesConstants.NEPOSTOJECI_ID;
import static com.example.xml.project.rdf.RdfConstants.*;
import static com.example.xml.project.util.Constants.*;

@Component
public class ZigRepository extends BasicXMLRepository {
    public List<ZahtevZig> uzmiZahteve(final boolean obradjene, final String id) throws XPathException, CannotUnmarshalException {
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
            String xpathExp = "";
            if (id == NEPOSTOJECI_ID) {
                xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_ZIG_DB + "');\n" +
                        "\n" +
                        "for $v in $data\n" +
                        "where $v//zahtev_za_priznanje_ziga[@pregledano='" + obradjene + "']\n" +
                        "return $v\n";
            } else {
                xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_ZIG_DB + "');\n" +
                        "\n" +
                        "for $v in $data\n" +
                        "where $v//zahtev_za_priznanje_ziga[@pregledano='" + obradjene + "'] " +
                        "and $v//zahtev_za_priznanje_ziga[@referenca_na_podnosioca='" + id + "']\n" +
                        "return $v\n";
            }

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

    public List<ZahtevZig> pronadjiRezultateOsnovnePretrage(final List<ParametarPretrage> parameters, final String idKorisnika) throws Exception {
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
                    if (xml.contains(parameter.getParametar()) && (xml.contains(String.format("referenca_na_podnosioca=\"%s\"",idKorisnika)) || idKorisnika.equals(""))) {
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

    public List<ZahtevZig> pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametri, String idKorisnika) throws CannotUnmarshalException, XPathException {
        AuthenticationUtilities.ConnectionPropertiesFuseki conn = AuthenticationUtilities.setUpPropertiesFuseki();
//        SELECT * FROM <http://localhost:3030/ZigDataset/data/zig/metadata>
        // WHERE {?zig <http://www.patent.com/predicate/broj_prijave> ?broj_prijave . FILTER(CONTAINS(?broj_prijave,"Z-2023/4"))}

        StringBuilder sparqlQuery = new StringBuilder("SELECT * FROM <http://localhost:3030/ZigDataset/data/zig/metadata> WHERE {");
        for(ParNaprednaPretraga par : parametri){
            String naziv = par.getNaziv_elementa();
            sparqlQuery.append(String.format("?zig <http://www.patent.com/predicate/%s> ?%s . ", naziv, naziv));
        }
        sparqlQuery.append("FILTER(");
        boolean operatorIspred = false;
        for(int i=0;i<parametri.size();i++) {
            String naziv = parametri.get(i).getNaziv_elementa();
            String vrednost = parametri.get(i).getVrednost();
            String operator = getOperator(parametri.get(i).getOperator());
            if(operator.equals("!")){
                sparqlQuery.append(String.format("!CONTAINS(?%s,'%s')", naziv, vrednost));
                operatorIspred = true;
            }
            else if(operatorIspred){
                sparqlQuery.append(String.format(" %s CONTAINS(?%s,'%s')", operator, naziv, vrednost));
            }
            else if(i == parametri.size() - 1){
                sparqlQuery.append(String.format("CONTAINS(?%s,'%s')", naziv, vrednost));
            }
            else{
                sparqlQuery.append(String.format("CONTAINS(?%s,'%s') %s ", naziv, vrednost, operator));
            }
        }
        sparqlQuery.append(")}");
        System.out.println(sparqlQuery);
        QueryExecution query = QueryExecutionFactory.sparqlService(conn.queryEndpoint, sparqlQuery.toString());
        ResultSet results = query.execSelect();
        String varName;
        RDFNode varValue;
        List<ZahtevZig> zahtevi = new ArrayList<>();
        while(results.hasNext()) {
            // A single answer from a SELECT sparqlQuery
            QuerySolution querySolution = results.next();

            Iterator<String> variableBindings = querySolution.varNames();
            // Retrieve variable bindings
            while (variableBindings.hasNext()) {
                varName = variableBindings.next();
                varValue = querySolution.get(varName);
                System.out.println(varName);
                if(varName.equals("zig")){
                    varValue = querySolution.get(varName);
                    String[] splitted = varValue.toString().split(".com/");
                    String idZahteva = splitted[1];
                    ZahtevZig zahtev = uzmiZahtev(idZahteva);
                    if(zahtev.getReferenca_na_podnosioca().equals(idKorisnika) || idKorisnika.equals("")) {
                        zahtevi.add(zahtev);
                    }
                }
            }
        }

        return zahtevi;
    }

    private String getOperator(String operator){
        System.out.println(operator);
        String operatorZnak = "";
        switch (operator) {
            case "I":
                operatorZnak = "&&";
                break;
            case "ILI":
                operatorZnak = "||";
                break;
            case "NE":
                operatorZnak = "!";
                break;
        }
        System.out.println(operatorZnak);
        return operatorZnak;
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
    public String generisiJson(String id, AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki) throws IOException {
        String sparqlCondition = "VALUES ?subject { <" + ZIG_NAMESPACE_PATH + id + "> }" +
                " ?subject ?predicate ?object .";
        String sparqlQuery = SparqlUtil.selectData(connectionPropertiesFuseki.dataEndpoint + ZIG_NAMED_GRAPH_URI, sparqlCondition);

        // Create a QueryExecution that will access a SPARQL service over HTTP
        QueryExecution query = QueryExecutionFactory.sparqlService(connectionPropertiesFuseki.queryEndpoint, sparqlQuery);
        ResultSet results = query.execSelect();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ResultSetFormatter.outputAsJSON(byteArrayOutputStream, results);
        String json = new String(byteArrayOutputStream.toByteArray(), StandardCharsets.UTF_8);
        int indexOfSubStr = json.indexOf("bindings");
        String newJson  = String.format("{\n  %s", json.substring(indexOfSubStr - 1)); // creating substring from results to end
        byteArrayOutputStream.close();
        query.close();
        return newJson;
    }

    public String generisiRdf(String id, AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki) {
        String sparqlCondition = " <" + ZIG_NAMESPACE_PATH + id + "> ?predicate ?object .";
        String sparqlQuery = SparqlUtil.constructData(connectionPropertiesFuseki.dataEndpoint + ZIG_NAMED_GRAPH_URI, sparqlCondition);
        System.out.println(sparqlQuery);
        QueryExecution query = QueryExecutionFactory.sparqlService(connectionPropertiesFuseki.queryEndpoint, sparqlQuery);
        Model model = query.execConstruct();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        model.write(out, "N-Triples");

        return out.toString();
    }
}