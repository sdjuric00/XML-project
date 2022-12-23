@XmlSchema(
	namespace = "http://www.patent/patent",
	elementFormDefault = XmlNsForm.QUALIFIED,
	xmlns = {
		@XmlNs(prefix = "", namespaceURI = "http://www.patent/patent"),
		@XmlNs(prefix = "opste", namespaceURI = "http://ftn.ac.rs/opste"),
		@XmlNs(prefix = "xs", namespaceURI = "http://www.w3.org/2001/XMLSchema")}
)

package com.example.xml.project.model.P1;

import javax.xml.bind.annotation.XmlNs;
import javax.xml.bind.annotation.XmlNsForm;
import javax.xml.bind.annotation.XmlSchema;
