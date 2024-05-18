<template>
  <div class="bg-dark entire-div">
    <div class="container pt-4 pb-4 text-light">
      <form @submit.prevent="submitForm">
        <div class="small-container bg-secondary p-3 mx-auto">
          <div class="form-group ">
            <label for="property-name">Property Name</label>
            <div class="pl-5 pr-5">
              <input type="text" class="form-control" id="property-name" v-model="form.name" required placeholder="Enter property name"/>
            </div>
          </div>
          
          <div class="form-group">
            <label for="property-location">Location</label>
            <div class="pl-5 pr-5">
              <input type="text" class="form-control" id="property-location" v-model="form.location" required placeholder="Enter property location...  e.g. Novi Sad" />
            </div>
          </div>

          <div class="form-group">
            <label>Filters</label>
            <div class="pl-5 pr-5">
              <div class="d-flex flex-wrap">
                <div class="form-check mr-3" v-for="filter in availableFilters" :key="filter">
                  <input class="form-check-input" type="checkbox" :id="filter" :value="filter" v-model="form.filters"/>
                  <label class="form-check-label" :for="filter">{{ filter }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Guests</label>
            <div class="form-row">
              <div class="pl-5 pr-5">
                <div class="col d-flex mb-2 text-center">
                  <label class="col">from:</label>
                  <input type="number" class="form-control col-3" v-model="form.minGuests" min="1" required placeholder="Min Guests"/>
                </div>
                <div class="col d-flex text-center">
                  <label class="col">to:</label>
                  <input type="number" class="form-control col-3" v-model="form.maxGuests" min="1" required placeholder="Max Guests" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Price Type</label>
            <div class="d-flex align-items-center pl-5 pr-5">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="price-per-unit" value="per-unit" v-model="form.priceType" required />
                <label class="form-check-label" for="price-per-unit">Price per Unit</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="price-per-person" value="per-person" v-model="form.priceType" required />
                <label class="form-check-label" for="price-per-person">Price per Person</label>
              </div>
              <input type="number" class="form-control col-3 pr-1" id="property-price" min="0" v-model="form.price" required placeholder="Enter price" />
              <label for="property-price">(€)</label>
            </div>
          </div>

          <div class="form-group">
            <label>Availability</label>
            <div class="col-12 pl-5 pr-5">
              <VueDatePicker
                v-model="form.availability"
                range
                range-separator="to"
                start-placeholder="Start date"
                end-placeholder="End date"
              ></VueDatePicker>
            </div>
          </div>

          <div class="form-group">
            <label for="property-images">Images</label>
            <div class="pl-5 pr-5">
              <input type="file" class="form-control-file" id="property-images" @change="onFileChange" multiple/>
            </div>
            <div class="image-preview pt-3 d-flex align-items-center">
              <div v-if="form.images.length > 0">
                <div class="carousel" id="carouselExample" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item" v-for="(image, index) in form.images" :key="index" :class="{ active: index === 0 }">
                      <img :src="image" class="d-block carousel-image" />
                    </div>
                  </div>
                </div>
                <div class="mt-2 pl-2">
                  <img v-for="(image, index) in form.images" :key="index" :src="image" class="img-thumbnail thumbnail-image" @click="setMainImage(index)"/>
                </div>
              </div>
            </div>
          </div>
            <button type="submit" class="btn btn-info btn-lg btn-block">Submit</button>
        </div>
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

.small-container {
  background-color: gray;
  width: 50%;
}

.carousel-image {
  width: 100%;
  height: 30rem;
  object-fit: contain; 
}

.thumbnail-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

</style>
