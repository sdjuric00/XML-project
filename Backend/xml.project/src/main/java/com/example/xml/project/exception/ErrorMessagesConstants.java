package com.example.xml.project.exception;

public class ErrorMessagesConstants {
    public static final String UPDATE_ERROR_MESSAGE = "Entity cannot be updated due to server error.";
    public static final String UNAUTHORIZED_MESSAGE = "You are not authorized to perform this action.";
    public static final String POGRESNA_LOZINKA =
        "Lozinka mora da ima najmanje 8 karaktera (najmanje jedan broj i specijalni karakter)";
    public static final String POGRESNO_IME_MESSAGE = "Ime mora da sadrzi samo slova (ne predugacko).";
    public static final String POGRESNO_PREZIME_MESSAGE = "Prezime mora da sadrzi samo slova (ne predugacko).";
    public static final String POGRESAN_BROJ_TELEFONA = "Broj teledona mora da sadrži od 8 do 12 cifara.";
    public static final String POGRESAN_FAX = "Fax mora da počinje sa 0 i sadrži tačno 8 ili 9 cifara.";
    public static final String POGRESAN_GRAD = "Grad mora da sadrži izmedju 2 i 30 karaktera.";
    public static final String POGRESNA_ULICA = "Ulica mora da sadrži izmedju 2 i 30 karaktera.";
    public static final String POGRESNA_DRZAVA = "Drzava mora da sadrži izmedju 2 i 30 karaktera.";
    public static final String POGRESAN_BROJ= "Broj sadrži do 5 karaktera.";
    public static final String POGRESAN_POSTANSKI_BROJ = "Poštanski broj ime tačno 5 cifara.";
    public static final String POGRESAN_EMAIL = "Email nije ispravan.";
    public static final String PRAZAN_EMAIL = "Email ne sme biti prazan.";
    public static final String PREDUG_EMAIL = "Email je predugačak.";

    public static final String INVALID_DOCUMENT_EXCEPTION_MESSAGE = "Document is not valid.";
    public static final String NOT_FOUND_EXCEPTION_MESSAGE = "Document with id not found.";
    public static final String NIJE_PRONADJEN_KORISNIK_EXCEPTION_MESSAGE = "Korisnik nije pronadjen.";
    public static final String UNMARSHALLER_EXCEPTION_MESSAGE = "Cannot unmarshall document.";
    public static final String LOZINKE_SE_NE_POKLAPAJU = "Lozinke se ne poklapaju. Probajte ponovo.";
}
