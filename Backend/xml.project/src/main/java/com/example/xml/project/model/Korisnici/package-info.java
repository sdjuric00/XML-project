@XmlSchema(
	namespace = "http://www.korisnici/korisnici",
	elementFormDefault = XmlNsForm.QUALIFIED,
	xmlns = {
		@XmlNs(prefix = "", namespaceURI = "http://www.korisnici/korisnici"),
		@XmlNs(prefix = "opste", namespaceURI = "http://ftn.ac.rs/opste"),
		@XmlNs(prefix = "xs", namespaceURI = "http://www.w3.org/2001/XMLSchema")}
)

package com.example.xml.project.model.Korisnici;

import javax.xml.bind.annotation.XmlNs;
import javax.xml.bind.annotation.XmlNsForm;
import javax.xml.bind.annotation.XmlSchema;

//
//@XmlSchema(
//	namespace = "http://www.ftn.uns.ac.rs/xwt",
//	elementFormDefault = javax.xml.bind.annotation.XmlNsForm.QUALIFIED,
//	xmlns = {@javax.xml.bind.annotation.XmlNs(prefix = "", namespaceURI="http://www.ftn.uns.ac.rs/xwt"),
//		@javax.xml.bind.annotation.XmlNs(prefix="xs", namespaceURI="http://www.w3.org/2001/XMLSchema")}
//)
//package com.example.xml.project.model;
//
//import javax.xml.bind.annotation.*;
//package com.example.xml.project.model;