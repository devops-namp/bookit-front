<template>
  <div class="bg-dark entire-div">
    <div class="container pt-4 text-light">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group col-3">
            <label for="property-name">Property Name</label>
            <input type="text" class="form-control" id="property-name" v-model="form.name" required placeholder="Enter property name"/>
          </div>
          <div class="form-group col-3">
            <label for="property-location">Location</label>
            <input type="text" class="form-control" id="property-location" v-model="form.location" required placeholder="Enter property location... e.g. Niš" />
          </div>
          <div class="form-group col">
            <label>Filters</label>
            <div class="d-flex flex-wrap">
              <div class="form-check mr-3" v-for="filter in availableFilters" :key="filter">
                <input class="form-check-input" type="checkbox" :id="filter" :value="filter" v-model="form.filters"/>
                <label class="form-check-label" :for="filter">{{ filter }}</label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group col-2">
            <label>Guests</label>
            <div class="form-row">
              <div class="col d-flex">
                <label class="col-4">from:</label>
                <input type="number" class="form-control col" v-model="form.minGuests" min="1" required placeholder="Min Guests"/>
              </div>
            </div>
            <div class="form-row">
              <div class="col d-flex">
                <label class="col-4">to:</label>
                <input type="number" class="form-control col" v-model="form.maxGuests" min="1" required placeholder="Max Guests" />
              </div>
            </div>
          </div>
          
          <div class="form-group col pl-5">
            <label>Price Type</label>
            <div class="d-flex">
              <div class="col-3">
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="price-per-unit" value="per-unit" v-model="form.priceType" required />
                  <label class="form-check-label" for="price-per-unit">Price per Unit</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="price-per-person" value="per-person" v-model="form.priceType" required />
                  <label class="form-check-label" for="price-per-person">Price per Person</label>
                </div>
              </div>
              <div class="col">
                <div class="form-check">
                  <label for="property-price">Price (€)</label>
                  <input type="number" class="form-control" id="property-price" v-model="form.price" required placeholder="Enter price" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Availability</label>
          <VueDatePicker
            v-model="form.availability"
            range
            range-separator="to"
            start-placeholder="Start date"
            end-placeholder="End date"
          ></VueDatePicker>
        </div>

        <div class="form-group">
          <label for="property-images">Images</label>
          <input type="file" class="form-control-file" id="property-images" @change="onFileChange" multiple/>
          <div class="image-preview mt-3">
            <div v-if="form.images.length > 0">
              <div class="carousel slide" id="carouselExample" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item" v-for="(image, index) in form.images" :key="index" :class="{ active: index === 0 }">
                    <img :src="image" class="d-block w-100" />
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExample" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div class="mt-2">
                <img v-for="(image, index) in form.images" :key="index" :src="image" class="img-thumbnail" @click="setMainImage(index)"/>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'CreatePropertyListing',
  components: {
    VueDatePicker,
  },
  data() {
    return {
      form: {
        name: '',
        location: '',
        filters: [],
        minGuests: 1,
        maxGuests: 1,
        priceType: 'per-unit',
        price: null,
        availability: [],
        images: [],
      },
      availableFilters: ['WiFi', 'Free Parking', 'Kitchen', 'Air Condition', 'Shared Toilet'],
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
    },
    onFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.images.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    setMainImage(index) {
      const selectedImage = this.form.images[index];
      this.form.images.splice(index, 1);
      this.form.images.unshift(selectedImage);
    },
  },
};
</script>

<style scoped>
.entire-div {
  min-height: 100vh;
}
.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  margin: 5px;
}
</style>
