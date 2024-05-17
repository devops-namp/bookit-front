<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar/>
      <div>
        <img src="../../assets/mainPageBookitTripPhoto.jpg" class="img-fluid img-responsive" alt="Your Image Alt Text">
      </div>
      <search-bar/>
      <trending-destinations/>
    </div>
  </div>
</template>


<script>
import NavBar from './NavBar.vue'
import SearchBar from './SearchBar.vue'
import TrendingDestinations from './TrendingDestinations.vue'

export default {
  name: 'MainPage',
  components: {
    NavBar,
    SearchBar,
    TrendingDestinations
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.entire-div {
  min-height: 100vh;
}
.img-responsive {
  width: 100%;
  max-height: 70vh; 
  margin: auto;
}
</style>
