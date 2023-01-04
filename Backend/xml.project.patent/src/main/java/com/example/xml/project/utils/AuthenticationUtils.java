package com.example.xml.project.utils;

import com.example.xml.project.util.AuthenticationUtilities;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AuthenticationUtils {
    static public class ConnectionPropertiesFuseki {

        public String endpoint;
        public String dataset;

        public String queryEndpoint;
        public String updateEndpoint;
        public String dataEndpoint;


        public ConnectionPropertiesFuseki(Properties props) {
            super();
            System.out.println(props);
            dataset = props.getProperty("conn.dataset").trim();
            endpoint = props.getProperty("conn.endpoint").trim();

            queryEndpoint = String.join("/", endpoint, dataset, props.getProperty("conn.query").trim());
            updateEndpoint = String.join("/", endpoint, dataset, props.getProperty("conn.update").trim());
            dataEndpoint = String.join("/", endpoint, dataset, props.getProperty("conn.data").trim());



//            queryEndpoint = "http://localhost:8080/fuseki/patentDataset/query";
//            updateEndpoint = "http://localhost:8080/fuseki/patentDataset/update";
//            dataEndpoint = "http://localhost:8080/fuseki/patentDataset/data";
            System.out.println("[INFO] Parsing connection properties:");
            System.out.println("[INFO] Query endpoint: " + queryEndpoint);
            System.out.println("[INFO] Update endpoint: " + updateEndpoint);
            System.out.println("[INFO] Graph store endpoint: " + dataEndpoint);
        }
    }

    /**
     * Read the configuration properties for the example.
     *
     * @return the configuration object
     */
    public static ConnectionPropertiesFuseki loadPropertiesFuseki() throws IOException {
        String propsName = "fuseki.properties";

        InputStream propsStream = openStreamFuseki(propsName);
        if (propsStream == null)
            throw new IOException("Could not read properties " + propsName);

        Properties props = new Properties();
        props.load(propsStream);

        return new ConnectionPropertiesFuseki(props);
    }

    /**
     * Read a resource for an example.
     *
     * @param fileName
     *            the name of the resource
     * @return an input stream for the resource
     * @throws IOException
     */
    public static InputStream openStreamFuseki(String fileName) throws IOException {
        return AuthenticationUtils.class.getClassLoader().getResourceAsStream(fileName);
    }

    private static String connectionUri = "xmldb:exist://%1$s:%2$s/exist/xmlrpc";

    /**
     * Connection parameters.
     */
    static public class ConnectionProperties {

        public String host;
        public int port = -1;
        public String user;
        public String password;
        public String driver;
        public String uri;

        public ConnectionProperties(Properties props) {
            super();

            user = props.getProperty("conn.user").trim();
            password = props.getProperty("conn.password").trim();

            host = props.getProperty("conn.host").trim();
            port = Integer.parseInt(props.getProperty("conn.port"));

            uri = String.format(connectionUri, host, port);

            driver = props.getProperty("conn.driver").trim();
        }
    }

    /**
     * Read the configuration properties for the example.
     *
     * @return the configuration object
     */
    public static AuthenticationUtilities.ConnectionProperties loadProperties() throws IOException {
        String propsName = "exist.properties";

        InputStream propsStream = openStream(propsName);
        if (propsStream == null)
            throw new IOException("Could not read properties " + propsName);

        Properties props = new Properties();
        props.load(propsStream);

        return new AuthenticationUtilities.ConnectionProperties(props);
    }

    /**
     * Read a resource for an example.
     *
     * @param fileName
     *            the name of the resource
     * @return an input stream for the resource
     * @throws IOException
     */
    public static InputStream openStream(String fileName) throws IOException {
        return AuthenticationUtilities.class.getClassLoader().getResourceAsStream(fileName);
    }

//    public static ConnectionPropertiesFuseki setUpPropertiesFuseki() {
//        Properties props = new Properties();
//        props.setProperty("conn.endpoint", "http://localhost:3030/fuseki");
//        props.setProperty("conn.dataset", "patentDataset");
//        props.setProperty("conn.query", "query");
//        props.setProperty("conn.update", "update");
//        props.setProperty("conn.data", "data");
//        return new ConnectionPropertiesFuseki(props);
//    }

}

