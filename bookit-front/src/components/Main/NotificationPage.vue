<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="row justify-content-center pt-5 w-100">
        <div class="col-md-7">
          <div class="card bg-secondary text-light">
            <div class="card-header text-center fw-bold header-title">
              Notification Settings
            </div>
            <div class="card-body">
              <form v-if="user" @submit.prevent="saveSettings">
                <div v-if="role=='HOST'" class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="reservation-created" v-model="notificationSettings.reservationRequestCreated"/>
                  <label class="custom-control-label" for="reservation-created">
                    On Reservation Request Created
                  </label>
                </div>
                <div v-if="role=='HOST'" class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="reservation-canceled" v-model="notificationSettings.reservationDeclined"/>
                  <label class="custom-control-label" for="reservation-canceled">
                    On Reservation Declined
                  </label>
                </div>
                <div v-if="role=='HOST'" class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="rated" v-model="notificationSettings.personalReview" />
                  <label class="custom-control-label" for="rated">
                    On Personal Review
                  </label>
                </div>
                <div v-if="role=='HOST'" class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="property-rated" v-model="notificationSettings.accommodationReview" />
                  <label class="custom-control-label" for="property-rated">
                    On Accommodation Review
                  </label>
                </div>
                <div v-if="role=='GUEST'" class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="reservation-response" v-model="notificationSettings.reservationRequestResolved" />
                  <label class="custom-control-label" for="reservation-response">
                    On Reservation Request Response
                  </label>
                </div>
                <div class="d-grid pt-4">
                  <button type="submit" class="btn btn-info btn-lg btn-block">
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../util/NavBar.vue";
import { toast } from 'vue3-toastify';
import UserService from "@/service/UserService";

export default {
  name: 'NotificationPage',
  components: {
    NavBar,
  },
  data() {
    return {
      notificationSettings: {
        reservationRequestCreated: true,
        reservationDeclined: true,
        personalReview: true,
        accommodationReview: true,
        reservationRequestResolved: true,
      },
      user: '',
      role: '',
    };
  },
  methods: {
    async saveSettings() {
      try {
        await UserService.changeNotificationSettings(localStorage.getItem("username"), this.notificationSettings);
        toast("Settings saved successfully!", {
          autoClose: 2000,
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } catch (error) {
        toast("Error saving settings!", {
          autoClose: 2000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    },
    async fetchSettings() {
      try {
        const response = await UserService.getNotificationSettings(localStorage.getItem("username"));
        this.notificationSettings = response.data;
      } catch (error) {
        toast("Error fetching settings!", {
          autoClose: 2000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    },
  },
  created() {
    let token = localStorage.getItem('access_token');
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      this.user = payload.sub;
      this.role = payload.groups[0];
      console.log(payload);
    }
    this.fetchSettings();
  },

};
</script>


<style scoped>
.card {
  border-radius: 15px;
  background: #6c757d;
}
.btn-info {
  color: white;
}
.header-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.entire-div {
  min-height: 100vh;
}

</style>

