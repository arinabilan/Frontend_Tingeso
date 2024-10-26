import httpClient from "../http-common";

const getLoanRequirements = () => {
    return httpClient.get('/api/v1/loanRequirements/');
};

const getLoanRequirementById = (id) => {
    return httpClient.get(`/api/v1/loanRequirements/${id}`);
};

const getLoanTypes = () => {
    return httpClient.get('/api/v1/typeloan/')
}

const createSolicitude = (credencials) => {
    return httpClient.post('/api/v1/solicitude/', credencials);
}

export default { getLoanRequirements, getLoanTypes, getLoanRequirementById, createSolicitude };