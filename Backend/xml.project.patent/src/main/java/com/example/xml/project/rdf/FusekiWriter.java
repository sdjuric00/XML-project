//package com.example.xml.project.rdf;
//
//import com.example.xml.project.utils.AuthenticationUtils;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//
//import com.example.xml.project.utils.SparqlUtil;
//import org.apache.jena.rdf.model.Model;
//import org.apache.jena.rdf.model.ModelFactory;
//import org.apache.jena.update.UpdateExecutionFactory;
//import org.apache.jena.update.UpdateFactory;
//import org.apache.jena.update.UpdateProcessor;
//import org.apache.jena.update.UpdateRequest;
//
//import static com.example.xml.project.utils.Constants.PATENT_RDF;
//
//public class FusekiWriter {
//    private static final String GRAPH_URI = "metadata";
//
//    public static void saveRDF() throws IOException {
//        System.out.println("[INFO] Loading triples from an RDF/XML to a model...");
//        AuthenticationUtils.ConnectionPropertiesFuseki conn = AuthenticationUtils.loadPropertiesFuseki();
//
//        Model model = ModelFactory.createDefaultModel();
//        model.read(PATENT_RDF);
//
//        ByteArrayOutputStream out = new ByteArrayOutputStream();
//        model.write(out, SparqlUtil.NTRIPLES);
//        System.out.println("[INFO] Rendering model as RDF/XML...");
//        model.write(System.out, SparqlUtil.RDF_XML);
//
//        UpdateRequest request = UpdateFactory.create();
//        UpdateProcessor processor = UpdateExecutionFactory.createRemote(request,conn.updateEndpoint);
//        processor.execute();
//        System.out.println("[INFO] Writing the triples to a named graph \"" + GRAPH_URI + "\".");
//        String sparqlUpdate = SparqlUtil.insertData(conn.dataEndpoint + "/"+GRAPH_URI,
//                new String(out.toByteArray()));
//        System.out.println(sparqlUpdate);
//
//        UpdateRequest update = UpdateFactory.create(sparqlUpdate);
//        processor = UpdateExecutionFactory.createRemote(update,conn.updateEndpoint);
//        processor.execute();
//
//    }
//}
