import httpClient from "../http-common";

const getAll = () => {
    
    return httpClient.get('/api/v1/clients/');

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


export default {getAll, clientRegister, loginClient};