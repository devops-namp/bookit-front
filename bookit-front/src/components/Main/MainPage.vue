<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar/>
      <div>
        <img src="../../assets/mainPageBookitTripPhoto.jpg" class="img-fluid img-responsive" alt="Your Image Alt Text">
      </div>
      
      <div class="row mt-3">
        <div class="col-2">
          <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Location" v-model="selectedLocation">
          <datalist id="datalistOptions">
            <option v-for="location in allLocations" :value="location" :key="location">{{ location }}</option>
          </datalist>
        </div>
        <div class="col-2">
          <VueDatePicker
            v-model="startDate"
            placeholder="Start Date"
            format="yyyy-MM-dd"
            :autoClose="true"
          />
        </div>
        <div class="col-2">
          <VueDatePicker
            v-model="endDate"
            placeholder="End Date"
            format="yyyy-MM-dd"
            :autoClose="true"
          />
        </div>
        <div class="col d-flex align-items-center">
          <input type="number" class="form-control" v-model="adults">
          <label class="text-light ml-2">Adults</label>
        </div>
        <div class="col d-flex align-items-center">
          <input type="number" class="form-control" v-model="children">
          <label class="text-light ml-2">Children</label>
        </div>
        <div class="col d-flex align-items-center">
          <input type="number" class="form-control" v-model="rooms">
          <label class="text-light ml-2">Rooms</label>
        </div>
        <div class="col-1 d-flex align-items-center justify-content-end">
          <button class="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from './NavBar.vue'

export default {
  name: 'MainPage',
  components: {
    NavBar
  },
  data() {
    return {
      selectedLocation: '',
      startDate: '',
      endDate: '',
      adults: 2,
      children: 0,
      rooms: 1,
      allLocations: ['San Francisco', 'New York', 'Seattle', 'Los Angeles', 'Chicago', 'London', 'Paris', 'Tokyo']
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
