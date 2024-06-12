import apiAccommodation from '../apiAccommodation'

const getAllAccommodations = () => {
    return apiAccommodation.get('/accommodation');
}

const addAccommodation = (payload) => {
    return apiAccommodation.post("/accommodation", payload)
}

const updateAccommodation = (accommodationId, payload) => {
    return apiAccommodation.put(`/accommodation/${accommodationId}`, payload);
}

const searchAccommodations = (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiAccommodation.get(`/accommodation/search?${queryParams}`);
}

export default { getAllAccommodations, addAccommodation, updateAccommodation, searchAccommodations };