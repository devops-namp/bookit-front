<template>
  <div class="row mt-3">
    <div class="col-2">
      <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Location" v-model="localSelectedLocation" />
      <datalist id="datalistOptions">
        <option v-for="location in allLocations" :value="location" :key="location">
          {{ location }}
        </option>
      </datalist>
    </div>
    <div class="col-2">
      <VueDatePicker
        v-model="localStartDate"
        placeholder="Start Date"
        format="dd-MM-yyyy"
        :autoClose="true"
        :min-date="new Date()"
        :enable-time-picker="false"
      ></VueDatePicker>
    </div>
    <div class="col-2">
      <VueDatePicker
        v-model="localEndDate"
        placeholder="End Date"
        format="dd-MM-yyyy"
        :autoClose="true"
        :min-date="new Date()"
        :enable-time-picker="false"
      ></VueDatePicker>
    </div>
    <div class="col d-flex align-items-center">
      <input type="number" class="form-control" v-model.number="localAdults" @input="validateInput('localAdults')" />
      <label class="text-light ml-2">Adults</label>
    </div>
    <div class="col d-flex align-items-center">
      <input type="number" class="form-control" v-model.number="localChildren" @input="validateInput('localChildren')" />
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
    selectedLocation: String,
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    adults: {
      type: Number,
      default: 2
    },
    children: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localSelectedLocation: this.selectedLocation || "",
      localStartDate: this.startDate || null,
      localEndDate: this.endDate || null,
      localAdults: this.adults,
      localChildren: this.children,
      allLocations: ["Belgrade", "Novi Sad", "Niš", "Kopaonik", "Zlatibor"],
    };
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  methods: {
    generateSearchUrl(location, startDate, endDate, adultsNum, childrenNum) {
      const params = new URLSearchParams();

      if (location) params.append('selectedLocation', location);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (adultsNum) params.append('adults', adultsNum);
      if (childrenNum) params.append('children', childrenNum);
      return `/search?${params.toString()}`;
    },
    validateInput(field) {
      if (this[field] < 0) {
        this[field] = 0;
      }
    },
    search_it() {
      const searchUrl = this.generateSearchUrl(
        this.localSelectedLocation,
        this.localStartDate ? this.localStartDate.toISOString().split('T')[0] : '',
        this.localEndDate ? this.localEndDate.toISOString().split('T')[0] : '',
        this.localAdults,
        this.localChildren
      );
      this.router.push(searchUrl);
    }
  },
};

</script>

<style scoped>
</style>
