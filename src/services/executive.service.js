import httpClient from "../http-common";

const loginExecutive = credentials => {
    return httpClient.post('/api/v1/executives/login/email', {
        email: credentials.email,
        password: credentials.password
    });
}

export default {loginExecutive};