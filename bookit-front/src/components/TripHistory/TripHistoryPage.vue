<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="trip-history pt-5 d-flex justify-content-center">
        <div class="trip-card" v-for="trip in trips" :key="trip.id">
          
          <img 
            v-if="trip.accommodationDto && trip.accommodationDto.images && trip.accommodationDto.images.length > 0 && trip.accommodationDto.images[0].base64Image" 
            :src="'data:image/jpeg;base64,' + trip.accommodationDto.images[0].base64Image" alt="Trip Image" class="trip-image" @click="openDetailedPropertyCard(trip)">
            
          <div v-if="trip.accommodationDto" class="trip-details" @click="openDetailedPropertyCard(trip)">
            <h5>{{ trip.accommodationDto.name }}</h5>
            <p>{{ trip.accommodationDto.location }}</p>
            <p>{{ trip.fromDate }} ---- {{trip.toDate}}</p>
          </div>
          <div class="trip-details" v-if="trip.accommodationDto">
            <div class="ratings">
              <div>
                <h6>Rate the Place</h6>
                <star-rating v-model="trip.placeRating" @update:modelValue="updateRating($event, trip, 'ACCOMMODATION')" />
              </div>
              <div>
                <h6>Rate the Host</h6>
                <star-rating v-model="trip.hostRating" @update:modelValue="updateRating($event, trip, 'HOST')" />
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
import ReviewService from '@/service/ReviewService';
import AccommodationService from "@/service/AccommodationService";
import { ta } from "date-fns/locale";


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
  created(){
    AccommodationService.getGuestsReservationsHistory(localStorage.getItem("username"))
    .then(res => {
      console.log();
      console.log(res.data);
      this.trips = res.data;
      // deduplicate by accommodation ID
      this.trips = this.trips.filter((trip, index, self) =>
        index === self.findIndex((t) => (
          t.accommodationDto && trip.accommodationDto && t.accommodationDto.id === trip.accommodationDto.id
        ))
      );

      this.trips.forEach(trip => {
        if (trip.accommodationDto && trip.accommodationDto.id) {
          ReviewService.getAccommodationReviews(trip.accommodationDto.id)
            .then(accommodationReviewsRes => {
              console.log("Accommodation reviews for accommodation ID", trip.accommodationDto.id);
              console.log(accommodationReviewsRes.data);
              trip.accommodationReviews = accommodationReviewsRes.data;
              trip.accommodationReviews.forEach(review => {
                if (review.reviewerUsername == localStorage.getItem("username")) {
                  trip.accommodationReviewId = review.id;
                  trip.placeRating = review.stars;
                }
              });
              console.log(trip);
            })
            .catch(error => {
              console.error(`Error fetching accommodation reviews for trip ID ${trip.id}:`, error);
            });
        }
        
        if (trip.accommodationDto.hostUsername) {
          ReviewService.getHostReviews(trip.accommodationDto.hostUsername)
            .then(hostReviewsRes => {
              trip.hostReviews = hostReviewsRes.data;
              trip.hostReviews.forEach(review => {
                if (review.reviewerUsername == localStorage.getItem("username")) {
                  trip.hostReviewId = review.id;
                  trip.hostRating = review.stars;
                }
              });
            })
            .catch(error => {
              console.error(`Error fetching host reviews for trip ID ${trip.id}:`, error);
            });
        }
      });
    })
    .catch(error => {
      console.error("Error fetching users trips:", error);
    });
  },
  methods: {
    openDetailedPropertyCard(trip) {
      console.log("ovo trazis");
      console.log(trip.accommodationDto.id);
      console.log(trip);
      this.$router.push({ path: `/propertyDetail/${trip.accommodationDto.id}`, query: { fromTripHistory: 'true' } });
    },
    updateRating(rating, trip, targetType) {
      console.log("Rating updated to", rating, "for trip ID", trip.id, "and target type", targetType);
      if (targetType === 'ACCOMMODATION') {
        trip.placeRating = rating;
      } else {
        trip.hostRating = rating;
      }
      let payload = {
        targetType: targetType,
        hostUsername: trip.accommodationDto.hostUsername,
        accommodationId: trip.accommodationDto.id,
        stars: rating,
        id: targetType === 'ACCOMMODATION' ? trip.accommodationReviewId : trip.hostReviewId,
      };

      ReviewService.updateReview(trip.id, payload)
        .then((resp) => {
          console.log(resp.data);
          if (targetType === 'ACCOMMODATION') {
            trip.accommodationReviewId = resp.data.id;
          } else {
            trip.hostReviewId = resp.data.id;
          }
          console.log("Rating updated successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
