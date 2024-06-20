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

const createReservation = (payload) => {
    return apiAccommodation.post("/reservations", payload)
}

const getHostsReservations = (username) => {
    return apiAccommodation.get(`/reservations/getByHost/${username}`)
};

const getGuestsReservations = (username) => {
    return apiAccommodation.get(`/reservations/getByGuest/${username}`)
};

const approveReservation = (reservationId) => {
    return apiAccommodation.post(`reservations/approve/${reservationId}`)
}

const rejectReservationHost = (reservationId) => {
    return apiAccommodation.post(`reservations/rejectHost/${reservationId}`)
}

const rejectReservationGuest = (reservationId) => {
    return apiAccommodation.post(`reservations/rejectGuest/${reservationId}`)
}

const removePrice = (accommodationId, payload) => {
    return apiAccommodation.delete(`/accommodation/price/${accommodationId}`, {data: payload});
}

const getDatesInfo = (accommodationId, month, year) => {
    return apiAccommodation.get(`/accommodation/dates/${accommodationId}?month=${month}&year=${year}`);
}

export default { rejectReservationGuest,rejectReservationHost,approveReservation,getGuestsReservations, getHostsReservations, createReservation, getAllAccommodations, addAccommodation, updateAccommodation, searchAccommodations, adjustPrice, getAccommodation, getDatesInfo, removePrice };
