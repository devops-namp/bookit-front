<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <search-bar 
          :filters="filters"
          :minPrice= "priceRange[0]"
          :maxPrice= "priceRange[1]"/>
      <div class="row mt-4">
        <div class="col-md-3">
          <div class="filter-section">
            <h5>Filters</h5>
            <div class="form-group">
              <label for="priceRange">Price Range</label>
              <slider v-model="priceRange" :format="format" :min="0" :max="500" :tooltips="false" />
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
            <div class="col-md-4" v-for="result in searchResults" :key="result.id" @click="openDetailedPropertyCard(result)">
              <result-card
                :image="result.image"
                :name="result.name"
                :location="result.location"
                :filters="result.filters"
                :minGuests="result.minGuests"
                :maxGuests="result.maxGuests"
                :price="result.price"
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

export default {
  name: 'SearchPage',
  components: {
    NavBar,
    SearchBar,
    Slider,
    ResultCard
  },
  data() {
    return {
      priceRange: [100, 400],
      filters: {
        wifi: false,
        kitchen: false,
        airCondition: false,
        freeParking: false,
        sharedToilet: false,
      },
      searchResults: [
        {
          id: 1,
          image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/410940840.jpg?k=b149e5fa4c594b1445ea62e50c721aecfbde51ec63ace29d0a0563f2e34ef791&o=&hp=1',
          name: 'Apartment 1',
          location: 'Belgrade',
          filters: {
            wifi: true,
            kitchen: true,
            airCondition: false,
            freeParking: true,
            sharedToilet: false,
          },
          minGuests: 2,
          maxGuests: 4,
          price: 150
        },
        {
          id: 2,
          image: 'https://orangeny.com/wp-content/uploads/placeholder-TEMP.gif',
          name: 'Apartment 2',
          location: 'Novi Sad',
          filters: {
            wifi: true,
            kitchen: false,
            airCondition: true,
            freeParking: false,
            sharedToilet: true,
          },
          minGuests: 1,
          maxGuests: 3,
          price: 120
        },
        {
          id: 3,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJay94_jpIR9LNgj8yJUrVuZRXPtA-zNwAcu1-fTRHw&s',
          name: 'Apartment 3',
          location: 'Niš',
          filters: {
            wifi: true,
            kitchen: true,
            airCondition: true,
            freeParking: true,
            sharedToilet: true,
          },
          minGuests: 2,
          maxGuests: 3,
          price: 210
        },
        {
          id: 4,
          image: 'https://orangeny.com/wp-content/uploads/placeholder-TEMP.gif',
          name: 'Apartment 4',
          location: 'Novi Sad',
          filters: {
            wifi: false,
            kitchen: true,
            airCondition: false,
            freeParking: false,
            sharedToilet: false,
          },
          minGuests: 1,
          maxGuests: 4,
          price: 200
        },
      ]
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
      this.$router.push({ path: "/propertyDetail"});
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
.entire-div {
  min-height: 100vh;
}
.filter-section {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
}
</style>
