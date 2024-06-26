<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <search-bar 
          @update-search-results="updateSearchResults"
          @update-search-params="updateSearchParams"
          :filters="filters"
          :minPrice= "priceRange[0]"
          :maxPrice= "priceRange[1]"
          :selectedLocation="selectedLocation"
          :startDate="startDate"
          :endDate="endDate"
          :adults="adults"
          :children="children"/>
      <div class="row mt-4">
        <div class="col-md-3">
          <div class="filter-section">
            <h5>Filters</h5>
            <div class="form-group">
              <label for="priceRange">Price Range</label>
              <slider v-model="priceRange" :format="format" :min="0" :max="9999" :tooltips="false" />
              <div class="d-flex justify-content-between mt-2">
                <span>{{ priceRange[0] }}€</span>
                <span>{{ priceRange[1] }}€</span>
              </div>
            </div>
            <div class="form-check" v-for="(filter, key) in filters" :key="key">
              <input 
                class="form-check-input" 
                type="checkbox" 
                :id="key" 
                v-model="filters[key]"
              />
              <label class="form-check-label" :for="key">{{ filterFormat(key) }}</label>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-4 point-it" v-for="result in searchResults" :key="result.id" @click="openDetailedPropertyCard(result)">
              <result-card
                :image="result.accommodation.images && result.accommodation.images.length > 0 ? result.accommodation.images[0].base64Image : ''"
                :name="result.accommodation.name"
                :location="result.accommodation.location"
                :filters="result.accommodation.filters"
                :minGuests="result.accommodation.minGuests"
                :maxGuests="result.accommodation.maxGuests"
                :price="result.totalPrice"
                :pricePer="result.accommodation.pricePer"
                :priceType="result.accommodation.priceType"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../util/NavBar.vue';
import SearchBar from '../util/SearchBar.vue';
import Slider from '@vueform/slider';
import ResultCard from './ResultCard.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'SearchPage',
  components: {
    NavBar,
    SearchBar,
    Slider,
    ResultCard
  },
  created() {
    const route = useRoute();
    console.log(route.query);
    if (route.query.selectedLocation) {
      this.selectedLocation = route.query.selectedLocation;
    }
    if (route.query.startDate) {
      this.startDate = new Date(route.query.startDate);
    }
    if (route.query.endDate) {
      this.endDate = new Date(route.query.endDate);
    }
    if (route.query.adults) {
      this.adults = Number(route.query.adults);
    }
    if (route.query.children) {
      this.children = Number(route.query.children);
    }
  },
  data() {
    return {
      priceRange: [0, 9999],
      filters: {
        wifi: false,
        pool: false,
        parking: false,
        fireplace: false,
        spa: false,
        bath: false,
        balcony: false,
        kitchen: false,
      },
      selectedLocation: '',
      startDate: null,
      endDate: null,
      adults: 2,
      children: 0,
      searchResults: []
    };
  },
  methods: {
    format(value) {
      return `€${value}`;
    },
    filterFormat(filter) {
      return filter
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/^[a-z]/, match => match.toUpperCase())
        .trim();
    },
    openDetailedPropertyCard(trip) {
      console.log(trip);
      // set trip in store
      this.$store.commit('SET_TRIP', trip);
      this.$store.commit('SET_TOTALPRICE', trip.totalPrice);
      console.log(this.startDate);
      console.log(this.endDate);
      this.$store.commit('SET_SEARCH_FROM_DATE', this.startDate);
      this.$store.commit('SET_SEARCH_TO_DATE', this.endDate);
      this.$store.commit('SET_ADULTS', this.adults);
      this.$store.commit('SET_CHILDREN', this.children);

      this.$router.push({ path: `/propertyDetail/${trip.accommodation.id}`});
    },
    updateSearchResults(results) {
      console.log(results);
      this.searchResults = results;
    },
    updateSearchParams(params) {
      this.selectedLocation = params.location;
      this.startDate = new Date(params.fromDate);
      this.endDate = new Date(params.toDate);
      this.numGuests = params.numGuests;
    }
  },
  watch: {
    priceRange(newVal) {
      console.log('Price range changed:', newVal);
    },
    filters: {
      handler(newVal) {
        console.log('Filters changed:', newVal);
      },
      deep: true,
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.point-it{
  cursor: pointer;
}
.entire-div {
  min-height: 100vh;
}
.filter-section {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
}
</style>
