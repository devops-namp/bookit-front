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
            <a v-if="role=='GUEST'" class="dropdown-item" href="/tripHistory"><font-awesome-icon icon="fa-solid fa-suitcase"></font-awesome-icon>&nbsp;Booking and trips</a>
            <a v-if="role=='GUEST'" class="dropdown-item" href="/myReservations"><i class="bi bi-person-hearts"></i>&nbsp;Reservations</a>
            <a v-if="role=='HOST'" class="dropdown-item" href="/ownerReservations"><i class="bi bi-ticket-perforated"></i>&nbsp;Manage reservations</a>
            <a v-if="role=='HOST'" class="dropdown-item" href="/myProperties"><i class="bi bi-houses"></i>&nbsp;Manage properties</a>
            <a class="dropdown-item" href="/password"><i class="bi bi-lock-fill"></i>&nbsp;Change password</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="signout()"><i class="bi bi-box-arrow-left"></i>&nbsp;Sign out</a>
          </div>
        </li>
      </ul>
      <a v-if="role=='HOST'" class="text-light text-decoration-none p-2" href="/propertyListing">List your property</a>
      <!-- <div v-if="user" class="nav-item dropdown position-relative">
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
      </div> -->
      <notifications
        v-if="user"
        :user-id="1"
      ></notifications>
      <a v-if="!user" class="text-light text-decoration-none bg-info p-2" href="/">Login</a>
      <a v-if="!user" class="text-light text-decoration-none bg-info p-2" href="/signup">Sign up</a>
    </div>
  </nav>
</template>


<script>
import Notifications from './Notifications.vue';

export default {
  name: 'NavBar',
  components: {
    Notifications,
  },
  data() {
    return {
      user: '',
      role: '',
    };
  },
  mounted() {
    let token = localStorage.getItem('access_token');
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      this.user = payload.sub;
      this.role = payload.groups[0];
      console.log(payload);
    }

  },
  methods: {
    signout() {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    },
  },
};
</script>

<style scoped>
/* Ovdje možete dodati stilove specifične za NavBar komponentu */
</style>