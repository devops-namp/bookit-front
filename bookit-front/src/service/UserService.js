import api from '../api'

const register = (payload) => {
    return api.post('/users', payload);
}

const confirmRegistration = (payload) => {
    return api.post('/users/confirm', payload)
}

export default { register, confirmRegistration };