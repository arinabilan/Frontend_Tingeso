import httpClient from "../http-common";

const getLoanRequirements = () => {
    return httpClient.get('/api/v1/loanRequirements/');
};

const getLoanTypes = () => {
    return httpClient.get('/api/v1/typeloan/')
}

export default { getLoanRequirements, getLoanTypes };