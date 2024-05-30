import api from '../api'

const login = (username, password) => {
    return api.post("auth/login/", {username, password});
}

const changePassword = (payload) => {
    return api.put("auth/password/", payload);
}

export default { login, changePassword }