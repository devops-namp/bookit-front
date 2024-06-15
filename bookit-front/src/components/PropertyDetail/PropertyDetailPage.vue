<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
    </div>
    <div class="container pt-4 pb-4">
      <div class="property-details bg-secondary p-5 mx-auto text-white">
        <h1 class="text-center">{{ property.name }}</h1>
        <p class="text-center">{{ property.location }}</p>
        <div class="carousel slide" id="propertyCarousel" data-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(image, index) in property.images" :key="index"
              :class="['carousel-item', { active: index === 0 }]">
              <img :src="image" class="d-block w-100" alt="Property Image" />
            </div>
          </div>
          <a class="carousel-control-prev" href="#propertyCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a class="carousel-control-next" href="#propertyCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>

        <div class="property-info mt-4">
          <div class="d-flex justify-content-center">
            <h3 class="price-h3">{{ property.price }}€</h3> *in full
            <!-- <h3 class="pricePer-h3 pl-4">{{property.pricePer}}€</h3> *{{formatPriceType(property.priceType)}} -->
          </div>
          <h3>Details</h3>
          <p><strong>Location:</strong> {{ property.location }}</p>
          <p>
            <strong>Guests:</strong> {{ property.minGuests }} to
            {{ property.maxGuests }}
          </p>
          <h4>Benefits</h4>
          <ul>
            <li v-for="filter in property.filters" :key="filter">
              {{ filter }}
            </li>
          </ul>
          <div class="d-flex">
            <h4>Reservation date</h4>
            <div class="col-5">
              <VueDatePicker v-model="reservationDate" range range-separator="to" start-placeholder="Start date"
                end-placeholder="End date" class="mr-2" :enable-time-picker="false" format="dd-MM-yyyy"
                :min-date="new Date()" disabled></VueDatePicker>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center p-4">
            <VCalendar expanded :attributes='calendarAttributes' @update:pages="handleMonthChange" />
          </div>
          <div class="d-flex pt-4">
            <h4 class="pr-5">Guests</h4>
            <div class="col-3 d-flex align-items-center">
              <label class="text-light pr-2">Adults</label>
              <input type="number" class="form-control" :min="0" v-model.number="adults" disabled />
            </div>
            <div class="col-3 d-flex align-items-center">
              <label class="text-light pr-2">Children</label>
              <input type="number" class="form-control" :min="0" v-model.number="children" disabled />
            </div>
          </div>
        </div>

        <button class="btn btn-info btn-lg btn-block mt-4" @click="reserveProperty" v-if="!fromTripHistory">
          Reserve
        </button>

        <div class="ratings mt-5">
          <h3 class="text-center">Average Ratings</h3>
          <p class="text-center"><strong>Host:</strong> {{ averageHostRating }} / 5</p>
          <p class="text-center"><strong>Property:</strong> {{ averagePropertyRating }} / 5</p>
        </div>

        <div class="reviews mt-5" v-if="hostReviews.length > 0">
          <h3 class="text-center">Host Reviews</h3>
          <div class="row">
            <div v-for="review in hostReviews" :key="review.id"
              class="review-item card mb-3 mr-auto col-3 bg-card-review-above-div ml-auto">
              <div class="card-body bg-card-review">
                <p class="card-text"><strong>User:</strong> {{ review.reviewerUsername }}</p>
                <p class="card-text"><strong>Rating:</strong> {{ review.stars }} / 5</p>
                <p class="card-text"><strong>Date:</strong> {{ formatDate(review.reviewDate) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="reviews mt-5" v-if="accommodationReviews.length > 0">
          <h3 class="text-center">Accommodation Reviews</h3>
          <div class="row">
            <div v-for="review in accommodationReviews" :key="review.id"
              class="review-item card mb-3 mr-auto col-3 bg-card-review-above-div ml-auto">
              <div class="card-body bg-card-review">
                <p class="card-text"><strong>User:</strong> {{ review.reviewerUsername }}</p>
                <p class="card-text"><strong>Rating:</strong> {{ review.stars }} / 5</p>
                <p class="card-text"><strong>Date:</strong> {{ formatDate(review.reviewDate) }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../util/NavBar.vue";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AccommodationService from "@/service/AccommodationService";
import ReviewService from "@/service/ReviewService";
import { defineComponent } from 'vue';



export default {
  name: "PropertyDetailPage",
  components: {
    VueDatePicker,
    NavBar,
  },
  computed: {
    fromTripHistory() {
      return this.$route.query.fromTripHistory === 'true';
    },
    averageHostRating() {
      const total = this.hostReviews.reduce((sum, review) => sum + review.stars, 0);
      return (total / this.hostReviews.length).toFixed(1);
    },
    averagePropertyRating() {
      const total = this.accommodationReviews.reduce((sum, review) => sum + review.stars, 0);
      return (total / this.accommodationReviews.length).toFixed(1);
    },
    calendarAttributes() {
      return this.accommodations.map((item) => {
        let attribute = {
          key: item.date,
          dates: item.date,
          customData: { price: item.price },
        };
        if (item.status.toLowerCase() === 'available') {
          attribute.highlight = { color: 'green', fillMode: 'light' };
          attribute.color = '#00ff00';
          attribute.popover = {
            label: `Available - $${item.price}`
          };
        } else {
          attribute.color = '#ff0000';
          attribute.highlight = { color: 'red', fillMode: 'light' };
          attribute.popover = {
            label: 'Reserved'
          };
        }
        return attribute;
      });
    }
  },
  mounted() {
    console.log("Property id:", this.$route.params.id);
    let trip = this.$store.state.trip;
    let fromDate = this.$store.state.searchFromDate;
    let toDate = this.$store.state.searchToDate;
    this.adults = this.$store.state.adults;
    this.children = this.$store.state.children;
    console.log("Trip:", trip);
    console.log("From date:", fromDate);
    console.log("To date:", toDate);
    if (fromDate && toDate) {
      this.reservationDate = [fromDate, toDate];
    }

    AccommodationService.getAccommodation(this.$route.params.id)
      .then(response => {
        console.log("Property details:", response.data);
        this.setPropertyData(response.data);
        ReviewService.getAccommodationReviews(this.$route.params.id)
          .then(response => {
            console.log("Reviews:", response.data);
            this.setAccommodationReviewData(response.data);
          })
          .catch(error => {
            console.error("Error fetching reviews:", error);
          });

        ReviewService.getHostReviews(this.property.hostUsername)
          .then(response => {
            console.log("Host reviews:", response.data);
            this.setHostReviewData(response.data);
          })
          .catch(error => {
            console.error("Error fetching host reviews:", error);
          });

        this.fetchAccommodationDates(moment().month() + 1, moment().year());

      })
      .catch(error => {
        console.error("Error fetching property details:", error);
      });
  },
  data() {
    return {
      reservationDate: ["2023-10-21", "2023-10-30"],
      adults: 2,
      children: 0,
      property: {
        name: "Central Konaci Apartments",
        location: "Kopaonik",
        filters: ["WiFi", "Parking", "Fireplace"],
        price: 300,
        priceType: "price-per-person",
        pricePer: 150,
        minGuests: 1,
        maxGuests: 5,
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551077088.jpg?k=9de972a17f808f2f55930ca0538846e2383f3a2041934decd50fa69691453a07&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520536.jpg?k=4c3d970eed45c89579f39ca1e109dd01a31b12dbbd34f1fa417934fd919496dc&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520898.jpg?k=bfe2fe818abb30c41c7a2ec70bdfe560d251484e2e542abab0ea0a8931f170c2&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520909.jpg?k=f061149dd59c7a7a4fe9c51440f24eff26d009668f0704d9b7348482f3aef981&o=&hp=1",
        ]
      },
      hostReviews: [

      ],
      accommodationReviews: [
      ],
      accommodations: [
        { date: '2024-06-10', price: 120, status: 'available' },
        { date: '2024-06-11', price: 150, status: 'available' },
        { date: '2024-06-12', status: 'reserved' },
        { date: '2024-06-13', status: 'reserved' },
        { date: '2024-06-14', status: 'reserved' },
        { date: '2024-06-15', price: 130, status: 'available' },
        { date: '2024-06-16', price: 125, status: 'available' },
      ],
      month_id: null
    };
  },
  methods: {
    formatPriceType(priceType) {
      return priceType.replace('price-', '').replace('-', ' ')
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    reserveProperty() {
      console.log("Property reserved:", this.property);
      alert("Reservation successful!");
    },
    setPropertyData(resp) {
      this.property.name = resp.name;
      this.property.hostUsername = resp.hostUsername;
      this.property.location = resp.location;
      this.property.filters = resp.filters.split(',');
      this.property.minGuests = resp.minGuests;
      this.property.maxGuests = resp.maxGuests;
      this.property.priceType = resp.priceType;
      this.property.price = this.$store.state.totalPrice;
      // this.property.pricePer = resp.priceAdjustments[1].price;
      this.property.images = resp.images.map(image => `data:image/png;base64,${image.base64Image}`);
    },
    setAccommodationReviewData(resp) {
      console.log("Setting reviews:", resp);
      // add all reviews to the array
      this.accommodationReviews = resp;
      this.averagePropertyRating = this.accommodationReviews.reduce((sum, review) => sum + review.stars, 0) / this.accommodationReviews.length;
    },
    setHostReviewData(resp) {
      console.log("Setting host reviews:", resp);
      this.hostReviews = resp;
      this.averageHostRating = this.hostReviews.reduce((sum, review) => sum + review.stars, 0) / this.hostReviews.length;
    },
    handleMonthChange(newPage) {
      console.log('Month changed to:', newPage);
      if (newPage[0].id === this.month_id) return;
      console.log(newPage[0].month);
      console.log(newPage[0].year);
      this.fetchAccommodationDates(newPage[0].month, newPage[0].year);
      this.month_id = newPage[0].id;
    },
    fetchAccommodationDates(month, year) {
      AccommodationService.getDatesInfo(this.$route.params.id, month, year)
        .then(response => {
          console.log("Accommodation dates:", response.data);
          this.accommodations = response.data;

        })
        .catch(error => {
          console.error("Error fetching accommodation dates:", error);
        });
    }
  },
};
</script>

<style scoped>
.bg-card-review-above-div {
  background: lightyellow;
  color: black;
  border: 2px solid blue;
}

.bg-card-review {
  color: black;
}

.entire-div {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.property-details {
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.carousel img {
  height: 400px;
  object-fit: contain;
}

.price-h3 {
  color: lightskyblue;
  font-size: xx-large;
  font-weight: 600;
}

.pricePer-h3 {
  color: lightgreen;
  font-size: larger;
  font-weight: 600;
}

.ratings,
.reviews {
  margin-top: 2rem;
}

.review-item {
  border-radius: 5px;
}
</style>
