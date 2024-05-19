<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
    </div>
    <div class="container pt-5 pb-5">
      <div class="property-details bg-secondary p-5 mx-auto text-white">
        <h1 class="text-center">{{ property.name }}</h1>
        <p class="text-center">{{ property.location }}</p>
        <div class="carousel slide" id="propertyCarousel" data-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(image, index) in property.images" :key="index" :class="['carousel-item', { active: index === 0 }]">
              <img :src="image" class="d-block w-100" alt="Property Image">
            </div>
          </div>
          <a class="carousel-control-prev" href="#propertyCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#propertyCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="property-info mt-4">
          <h3>Details</h3>
          <p><strong>Location:</strong> {{ property.location }}</p>
          <p><strong>Guests:</strong> {{ property.minGuests }} to {{ property.maxGuests }}</p>
          <p><strong>Price Type:</strong> {{ property.priceType === 'per-unit' ? 'Price per Unit' : 'Price per Person' }}</p>
          <h4>Filters</h4>
          <ul>
            <li v-for="filter in property.filters" :key="filter">{{ filter }}</li>
          </ul>
          <h4>Price(s)</h4>
          <div>
            <ul>
              <li v-for="(adjustment, index) in property.priceAdjustments" :key="index">
                From {{ formatDate(adjustment.dates[0]) }} to {{ formatDate(adjustment.dates[1]) }}: €{{ adjustment.price }}
              </li>
            </ul>
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-block mt-4" @click="reserveProperty">Reserve</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../util/NavBar.vue';
import moment from 'moment';

export default {
  name: 'PropertyDetailPage',
  components: {
    NavBar
  },
  data() {
    return {
      property: {
        name: 'Central Konaci Apartments',
        location: 'Kopaonik',
        filters: ['WiFi', 'Free Parking', 'Kitchen'],
        minGuests: 1,
        maxGuests: 5,
        priceType: 'per-unit',
        images: [
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1',
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/551077088.jpg?k=9de972a17f808f2f55930ca0538846e2383f3a2041934decd50fa69691453a07&o=&hp=1',
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520536.jpg?k=4c3d970eed45c89579f39ca1e109dd01a31b12dbbd34f1fa417934fd919496dc&o=&hp=1',
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520898.jpg?k=bfe2fe818abb30c41c7a2ec70bdfe560d251484e2e542abab0ea0a8931f170c2&o=&hp=1',
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1',
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1',
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520909.jpg?k=f061149dd59c7a7a4fe9c51440f24eff26d009668f0704d9b7348482f3aef981&o=&hp=1'
        ],
        priceAdjustments: [
          { dates: ['2023-06-01', '2023-06-10'], price: 100 },
          { dates: ['2023-07-01', '2023-07-10'], price: 120 },
        ],
      },
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY');
    },
    reserveProperty() {
      console.log('Property reserved:', this.property);
      alert('Reservation successful!');
    },
  },
};
</script>

<style scoped>
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
</style>
