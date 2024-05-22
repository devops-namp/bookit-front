<template>
  <div class="row mt-3">
    <div class="col-2">
      <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Location" v-model="selectedLocation" />
      <datalist id="datalistOptions">
        <option v-for="location in allLocations" :value="location" :key="location" >
          {{ location }}
        </option>
      </datalist>
    </div>
    <div class="col-2">
      <VueDatePicker
        v-model="startDate"
        placeholder="Start Date"
        format="dd-MM-yyyy"
        :autoClose="true"
        :min-date="new Date()"
        :enable-time-picker="false"
      ></VueDatePicker>
    </div>
    <div class="col-2">
      <VueDatePicker
        v-model="endDate"
        placeholder="End Date"
        format="dd-MM-yyyy"
        :autoClose="true"
        :min-date="new Date()"
        :enable-time-picker="false"
      ></VueDatePicker>
    </div>
    <div class="col d-flex align-items-center">
      <input type="number" class="form-control" v-model.number="adults" @input="validateInput('adults')" />
      <label class="text-light ml-2">Adults</label>
    </div>
    <div class="col d-flex align-items-center">
      <input type="number" class="form-control" v-model.number="children" @input="validateInput('children')"/>
      <label class="text-light ml-2">Children</label>
    </div>
    <div class="col-1 d-flex align-items-center justify-content-end">
      <button class="btn btn-info" @click="search_it">Search</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "SearchBar",
  props: {
    filters: Object,
    minPrice: Number,
    maxPrice: Number,
    selectedLocation: String
  },
  data() {
    return {
      selectedLocation: this.selectedLocation || "",
      startDate: "",
      endDate: "",
      adults: 2,
      children: 0,
      allLocations: ["Belgrade", "Novi Sad", "Niš", "Kopaonik", "Zlatibor"],
    };
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  methods: {
    validateInput(field) {
      if (this[field] < 0) {
        this[field] = 0;
      }
    },
    search_it() {
      console.log(this.filters, this.minPrice, this.maxPrice);
      this.router.push({ path: "/search" });
    },
  },
};
</script>

<style scoped>
</style>
