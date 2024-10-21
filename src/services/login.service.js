import httpClient from "../http-common";

const loginClient = credentials => {
    
    return httpClient.post('/api/v1/clients/', credentials);
    
}



export default {loginClient};