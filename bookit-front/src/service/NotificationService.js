import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';

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
