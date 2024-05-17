<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <search-bar />
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
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../util/NavBar.vue';
import SearchBar from '../util/SearchBar.vue';
import Slider from '@vueform/slider';

export default {
  name: 'SearchPage',
  components: {
    NavBar,
    SearchBar,
    Slider
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
      }
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
