package com.example.xml.project.repository;

import com.example.xml.project.dto.IzvestajDTO;
import com.example.xml.project.exception.CannotUnmarshalException;
import com.example.xml.project.exception.XPathException;
import com.example.xml.project.model.A1.ZahtevAutorskaDela;
import com.example.xml.project.request.ParNaprednaPretraga;
import com.example.xml.project.request.ParametarPretrage;
import com.example.xml.project.util.SparqlUtil;
import org.apache.jena.query.*;
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
import java.io.ByteArrayOutputStream;
import java.io.StringReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import static com.example.xml.project.exception.ErrorMessagesConstants.NEPOSTOJECI_ID;
import static com.example.xml.project.rdf.RdfConstants.*;
import static com.example.xml.project.util.Constants.*;
import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.XMLParser;
import org.xmldb.api.base.ResourceIterator;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

@Component
public class AutorskaPravaRepository extends BasicXMLRepository {

    public List<ZahtevAutorskaDela> pronadjiRezultateOsnovnePretrage(List<ParametarPretrage> parameters, String idKorisnika) throws Exception {
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
                for (ParametarPretrage parameter : parameters) {
                    if (xml.contains(parameter.getParametar()) && (xml.contains(String.format("referenca_na_podnosioca=\"%s\"",idKorisnika)) || idKorisnika.equals(""))) {
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

    public List<ZahtevAutorskaDela> uzmiZahteve(boolean obradjene, String id) throws XPathException, CannotUnmarshalException {
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
            String xpathExp = "";
            if (id == NEPOSTOJECI_ID) {
                xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-autorska-prava');\n" +
                        "\n" +
                        "for $v in $data\n" +
                        "where $v//zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela[@pregledano='" + obradjene + "']\n" +
                        "return $v\n";
            } else {
                xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-autorska-prava');\n" +
                        "\n" +
                        "for $v in $data\n" +
                        "where $v//zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela[@pregledano='" + obradjene + "'] " +
                        "and $v//zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela[@referenca_na_podnosioca='" + id + "']\n" +
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

    public IzvestajDTO generisiIzvestaj(final LocalDate pocetniDatum, final LocalDate krajnjiDatum) throws CannotUnmarshalException, XPathException {
        Collection col = null;
        XMLResource resXml = null;
        int ukupnoZahteva = 0;
        int brojOdobrenih = 0;
        int brojOdbijenih = 0;

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

            String pocetniDatumTekst = pocetniDatum.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String krajnjiDatumTekst = krajnjiDatum.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String xpathExp = "declare variable $data as document-node()* := collection('/db/xml/zahtevi-autorska-prava');\n" +
                "\n" +
                "for $v in $data\n" +
                "where $v//zahtev_za_unosenje_u_evidenciju_i_deponovanje_autorskih_dela[xs:date(@datum_podnosenja)>xs:date('" +  pocetniDatumTekst + "') and xs:date(@datum_podnosenja)<xs:date('" +  krajnjiDatumTekst + "')]\n" +
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
                    ZahtevAutorskaDela zahtevAutorskaDela = (ZahtevAutorskaDela) unmarshaller.unmarshal(new StreamSource(new StringReader(response)));
                    if (daLiJeOdobrenZahtev(zahtevAutorskaDela)){
                        brojOdobrenih ++;
                    }

                    if (daLiJeOdbijenZahtev(zahtevAutorskaDela)){
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

    private boolean daLiJeOdobrenZahtev(ZahtevAutorskaDela zahtevAutorskaDela) {

        return zahtevAutorskaDela.isPrihvaceno();
    }

    private boolean daLiJeOdbijenZahtev(ZahtevAutorskaDela zahtevAutorskaDela) {

        return zahtevAutorskaDela.isPregledano() && !zahtevAutorskaDela.isPrihvaceno();
    }
    public String generisiJson(String id, AuthenticationUtilities.ConnectionPropertiesFuseki connectionPropertiesFuseki) throws IOException {
        String sparqlCondition = "VALUES ?subject { <" + AUTORSKO_DELO_NAMESPACE + id + "> }" +
                " ?subject ?predicate ?object .";
        String sparqlQuery = SparqlUtil.selectData(connectionPropertiesFuseki.dataEndpoint + AUTORSKO_DELO_NAMED_GRAPH_URI, sparqlCondition);

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
        String sparqlCondition = " <" + AUTORSKO_DELO_NAMESPACE + id + "> ?predicate ?object .";
        String sparqlQuery = SparqlUtil.constructData(connectionPropertiesFuseki.dataEndpoint + AUTORSKO_DELO_NAMED_GRAPH_URI, sparqlCondition);
        System.out.println(sparqlQuery);
        QueryExecution query = QueryExecutionFactory.sparqlService(connectionPropertiesFuseki.queryEndpoint, sparqlQuery);
        Model model = query.execConstruct();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        model.write(out, "N-Triples");

        return out.toString();
    }

    public List<ZahtevAutorskaDela> pronadjiRezultateNaprednePretrage(List<ParNaprednaPretraga> parametri, String idKorisnika) throws CannotUnmarshalException, XPathException {
        AuthenticationUtilities.ConnectionPropertiesFuseki conn = AuthenticationUtilities.setUpPropertiesFuseki();
//        SELECT * FROM <http://localhost:3030/ZigDataset/data/zig/metadata>
        // WHERE {?zig <http://www.patent.com/predicate/broj_prijave> ?broj_prijave . FILTER(CONTAINS(?broj_prijave,"Z-2023/4"))}

        StringBuilder sparqlQuery = new StringBuilder("SELECT * FROM <http://localhost:3030/AutorskoDeloDataset/data/autorsko-delo/metadata> WHERE {");
        for(ParNaprednaPretraga par : parametri){
            String naziv = par.getNaziv_elementa();
            sparqlQuery.append(String.format("?autorskodelo <http://www.autorsko-delo.com/predicate/%s> ?%s . ", naziv, naziv));
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
        List<ZahtevAutorskaDela> zahtevi = new ArrayList<>();
        while(results.hasNext()) {
            // A single answer from a SELECT sparqlQuery
            QuerySolution querySolution = results.next();

            Iterator<String> variableBindings = querySolution.varNames();
            // Retrieve variable bindings
            while (variableBindings.hasNext()) {
                varName = variableBindings.next();
                varValue = querySolution.get(varName);
                System.out.println(varName);
                if(varName.equals("autorskodelo")){
                    varValue = querySolution.get(varName);
                    String[] splitted = varValue.toString().split(".com/");
                    String idZahteva = splitted[1];
                    ZahtevAutorskaDela zahtev = uzmiZahtev(idZahteva);
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
}
