import axios from 'axios';

const webSocketUrl = import.meta.env.VITE_WEB_SOCKET_PORT;
axios.defaults.baseURL = `http://${webSocketUrl}`;

const getNotifications = async (userId) => {
    try {
        const response = await axios.get(`/notifications/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

const markAsRead = async (notificationId) => {
    try {
        const response = await axios.post(`/notifications/markAsRead/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
};

// const changeSettings = async (username, settings) => {
//     try {
//         const response = await axios.post(`/notifications/settings/${username}`, settings);
//         return response.data;
//     } catch (error) {
//         console.error("Error changing notification settings:", error);
//         throw error;
//     }
// };

// const getNotificationSettings = async (username) => {
//     try {
//         const response = await axios.get(`/notifications/settings/${username}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching notification settings:", error);
//         throw error;
//     }
// };

export default { getNotifications, markAsRead };
