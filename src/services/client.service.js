import httpClient from "../http-common";

const getAll = () => {
    
    return httpClient.get('/api/v1/clients/');

}

const getClient = (id) => {
    return httpClient.get(`/api/v1/clients/${id}`);
}

const clientRegister = userData => {
    
    return httpClient.post('/api/v1/clients/', userData);

}

const loginClient = credentials => {
    
    //return httpClient.post('/api/v1/clients/login/email', credentials);
    return httpClient.post('/api/v1/clients/login/email', {
        email: credentials.email,
        password: credentials.password
    });
    
}

const savingCapacity = clientData => {
    return httpClient.post('/api/v1/savingCapacity/', clientData);
}

const createDates = clientData => {
    return httpClient.post('/api/v1/clientdates/', clientData);
}

const getClientDates = (id) => {
    return httpClient.get(`/api/v1/clientdates/${id}`);
}

const getClientCapacity = (id) => {
    return httpClient.get(`/api/v1/savingCapacity/${id}`);
}

export default {getAll, clientRegister, loginClient, savingCapacity, createDates, getClientDates, getClientCapacity, getClient};