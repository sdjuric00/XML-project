package com.example.xml.project.util;

public class Constants {

    public static final String KORISNICI_SCHEMA = "./data/Korisnici.xsd";
    public static final String KORISNICI_NEW_XML = "./data/Korisnici.xml";
    public static final String COLLECTION_ID_KORISNICI_DB = "db/xml/korisnici";
    public static final String KORISNICI_NAMESPACE = "http://www.korisnici/korisnici";
    public static final String OPSTE_NAMESPACE = "http://ftn.ac.rs/opste";

    public static final String ISPRAVNA_LOZINKA_REG = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,100}$";
    public static final String ISPRAVNO_IME_REG = "^[A-Za-z]{1,1}[a-z]{1,20}([ ]?[A-Za-z]?[a-z]{1,20}|[a-z]{1,20})$";
    public static final String ISPRAVAN_BROJ_REG = "^[0-9A-Za-z ]{1,5}";
    public static final String ISPRAVAN_POSTANSKI_BROJ_REG = "^[0-9]{5}";
    public static final String ISPRAVAN_BROJ_TELEFONA_REG = "^(?!\\s*$)[0-9\\s]{8,12}$";
    public static final String ISPRAVAN_FAX_REG = "^[0][0-9]{8,9}";

    public static final String HTML_PUTANJA = "src/main/webapp/html/";
    public static final String PDF_PUTANJA = "src/main/webapp/pdf/";
    public static final String XSL_PUTANJA = "./data/izvestaj.xsl";

}
