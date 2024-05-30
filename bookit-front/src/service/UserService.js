import api from '../api'

const register = (payload) => {
    return api.post('/users', payload);
}

const confirmRegistration = (payload) => {
    return api.post('/users/confirm', payload)
}

const updateProfile = (username, payload) => {
    return api.put(`/users/${username}`, payload);
}

const getUser = (username) => {
    return api.get(`/users/${username}`);
}

export default { register, confirmRegistration, updateProfile, getUser };