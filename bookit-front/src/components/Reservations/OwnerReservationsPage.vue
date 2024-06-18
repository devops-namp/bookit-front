<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="owner-reservations-list pt-5 d-flex flex-column align-items-center">
        <div class="d-flex justify-content-between align-items-center w-100">
          <h2 class="text-white mb-3 ml-auto mr-auto">Manage Reservations</h2>
        </div>
        <div class="d-flex ml-auto pb-3">
          <div class="custom-control custom-switch">
            <input class="custom-control-input" type="checkbox" id="autoAcceptSwitch" v-model="autoAccept">
            <label class="custom-control-label text-white" for="autoAcceptSwitch">Auto Accept Reservations</label>
          </div>
        </div>
        <div class="reservation-card" v-for="reservation in reservations" :key="reservation.id">
          <div class="d-flex justify-content-center p-5 col-4">
          <img 
            v-if="reservation.accommodationDto.images[0] && reservation.accommodationDto.images[0].base64Image" 
            :src="'data:image/jpeg;base64,' + reservation.accommodationDto.images[0].base64Image" alt="Reservation Image" class="reservation-image">
          <img v-else src="@/assets/No-Image.png" alt="Reservation Image" class="reservation-image">
        </div>
          <div class="reservation-details col">
            <h5>{{ reservation.accommodationDto.name }}</h5>
            <label>{{ reservation.accommodationDto.location }}</label>
            <label>{{ formatDate(reservation.fromDate) }} to {{ formatDate(reservation.toDate) }}</label>
            <label>Status: <span :class="statusClass(reservation.state)">{{ reservation.state }}</span></label>
            <label>Number of guests: {{ reservation.numOfGusts}}&nbsp;&nbsp;</label>
            <div v-if="reservation.state === 'PENDING'">
              <button class="btn btn-success mr-2" @click="confirmReservation(reservation.id)" v-if="!autoAccept">Confirm</button>
              <button class="btn btn-danger" @click="declineReservation(reservation.id)" v-if="!autoAccept">Decline</button>
            </div>
          </div>
          <div class="col align-content-center text-center p-3">
            <h3 class="price-h3">{{ reservation.totalPrice }}€</h3> *in full <hr class="m-0">
            <!-- <h3 class="pricePer-h3 pt-4">{{reservation.pricePer}}€</h3> *{{formatPriceType(reservation.priceType)}}<hr class="m-0"> -->
            <h3 class="cancelations-h3 pt-4">{{ reservation.rejectCount || 0 }}</h3> *users previous cancelations

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccommodationService from "@/service/AccommodationService";
import NavBar from "../util/NavBar.vue";
import moment from "moment";
import { ref, watch, onMounted } from 'vue';
import UserService from "@/service/UserService";

export default {
  name: "OwnerReservationsPage",
  components: {
    NavBar,
  },
  setup() {
    const reservations = ref([]);
    const autoAccept = ref(null);

    const fetchReservations = async () => {
      try {
        const response = await AccommodationService.getHostsReservations(localStorage.getItem("username"));
        reservations.value = response.data;
        const usernames = reservations.value.map(reservation => reservation.guestUsername);
        const rejectCounts = await UserService.getRejectCount(usernames);
        reservations.value = reservations.value.map(reservation => ({
          ...reservation,
          rejectCount: rejectCounts.data[reservation.guestUsername] || 0
        }));
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    const fetchAutoAccept = async () => {
      try {
        const response = await UserService.getAutoapproveStatus(localStorage.getItem("username"));
        console.log("S backa sam dobila vrednost: " + response.data);
        autoAccept.value = response.data;
      } catch (error) {
        console.error("Error fetching auto accept status:", error);
      }
    };


    const formatPriceType = (priceType) => {
      if (!priceType) return '';
      return priceType.replace('price-', '').replace('-', ' ')
    };

    const formatDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const statusClass = (state) => {
      return {
        'text-success font-weight-bold': state === 'Accepted',
        'text-warning font-weight-bold': state === 'Pending',
        'text-danger font-weight-bold': state === 'Declined'
      };
    };

    const confirmReservation = (id) => {
      reservations.value = reservations.value.map(reservation => {
        if (reservation.id === id) {
          reservation.state = 'Accepted';
          AccommodationService.approveReservation(id);
        }
        return reservation;
      });
      alert('Reservation confirmed.');
    };

    const declineReservation = (id) => {
      reservations.value = reservations.value.map(reservation => {
        if (reservation.id === id) {
          reservation.state = 'Declined';
          AccommodationService.rejectReservationHost(id);
        }
        return reservation;
      });
      alert('Reservation declined.');
    };

    watch(autoAccept, async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal) {
          await UserService.setAutoapproveToTrue(localStorage.getItem("username"));
          fetchReservations();
        } else {
          await UserService.setAutoapproveToFalse(localStorage.getItem("username"));
        }
      }
    });

    onMounted( async () => {
      fetchReservations();
      fetchAutoAccept();
    })
    
    

    return {
      autoAccept,
      reservations,
      formatPriceType,
      formatDate,
      statusClass,
      confirmReservation,
      declineReservation
    };
  }
};
</script>

<style scoped>
.cancelations-h3 {
  font-size: xx-large;
  font-weight: 600;
}

.price-h3 {
  color: lightskyblue;
  font-size: xx-large;
  font-weight: 600;
}

.pricePer-h3 {
  color: lightgreen;
  font-size: xx-large;
  font-weight: 600;
}

.entire-div {
  min-height: 100vh;
  background-color: #343a40;
}

.owner-reservations-list {
  width: 100%;
}

.reservation-card {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
}

.reservation-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
}

.reservation-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-success {
  color: green;
}

.text-warning {
  color: orange;
}

.text-danger {
  color: red;
}
</style>
