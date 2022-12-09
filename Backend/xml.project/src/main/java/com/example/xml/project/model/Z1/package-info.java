@XmlSchema(
	namespace = "http://www.zig/zig",
	elementFormDefault = XmlNsForm.QUALIFIED,
	xmlns = {
		@XmlNs(prefix = "", namespaceURI = "http://www.zig/zig"),
		@XmlNs(prefix = "opste", namespaceURI = "http://ftn.ac.rs/opste"),
		@XmlNs(prefix = "xs", namespaceURI = "http://www.w3.org/2001/XMLSchema")}
)

package com.example.xml.project.model.Z1;

import javax.xml.bind.annotation.XmlNs;
import javax.xml.bind.annotation.XmlNsForm;
import javax.xml.bind.annotation.XmlSchema;
