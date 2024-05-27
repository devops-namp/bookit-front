import api from '../api'

const login = (username, password) => {
    return api.post("auth/login/", {username, password});
}

export default { login }