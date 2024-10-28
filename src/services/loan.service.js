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

const getAllSolicitudes = () => {
    return httpClient.get('/api/v1/solicitude/');
}

const getSolicitude = (id) => {
    return httpClient.get(`/api/v1/solicitude/${id}`);
}

const modificateSolicitude = (id, executive) => {
    return httpClient.put(`/api/v1/solicitude/${id}/`, executive);
}

const getClientDates = (id) => {
    return httpClient.get(`/api/v1/clientdates/${id}`);
}

export default { getLoanRequirements, getLoanTypes, getLoanRequirementById, createSolicitude, getAllSolicitudes, modificateSolicitude, getSolicitude };