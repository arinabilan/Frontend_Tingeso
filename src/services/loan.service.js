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

const modificateSolicitude = (id, executive, state) => {
    return httpClient.put(`/api/v1/solicitude/${id}/${state}`, executive);
}

const getPercent = (rate) => {
    return httpClient.get(`/api/v1/loanRequirements/${rate}/rate`);
}

const getYears = (month) => {
    return httpClient.get(`/api/v1/loanRequirements/${month}/years/loan`);
}

export default { getLoanRequirements, getLoanTypes, getLoanRequirementById, createSolicitude, getAllSolicitudes, modificateSolicitude, getSolicitude, getPercent, getYears };