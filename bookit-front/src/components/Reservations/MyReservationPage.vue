<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="reservations-list pt-5 d-flex flex-column align-items-center">
        <h2 class="text-white mb-4">My Reservations</h2>
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
            <button class="btn btn-danger" @click="cancelReservation(reservation.id)" 
                    v-if="reservation.state !== 'DECLINED' && new Date(reservation.fromDate) >= new Date(new Date().setDate(new Date().getDate() + 1))">
                Cancel Reservation
            </button>
         </div>
         <div class="col align-content-center text-center">
            <h3 class="price-h3">{{ reservation.totalPrice }}€</h3> *in full
            <!-- <h3 class="pricePer-h3 pt-5">{{reservation.pricePer}}€</h3> *{{formatPriceType(reservation.priceType)}} -->
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
import { ref, onMounted } from 'vue';

export default {
  name: "MyReservationPage",
  components: {
    NavBar,
  },
  setup() {
    const reservations = ref([]);

    const fetchReservations = async () => {
      try {
        const response = await AccommodationService.getGuestsReservations(localStorage.getItem("username"));
        console.log(response.data);
        reservations.value = response.data;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const formatPriceType = (priceType) => {
      if (!priceType) return '';
      return priceType.replace('price-', '').replace('-', ' ');
    };

    const formatDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const statusClass = (status) => {
      return {
        'text-success font-weight-bold': status === 'Approved',
        'text-warning font-weight-bold': status === 'Pending',
        'text-danger font-weight-bold': status === 'Declined'
      };
    };

    const cancelReservation = async (id) => {
      try {
        await AccommodationService.rejectReservationGuest(id);
        reservations.value = reservations.value.filter(reservation => reservation.id !== id);
        alert('Reservation cancelled successfully.');
        
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        alert('Failed to cancel the reservation.');
      }
    };

    onMounted(fetchReservations);

    return {
      reservations,
      formatPriceType,
      formatDate,
      statusClass,
      cancelReservation,
    };
  }
};
</script>

<style scoped>
.price-h3{
  color: lightskyblue;
  font-size: xx-large;
  font-weight: 600;
}

.pricePer-h3{
  color: lightgreen;
  font-size: larger;
  font-weight: 600;
}

.entire-div {
  min-height: 100vh;
  background-color: #343a40;
}

.reservations-list {
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
</style>

