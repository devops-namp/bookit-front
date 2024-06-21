
import apiNotifications from '../apiNotifications'


const getNotifications = async (username) => {
    try {
        const response = await apiNotifications.get(`/notifications/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

const markAsRead = async (notificationId) => {
    try {
        const response = await apiNotifications.post(`/notifications/markAsRead/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
};

export default { getNotifications, markAsRead };

