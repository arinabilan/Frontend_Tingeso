import httpClient from "../http-common";

const uploadDocument = (clientId, documentId, formData) => {
    return httpClient.postForm(`/api/v1/clientdocuments/file/${clientId}/${documentId}`, formData);
}

const getAllDocuments = () => {
    return httpClient.get('/api/v1/documents/');
}

const getDocumentsByClientId = (id) => {
    return httpClient.get(`/api/v1/clientdocuments/${id}`);
}

const getDocumentByTitle = (title) => {
    return httpClient.get(`/api/v1/documents/title/${title}`);
}

export default {uploadDocument, getAllDocuments, getDocumentsByClientId, getDocumentByTitle};