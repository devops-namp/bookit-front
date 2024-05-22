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
              <form @submit.prevent="saveSettings">
                <div class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="reservation-created" v-model="notificationSettings.reservationCreated"/>
                  <label class="custom-control-label" for="reservation-created">
                    Reservation Created
                  </label>
                </div>
                <div class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="reservation-canceled" v-model="notificationSettings.reservationCanceled"/>
                  <label class="custom-control-label" for="reservation-canceled">
                    Reservation Canceled
                  </label>
                </div>
                <div class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="rated" v-model="notificationSettings.rated" />
                  <label class="custom-control-label" for="rated">
                    Rated
                  </label>
                </div>
                <div class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="property-rated" v-model="notificationSettings.propertyRated" />
                  <label class="custom-control-label" for="property-rated">
                    Property Rated
                  </label>
                </div>
                <div class="mb-3 custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="reservation-response" v-model="notificationSettings.reservationResponse" />
                  <label class="custom-control-label" for="reservation-response">
                    Reservation Response
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

export default {
  name: 'NotificationPage',
  components: {
    NavBar,
  },
  data() {
    return {
      notificationSettings: {
        reservationCreated: true,
        reservationCanceled: true,
        rated: true,
        propertyRated: true,
        reservationResponse: true,
      },
    };
  },
  methods: {
    saveSettings() {
      toast("Settings saved successfully!", {
        autoClose: 2000,
        type: 'success',
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
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

