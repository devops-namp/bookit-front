import apiAccommodation from '../apiAccommodation'

const getAllAccommodations = () => {
    return apiAccommodation.get('/accommodation');
}

const getAccommodation = (accommodationId) => {
    return apiAccommodation.get(`/accommodation/${accommodationId}`);
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

const adjustPrice = (accommodationId, payload) => {
    return apiAccommodation.put(`/accommodation/price/${accommodationId}`, payload);
}

const removePrice = (accommodationId, payload) => {
    return apiAccommodation.delete(`/accommodation/price/${accommodationId}`, payload);
}

const getDatesInfo = (accommodationId, month, year) => {
    return apiAccommodation.get(`/accommodation/dates/${accommodationId}?month=${month}&year=${year}`);
}

export default { getAllAccommodations, addAccommodation, updateAccommodation, searchAccommodations, adjustPrice, getAccommodation, getDatesInfo, removePrice };
