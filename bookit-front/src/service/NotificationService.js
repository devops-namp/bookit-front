import axios from 'axios';

const webSocketUrl = import.meta.env.VITE_WEB_SOCKET_PORT
axios.defaults.baseURL = `http://${webSocketUrl}`;

const getNotifications = async (userId) => {
    try {
        const response = await axios.get(`/notifications/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
}

const markAsRead = async (notificationId) => {
    try {
        const response = await axios.post(`/notifications/markAsRead/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
}

export default { getNotifications, markAsRead };
