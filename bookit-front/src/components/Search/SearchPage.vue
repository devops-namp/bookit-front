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
              <vue3-slider v-model="priceRange" :min="0" :max="1000" :tooltip="'always'"/>
              <div class="d-flex justify-content-between">
                <span>{{ priceRange[0] }}$</span>
                <span>{{ priceRange[1] }}$</span>
              </div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="wifi" v-model="filters.wifi" />
              <label class="form-check-label" for="wifi">Wi-Fi</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="kitchen" v-model="filters.kitchen" />
              <label class="form-check-label" for="kitchen">Kitchen</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="airCondition" v-model="filters.airCondition" />
              <label class="form-check-label" for="airCondition">Air conditioning</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="freeParking" v-model="filters.freeParking" />
              <label class="form-check-label" for="freeParking">Free parking</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="wc" v-model="filters.wc" />
              <label class="form-check-label" for="wc">Inner toilet</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../util/NavBar.vue'
import SearchBar from '../util/SearchBar.vue'
import Vue3Slider from 'vue3-slider'

export default {
  name: 'SearchPage',
  components: {
    NavBar,
    SearchBar,
    Vue3Slider
  },
  data() {
    return {
      priceRange: [100, 500],
      filters: {
        wifi: false,
        kitchen: false,
        airCondition: false,
        freeParking: false,
        wc: false
      }
    }
  },
  watch: {
    priceRange(newVal) {
      console.log('Price range changed:', newVal)
    },
    filters: {
      handler(newVal) {
        console.log('Filters changed:', newVal)
      },
      deep: true
    }
  }
}
</script>

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
