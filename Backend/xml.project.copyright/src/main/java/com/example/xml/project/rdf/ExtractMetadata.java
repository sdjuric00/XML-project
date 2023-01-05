package com.example.xml.project.rdf;

import com.example.xml.project.util.AuthenticationUtilities;
import com.example.xml.project.util.SparqlUtil;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClients;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.update.UpdateRequest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.example.xml.project.rdf.RdfConstants.PREDICATE_NAMESPACE;


public abstract class ExtractMetadata {

    protected AuthenticationUtilities.ConnectionPropertiesFuseki connectionProperties;

    public ExtractMetadata(AuthenticationUtilities.ConnectionPropertiesFuseki connectionProperties){
        this.connectionProperties = connectionProperties;
    }

    protected Model createModel(){
        Model model = ModelFactory.createDefaultModel();
        model.setNsPrefix("pred", PREDICATE_NAMESPACE);
        return model;
    }

    protected void modelWrite(Model model, String namedGraphURI) throws IOException {
//        FusekiAuthenticationUtilities.ConnectionProperties conn = FusekiAuthenticationUtilities.loadProperties();
        model.write(System.out, SparqlUtil.NTRIPLES);
        // Issuing the SPARQL update...
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        model.write(out, SparqlUtil.NTRIPLES);

        // Updating the named graph with the triples from RDF model
        System.out.println("[INFO] Inserting the triples to a named graph \"" + namedGraphURI + "\".");
        String sparqlUpdate = SparqlUtil.insertData(connectionProperties.dataEndpoint + namedGraphURI, out.toString());
        System.out.println(sparqlUpdate);

        HttpClient hc = authHttpClient("admin", "pw123");

        // UpdateRequest represents a unit of execution
        UpdateRequest update = UpdateFactory.create(sparqlUpdate);

        // UpdateProcessor sends update request to a remote SPARQL update service.
        UpdateProcessor processor = UpdateExecutionFactory.createRemote(update, connectionProperties.updateEndpoint, hc);
        processor.execute();
    }

    protected void modelOverWrite(Model oldModel, Model newModel, String namedGraphURI){
        oldModel.write(System.out, SparqlUtil.NTRIPLES);
        newModel.write(System.out, SparqlUtil.NTRIPLES);
        // Issuing the SPARQL update...
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        oldModel.write(out, SparqlUtil.NTRIPLES);

        ByteArrayOutputStream outNew = new ByteArrayOutputStream();
        newModel.write(outNew, SparqlUtil.NTRIPLES);

//         Updating the named graph with the triples from RDF model
        System.out.println("[INFO] Inserting the triples to a named graph \"" + namedGraphURI + "\".");
        String sparqlUpdate = SparqlUtil.removeData(connectionProperties.dataEndpoint + namedGraphURI, out.toString());
        sparqlUpdate += ";\n" + SparqlUtil.insertData(connectionProperties.dataEndpoint + namedGraphURI, outNew.toString());
        System.out.println(sparqlUpdate);

        HttpClient hc = authHttpClient("admin", "pw123");

        // UpdateRequest represents a unit of execution
        UpdateRequest update = UpdateFactory.create(sparqlUpdate);

        // UpdateProcessor sends update request to a remote SPARQL update service.
        UpdateProcessor processor = UpdateExecutionFactory.createRemote(update, connectionProperties.updateEndpoint, hc);
        processor.execute();
    }

    protected HttpClient authHttpClient(String user, String password) {
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        Credentials credentials = new UsernamePasswordCredentials(user, password);
        credsProvider.setCredentials(AuthScope.ANY, credentials);
        return HttpClients.custom()
                .setDefaultCredentialsProvider(credsProvider)
                .build();
    }
}
