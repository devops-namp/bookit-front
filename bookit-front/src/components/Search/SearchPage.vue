<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar/>
      <search-bar/>
    </div>
  </div>
</template>


<script>
import NavBar from '../util/NavBar.vue'
import SearchBar from '../util/SearchBar.vue'

export default {
  name: 'SearchPage',
  components: {
    NavBar,
    SearchBar,
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
