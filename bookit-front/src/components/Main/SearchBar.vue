<template>
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
</template>

<script>
export default {
  name: 'SearchBar',
  computed:{
  },
  mounted() {
  },
  data() {
    return {
        selectedLocation: '',
        startDate: '',
        endDate: '',
        adults: 2,
        children: 0,
        rooms: 1,
        allLocations: ['Belgrade', 'Novi Sad', 'Niš', 'Kopaonik', 'Zlatibor']
    };
  },
  methods: {
  },
  }
</script>

<style scoped>

</style>
