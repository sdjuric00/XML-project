package com.example.xml.project.repository;

import com.example.xml.project.exception.EntityNotFoundException;
import com.example.xml.project.util.IdentifiableEntity;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.xmldb.api.base.*;
import org.xmldb.api.modules.XMLResource;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.time.Year;

import static com.example.xml.project.util.GeneratorId.generateId;

@Component
@Scope("prototype")
public class GenericRepository<T extends IdentifiableEntity> extends BasicXMLRepository {

    public String collectionPath;
    public JAXBContext context;

    public void setGenericRepositoryProperties(JAXBContext context, String collectionPath) {
        this.context = context;
        this.collectionPath = collectionPath;
    }

    public String save(T entity, boolean generateId) {
        OutputStream os = new ByteArrayOutputStream();
        Collection col = null;
        XMLResource res = null;
        int year = Year.now().getValue();

        try {
            System.out.println("[INFO] Retrieving the collection: " + collectionPath);
            col = getOrCreateCollection(collectionPath);

            if (generateId) {
                entity.setId(generateId(col.listResources()));
                entity.setBroj_prijave(String.format("A-%s/%s", year, entity.getId()));
            }

            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            marshaller.marshal(entity, os);

            String documentId = entity.getId() + ".xml";
            System.out.println("[INFO] Inserting the document: " + documentId);
            res = (XMLResource) col.createResource(documentId, XMLResource.RESOURCE_TYPE);

            res.setContent(os);
            System.out.println("[INFO] Storing the document: " + res.getId());

            col.storeResource(res);
            System.out.println("[INFO] Done.");

            return entity.getId();
        } catch (JAXBException | XMLDBException e) {
            e.printStackTrace();

            return "-1";
        } finally {
            cleanUp(col, res);
        }
    }

    public T get(String documentId) throws EntityNotFoundException, JAXBException {
        T entity = null;

            Unmarshaller unmarshaller = context.createUnmarshaller();

            //noinspection unchecked
            entity = (T) unmarshaller.unmarshal(super.retrieveXML(collectionPath, documentId));

        return entity;
    }
}

