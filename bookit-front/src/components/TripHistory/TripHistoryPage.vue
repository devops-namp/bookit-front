<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="trip-history pt-5 d-flex justify-content-center">
        <div class="trip-card" v-for="trip in trips" :key="trip.id">
          <img :src="trip.image" alt="Trip Image" class="trip-image" @click="openDetailedPropertyCard(trip)">
          <div class="trip-details" @click="openDetailedPropertyCard(trip)">
            <h5>{{ trip.name }}</h5>
            <p>{{ trip.location }}</p>
            <p>{{ trip.date }}</p>
          </div>
          <div class="trip-details">
            <div class="ratings">
              <div>
                <h6>Rate the Place</h6>
                <star-rating v-model="trip.placeRating" />
              </div>
              <div>
                <h6>Rate the Host</h6>
                <star-rating v-model="trip.hostRating" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import StarRating from './StarRating.vue';
import NavBar from "../util/NavBar.vue";

export default {
  name: "TripHistory",
  components: {
    StarRating,
    NavBar,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  methods: {
    openDetailedPropertyCard(trip) {
      console.log(trip);
      this.$router.push({ path: "/propertyDetail", query: { fromTripHistory: 'true' } });
    }
  }
  ,
  data() {
    return {
      trips: [
         {
          id: 1,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
        {
          id: 2,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
        {
          id: 3,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
        {
          id: 4,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
        {
          id: 5,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
        {
          id: 6,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
        {
          id: 7,
          name: "Central Konaci Apartments",
          location: "Kopaonik",
          date: "2023-10-30",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          host: "Branko Brankovic",
          placeRating: 3,
          hostRating: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
.entire-div {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.trip-history {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.trip-card {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 1rem);
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.trip-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.trip-details {
  padding: 1rem;
}

.ratings {
  display: flex;
  justify-content: space-between;
}
</style>
