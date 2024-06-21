<template>
  <div class="nav-item dropdown position-relative">
    <a
      class="text-light text-decoration-none p-2 pl-3 position-relative dropdown-toggle"
      href="#"
      id="notificationDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @onKeyPress="handleKeyPress"
    >
      <i class="bi bi-bell-fill"></i>
      <span v-if="notificationsCount > 0" class="badge badge-danger position-absolute top-0 start-100 translate-middle">{{ notificationsCount }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdown">
      <div v-if="notifications.length">
        <a
          v-for="notification in notifications"
          :key="notification.id"
          class="dropdown-item d-flex align-items-center notification-item"
          href="#"
          @click.prevent="handleNotificationClick(notification.id)"
        >
          <span class="green-circle mr-2"></span>
          {{ notification.text }}
        </a>
      </div>
      <div v-else class="dropdown-item">No notifications</div>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item text-center" href="/notificationSettings">Notification Settings</a>
    </div>
  </div>
</template>

<script>
import NotificationService from '@/service/NotificationService';

export default {
  name: 'Notifications',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      notifications: [],
      notificationsCount: 0,
      socket: null,
    };
  },
  methods: {
    handleKeyPress(event) {
      console.log('Key pressed:', event.key);
    },
    handleNotificationClick(notificationId) {
      this.markNotificationAsRead(notificationId);
    },
    fetchNotifications() {
      NotificationService.getNotifications(localStorage.getItem("username"))
        .then(response => {
          this.notifications = response;
          this.notificationsCount = response.length;
        })
        .catch(error => console.error('Error fetching notifications:', error));
    },
    setupWebSocket() {
      const webSocketUrl = import.meta.env.VITE_WEB_SOCKET_PORT
      this.socket = new WebSocket(`ws://${webSocketUrl}/notificationSocket/${localStorage.getItem("username")}`);
      this.socket.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        this.notifications.push(newNotification);
        this.notificationsCount++;
      };
      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    },
    markNotificationAsRead(notificationId) {
      NotificationService.markAsRead(notificationId)
        .then(() => {
          this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
          this.notificationsCount--;
        })
        .catch(error => console.error('Error marking notification as read:', error));
    }
  },
  mounted() {
    this.fetchNotifications();
    this.setupWebSocket();
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style scoped>
.badge {
  top: 0.3rem;
  right: 0.5rem;
}
.notification-item {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 10px;
}
.notification-item:hover {
  background-color: #e9ecef;
}
.green-circle {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
}
</style>
