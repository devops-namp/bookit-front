import api from '../api'

const updateReview = (reviewId, payload) => {
    return api.post(`/review`, payload);
}

const deleteReview = (reviewId) => {
    return api.delete(`/review/${reviewId}`);
}

const getHostReviews = (hostId) => {
    return api.get(`/review/target/HOST/${hostId}`);
}

const getAccommodationReviews = (accommodationId) => {
    return api.get(`/review/target/ACCOMMODATION/${accommodationId}`);
}

export default { updateReview, deleteReview, getAccommodationReviews, getHostReviews }