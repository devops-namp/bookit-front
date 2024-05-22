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
            <div v-for="(image, index) in property.images" :key="index" :class="['carousel-item', { active: index === 0 }]" >
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
              <h3 class="price-h3">{{property.price}}€</h3> *in full
              <h3 class="pricePer-h3 pl-4">{{property.pricePer}}€</h3> *{{formatPriceType(property.priceType)}}
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
              <VueDatePicker
                v-model="reservationDate"
                range
                range-separator="to"
                start-placeholder="Start date"
                end-placeholder="End date"
                class="mr-2"
                :enable-time-picker="false"
                format="dd-MM-yyyy"
                :min-date="new Date()"
                disabled 
              ></VueDatePicker>
            </div>
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

        <div class="reviews mt-5">
          <h3 class="text-center">Reviews</h3>
          <div class="row">
            <div v-for="review in reviews" :key="review.id" class="review-item card mb-3 mr-auto col-3 bg-card-review-above-div ml-auto">
              <div class="card-body bg-card-review">
                <p class="card-text"><strong>Rating:</strong> {{ review.rating }} / 5</p>
                <p class="card-text"><strong>Date:</strong> {{ formatDate(review.date) }}</p>
                <p class="card-text"><strong>User:</strong> {{ review.user.firstName }} {{ review.user.lastName }}</p>
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
      const total = this.reviews.reduce((sum, review) => sum + review.hostRating, 0);
      return (total / this.reviews.length).toFixed(1);
    },
    averagePropertyRating() {
      const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      return (total / this.reviews.length).toFixed(1);
    }
  },
  data() {
    return {
      reservationDate: ["2023-10-21", "2023-10-30"],
      adults: 2,
      children: 0,
      property: {
        name: "Central Konaci Apartments",
        location: "Kopaonik",
        filters: ["WiFi", "Free Parking", "Kitchen"],
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
      reviews: [
        {
          id: 1,
          rating: 5,
          hostRating: 5,
          date: "2023-05-21",
          user: { firstName: "Branko", lastName: "Brankic" }
        },
        {
          id: 2,
          rating: 4,
          hostRating: 4,
          date: "2023-06-10",
          user: { firstName: "Janko", lastName: "Jankic" }
        },
        {
          id: 3,
          rating: 5,
          hostRating: 5,
          date: "2023-05-21",
          user: { firstName: "Branko", lastName: "Brankic" }
        },
        {
          id: 4,
          rating: 4,
          hostRating: 4,
          date: "2023-06-10",
          user: { firstName: "Janko", lastName: "Jankic" }
        },
        {
          id: 5,
          rating: 5,
          hostRating: 5,
          date: "2023-05-21",
          user: { firstName: "Branko", lastName: "Brankic" }
        },
        {
          id: 6,
          rating: 4,
          hostRating: 4,
          date: "2023-06-10",
          user: { firstName: "Janko", lastName: "Jankic" }
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
    reserveProperty() {
      console.log("Property reserved:", this.property);
      alert("Reservation successful!");
    },
  },
};
</script>

<style scoped>
.bg-card-review-above-div{
  background: lightyellow;
  color: black;
  border: 2px solid blue;
}

.bg-card-review{
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

.ratings, .reviews {
  margin-top: 2rem;
}

.review-item {
  border-radius: 5px;
}
</style>
