<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <a class="navbar-brand" href="/main">BookIt.com</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-if="user" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ user }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/profile"><i class="bi bi-person-fill"></i>&nbsp;Manage account</a>
            <a class="dropdown-item" href="/tripHistory"><font-awesome-icon icon="fa-solid fa-suitcase"></font-awesome-icon>&nbsp;Booking and trips</a>
            <a class="dropdown-item" href="/myReservations"><i class="bi bi-person-hearts"></i>&nbsp;Reservations</a>
            <a class="dropdown-item" href="/ownerReservations"><i class="bi bi-ticket-perforated"></i>&nbsp;Manage reservations</a>
            <a class="dropdown-item" href="/myProperties"><i class="bi bi-houses"></i>&nbsp;Manage properties</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#"><i class="bi bi-box-arrow-left"></i>&nbsp;Sign out</a>
          </div>
        </li>
      </ul>
      <a class="text-light text-decoration-none p-2" href="/propertyListing">List your property</a>
      <div v-if="user" class="nav-item dropdown position-relative">
        <a class="text-light text-decoration-none p-2 pl-3 position-relative dropdown-toggle" href="#" id="notificationDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
              {{ notification.message }}
            </a>
          </div>
          <div v-else class="dropdown-item">No notifications</div>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-center" href="/notificationSettings">Notification Settings</a>
        </div>
      </div>
      <a v-if="!user" class="text-light text-decoration-none bg-info p-2" href="/">Login</a>
      <a v-if="!user" class="text-light text-decoration-none bg-info p-2" href="/signup">Sign up</a>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'NavBar',
  data() {
    return {
      user: 'Aleksa Simic',
      notificationsCount: 6,
      notifications: [
        { id: 1, message: 'New booking request' },
        { id: 2, message: 'Your reservation is confirmed' },
        { id: 3, message: 'Your reservation is declined' },
        { id: 4, message: 'Reservation is canceled' },
        { id: 5, message: 'You have been rated' },
        { id: 6, message: 'Your property has been rated' },
      ],
    };
  },
  methods: {
    handleNotificationClick(notificationId) {
      this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
      this.notificationsCount--;
    },
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

