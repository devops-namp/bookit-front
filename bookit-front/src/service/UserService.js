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

const deleteAccount = (username) => {
    return api.delete(`/users/${username}`);
}

const setAutoapproveToTrue = (username) => {
    return api.post(`/users/autoapproveTrue/${username}`);
}

const setAutoapproveToFalse = (username) => {
    return api.post(`/users/autoapproveFalse/${username}`);
}

const getAutoapproveStatus = (username) => {
    return api.get(`/users/getAutoapproveStatus/${username}`)
};

const getRejectCount = (usernames) => {
    return api.post(`/users/getRejectCount`, usernames);
  }

const changeNotificationSettings = (username, settings) => {
    return api.post(`/users/changeNotificationSettings/${username}`, settings);
}

const getNotificationSettings = (username) => {
    return api.get(`/users/getNotificationSettings/${username}`);
}

export default { getRejectCount,getAutoapproveStatus,setAutoapproveToFalse,setAutoapproveToTrue,register, confirmRegistration, 
    updateProfile, getUser, deleteAccount, changeNotificationSettings, getNotificationSettings };
