<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="reservations-list pt-5 d-flex flex-column align-items-center">
        <h2 class="text-white mb-4">My Reservations</h2>
        <div class="reservation-card" v-for="reservation in reservations" :key="reservation.id">
         <div class="d-flex justify-content-center p-5 col-4">
          <img :src="reservation.image" alt="Reservation Image" class="reservation-image">
         </div>
         <div class="reservation-details col">
            <h5>{{ reservation.name }}</h5>
            <label>{{ reservation.location }}</label>
            <label>{{ formatDate(reservation.startDate) }} to {{ formatDate(reservation.endDate) }}</label>
            <label>Status: <span :class="statusClass(reservation.status)">{{ reservation.status }}</span></label>
            <label>Adults: {{ reservation.adults }}&nbsp;&nbsp; Children: {{ reservation.children }}</label>
            <button class="btn btn-danger" @click="cancelReservation(reservation.id)">Cancel Reservation</button>
         </div>
         <div class="col align-content-center text-center">
            <h3 class="price-h3">{{ reservation.price }}€</h3> *in full
            <h3 class="pricePer-h3 pt-5">{{reservation.pricePer}}€</h3> *{{formatPriceType(reservation.priceType)}}
         </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "../util/NavBar.vue";
import moment from "moment";

export default {
  name: "MyReservationPage",
  components: {
    NavBar,
  },
  data() {
    return {
      reservations: [
        {
          id: 1,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          startDate: "2024-06-01",
          endDate: "2024-06-10",
          status: "Accepted",
          adults: 2,
          children: 0,
          price:300,
          priceType: "price-per-person",
          pricePer: 150,
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
        },
        {
          id: 2,
          name: "Central Zlatibor",
          location: "Zlatibor",
          startDate: "2024-07-15",
          endDate: "2024-07-25",
          status: "Declined",
          adults: 2,
          children: 4,
          price:250,
          priceType: "price-per-person",
          pricePer: 15,
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
        },
        {
          id: 3,
          name: "Central Zlatar",
          location: "Zlatibor",
          startDate: "2024-07-15",
          endDate: "2024-07-25",
          status: "Pending",
          adults: 1,
          children: 2,
          price:250,
          priceType: "price-per-unit",
          pricePer: 10,
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
        },
      ],
    };
  },
  methods: {
    formatPriceType(priceType){
      return priceType.replace('price-','').replace('-',' ')
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    statusClass(status) {
      return {
        'text-success font-weight-bold': status === 'Accepted',
        'text-warning font-weight-bold': status === 'Pending',
        'text-danger font-weight-bold': status === 'Declined'
      };
    },
    cancelReservation(id) {
      this.reservations = this.reservations.filter(reservation => reservation.id !== id);
      alert('Reservation cancelled successfully.');
    }
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

