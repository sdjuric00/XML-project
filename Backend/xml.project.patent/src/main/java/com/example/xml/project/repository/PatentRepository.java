package com.example.xml.project.repository;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.P1.ZahtevPatent;
import com.example.xml.project.rdf.RdfConstants;
import com.example.xml.project.request.ParNaprednaPretraga;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.XMLParser;
import com.example.xml.project.utils.SparqlUtil;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.exist.xmldb.EXistResource;
import org.springframework.stereotype.Component;
import org.xmldb.api.DatabaseManager;
import org.xmldb.api.base.*;
import org.xmldb.api.base.Collection;
import org.xmldb.api.modules.XMLResource;
import org.xmldb.api.modules.XPathQueryService;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.stream.StreamSource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.lang.reflect.InvocationTargetException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static com.example.xml.project.exception.ErrorMessagesConstants.NEPOSTOJECI_ID;
import static com.example.xml.project.rdf.RdfConstants.*;
import static com.example.xml.project.util.Constants.*;

@Component
public class PatentRepository extends BasicXMLRepository {

    public List<ZahtevPatent> uzmiZahteve(boolean obradjene, String id) throws XPathException, CannotUnmarshalException {
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
            String xpathExp = "";
            if (id == NEPOSTOJECI_ID) {
                xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_PATENTI_ZAHTEV_DB + "');\n" +
                        "\n" +
                        "for $v in $data\n" +
                        "where $v//zahtev_za_priznavanje_patenta[@pregledano='" + obradjene + "']\n" +
                        "return $v\n";
            } else {
                xpathExp = "declare variable $data as document-node()* := collection('/" + COLLECTION_ID_PATENTI_ZAHTEV_DB + "');\n" +
                        "\n" +
                        "for $v in $data\n" +
                        "where $v//zahtev_za_priznavanje_patenta[@pregledano='" + obradjene + "'] " +
                        "and $v//zahtev_za_priznavanje_patenta[@referenca_na_podnosioca='" + id + "']\n" +
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
        List<XMLResource> listaXMLRez = new LinkedList<>();
        try {
            ResourceSet rs = izvrsiXPathIzraz(COLLECTION_ID_PATENTI_ZAHTEV_DB, xPathIzraz, PATENT_NAMESPACE);

            if (rs == null)
                return null;

            ResourceIterator i = rs.getIterator();
            XMLResource res = null;

            while (i.hasMoreResources()) {
                res = (XMLResource) i.nextResource();

                String xml = res.getContent().toString();
                int j = 0;
                boolean postoji = true;
                while(j < parameters.size()){
                    if(!xml.contains(parameters.get(j).getParametar())){
                        postoji = false;
                    }
                    j += 1;
                }
                if(postoji) {
                    ZahtevPatent zahtevPatent = (ZahtevPatent) XMLParser.unmarshal("", "", false, true, res);
                    listaRez.add(zahtevPatent);
                }
//                for (int j=0;j<parameters.size();j++) {
//                    if (xml.contains(parameters.get(j).getParametar())) {
//                        if (j == 0) {
////                            ZahtevPatent zahtevPatent = (ZahtevPatent) XMLParser.unmarshal("", "", false, true, res);
//                            listaXMLRez.add(res);
//                        } else {
////                            ZahtevPatent zahtevPatent = (ZahtevPatent) XMLParser.unmarshal("", "", false, true, res);
//                            if (listaXMLRez.contains(res)) {
//                                listaXMLRez.add(res);
//                            }
//                        }
//                    }
//                }

//                    if (xml.contains(parameter.getParametar())) {
//                        ZahtevPatent zahtevPatent = (ZahtevPatent) XMLParser.unmarshal("", "", false, true, res);
////                        if (!listaRez.contains(zahtevPatent)) {
////                            listaRez.add(zahtevPatent);
////                        }
//
//                    }
//                for(String str : listaXMLRez){
//                    int frequency = Collections.frequency(listaXMLRez, str);
//                    if(frequency == parameters.size()){
//                        listaXMLRez.remove(str);
//                        ZahtevPatent zahtevPatent = (ZahtevPatent) XMLParser.unmarshal("", "", false, true, res);
//                        listaRez.add(zahtevPatent);
//                    }
//                }

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


    public IzvestajDTO generisiIzvestaj(final LocalDate pocetniDatum, final LocalDate krajnjiDatum) throws CannotUnmarshalException, XPathException {
        Collection col = null;
        XMLResource resXml = null;
        int ukupnoZahteva = 0;
        int brojOdobrenih = 0;
        int brojOdbijenih = 0;

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

            String pocetniDatumTekst = pocetniDatum.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String krajnjiDatumTekst = krajnjiDatum.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-patenti');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_priznavanje_patenta[xs:date(@datum_prijema)>xs:date('" +  pocetniDatumTekst + "') and xs:date(@datum_prijema)<xs:date('" +  krajnjiDatumTekst + "')]\n" +
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
                    ZahtevPatent zahtevPatent = (ZahtevPatent) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                    if (daLiJeOdobrenZahtev(zahtevPatent)){
                        brojOdobrenih ++;
                    }

                    if (daLiJeOdbijenZahtev(zahtevPatent)){
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

    private boolean daLiJeOdobrenZahtev(ZahtevPatent zahtevPatent) {

        return zahtevPatent.isPrihvaceno();
    }

    private boolean daLiJeOdbijenZahtev(ZahtevPatent zahtevPatent) {

        return zahtevPatent.isPregledano() && !zahtevPatent.isPrihvaceno();
    }
    public String generisiJson(String id, AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki) throws IOException {
        String sparqlCondition = "VALUES ?subject { <" + RdfConstants.PATENT_NAMESPACE_PATH + id + "> }" +
                " ?subject ?predicate ?object .";
        String sparqlQuery = SparqlUtil.selectData(connectionPropertiesFuseki.dataEndpoint + PATENT_NAMED_GRAPH_URI, sparqlCondition);

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
        String sparqlCondition = " <" + PATENT_NAMESPACE_PATH + id + "> ?predicate ?object .";
        String sparqlQuery = SparqlUtil.constructData(connectionPropertiesFuseki.dataEndpoint + PATENT_NAMED_GRAPH_URI, sparqlCondition);
        System.out.println(sparqlQuery);
        QueryExecution query = QueryExecutionFactory.sparqlService(connectionPropertiesFuseki.queryEndpoint, sparqlQuery);
        Model model = query.execConstruct();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        model.write(out, "N-Triples");

        return out.toString();
    }

    public List<ZahtevPatent> pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametri) throws CannotUnmarshalException, XPathException {
        AuthenticationUtilities.ConnectionPropertiesFuseki conn = AuthenticationUtilities.setUpPropertiesFuseki();

        StringBuilder sparqlQuery = new StringBuilder("SELECT * FROM <http://localhost:3030/PatentDataset/data/patent/metadata> WHERE {");
        for(ParNaprednaPretraga par : parametri){
            String naziv = par.getNaziv_elementa();
            sparqlQuery.append(String.format("?patent <http://www.patent.com/predicate/%s> ?%s . ", naziv, naziv));
        }
        sparqlQuery.append("FILTER(");
        for(int i=0;i<parametri.size();i++) {
            String naziv = parametri.get(i).getNaziv_elementa();
            String vrednost = parametri.get(i).getVrednost();
            String operator = getOperator(parametri.get(i).getOperator());

            if(operator.equals("!")){
                sparqlQuery.append(String.format("!CONTAINS(?%s,'%s')", naziv, vrednost));
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
        List<ZahtevPatent> zahtevi = new ArrayList<>();
        while(results.hasNext()) {
            // A single answer from a SELECT sparqlQuery
            QuerySolution querySolution = results.next();

            Iterator<String> variableBindings = querySolution.varNames();
            // Retrieve variable bindings
            while (variableBindings.hasNext()) {
                varName = variableBindings.next();
                varValue = querySolution.get(varName);
                System.out.println(varName);
                if(varName.equals("patent")){
                    varValue = querySolution.get(varName);
                    String[] splitted = varValue.toString().split(".com/");
                    String idZahteva = splitted[1];
                    ZahtevPatent zahtev = uzmiZahtev(idZahteva);
                    zahtevi.add(zahtev);
                }
            }
        }

        return zahtevi;
    }

    public String uzmiIdPoBrojuPrijave(String brojPrijave) throws XPathException, CannotUnmarshalException {
        Collection col = null;
        XMLResource resXml = null;
        String zahtevId = null;

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
                    "where $v//zahtev_za_priznavanje_patenta[@broj_prijave='" + brojPrijave + "']\n" +
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
                    zahtevId = ((ZahtevPatent) unmarshaller.unmarshal(new StreamSource(new StringReader(response)))).getId();
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
        return zahtevId;
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


}
