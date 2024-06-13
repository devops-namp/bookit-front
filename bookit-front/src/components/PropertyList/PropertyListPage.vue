<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
    </div>
    <div class="container pt-5 pb-5 text-light">
      <form @submit.prevent="submitForm">
        <div class="small-container bg-secondary p-3 mx-auto">
          <div class="form-group">
            <h5 for="property-name">Property Name</h5>
            <div class="pl-5 pr-5">
              <input type="text" class="form-control" id="property-name" v-model="form.name" required placeholder="Enter property name" />
            </div>
          </div>

          <div class="form-group">
            <h5 for="property-location">Location</h5>
            <div class="pl-5 pr-5">
              <input type="text" class="form-control" id="property-location" v-model="form.location" required placeholder="Enter property location...  e.g. Novi Sad"/>
            </div>
          </div>

          <div class="form-group">
            <h5>Filters</h5>
            <div class="pl-5 pr-5">
              <div class="d-flex flex-wrap">
                <div class="form-check mr-3" v-for="filter in availableFilters" :key="filter">
                  <input class="form-check-input" type="checkbox" :id="filter" :value="filter" v-model="form.filters" />
                  <label class="form-check-label" :for="filter">{{filter}}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <h5>Guests</h5>
            <div class="pl-5 pr-5 d-flex align-content-center">
              <label class="ml-5 pr-2">from:</label>
              <input type="number" class="form-control mr-5" v-model="form.minGuests" min="1" required placeholder="Min Guests"/>
              <label class="pr-2 pl-2">to:</label>
              <input type="number" class="form-control mr-5" v-model="form.maxGuests" min="1" required placeholder="Max Guests"/>
            </div>
          </div>

          <div class="form-group">
            <h5>Price Type</h5>
            <div class="d-flex justify-content-center">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="price-per-unit" value="per-unit" v-model="form.priceType" required />
                <label class="form-check-label" for="price-per-unit">Price per Unit</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="price-per-person" value="per-person" v-model="form.priceType" required />
                <label class="form-check-label" for="price-per-person">Price per Person</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <h5>Price Adjustments</h5>
            <div class="pl-4 pr-4">
              <div v-for="(priceAdjustment, index) in form.priceAdjustments" :key="index" class="d-flex mb-2">
                <VueDatePicker
                  v-model="priceAdjustment.dates"
                  range
                  range-separator="to"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  class="mr-2"
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                  :min-date="new Date()"
                ></VueDatePicker>
                <input type="number" class="form-control col-3 mr-2" v-model="priceAdjustment.price" min="0" placeholder="Price (€)"/>
                <button type="button" class="btn btn-danger" @click="removePriceAdjustment(index)">Remove</button>
              </div>
              <button type="button" class="btn btn-success" @click="addPriceAdjustment" > Add Price Adjustment </button>
            </div>
          </div>

          <div class="form-group">
            <h5 for="property-images">Images</h5>
            <div class="pl-5 pr-5">
              <input type="file" class="form-control-file" id="property-images" @change="onFileChange" multiple />
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
                <div class="mt-2 d-flex flex-wrap justify-content-center">
                  <div class="image-container pr-2 pb-2" v-for="(image, index) in form.images" :key="index">
                    <img :src="image" class="img-thumbnail thumbnail-image" @click="setMainImage(index)"/>
                    <button type="button" class="btn btn-danger btn-sm btn-delete-img btn-block mt-1" @click="removeImage(index)">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-info btn-lg btn-block">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from "../util/NavBar.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AccommodationService from '@/service/AccommodationService';
import { toast } from 'vue3-toastify';

export default {
  name: "CreatePropertyListing",
  components: {
    VueDatePicker,
    NavBar,
  },
  data() {
    return {
      form: {
        name: "",
        location: "",
        filters: [],
        minGuests: 1,
        maxGuests: 1,
        priceType: "per-unit",
        images: [],
        priceAdjustments: [],
      },
      availableFilters: [
        "WiFi",
        "Pool",
        "Free_Parking",
        "Fireplace",
        "Shared Toilet",
      ],
    };
  },
  created() {
    const propertyId = this.$route.params.id;
    console.log(`Property ID from route: ${propertyId}`);
    const property = this.getPropertyById();
    console.log(property);
    if (propertyId) {
      this.form = {
        ...property,
        images: property.images || [],
        priceAdjustments: property.priceAdjustments || []
      };
    }
  },
  methods: {
    submitForm() {
      console.log(this.form.priceAdjustments);
      console.log("Form submitted:", this.form);
      AccommodationService.addAccommodation(this.form).then(res => {
          this.accommodations = res.data
          this.$emit('update-search-results', res.data);
      }).catch(err => {
        toast(err.response.data, {
          autoClose: 1000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
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
    addPriceAdjustment() {
      this.form.priceAdjustments.push({ dates: [], price: null });
    },
    removePriceAdjustment(index) {
      this.form.priceAdjustments.splice(index, 1);
    },
    removeImage(index) {
      this.form.images.splice(index, 1);
    },
    getPropertyById() {
      const propertySent = 
        {
          id: 1,
          name: "Central Konaci Apartments on APrtments on Apartments",
          location: "Kopaonik",
          filters: ["WiFi"],
          minGuests: 1,
          maxGuests: 6,
          priceType: "per-unit",
          images: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1"
          ],
          priceAdjustments: [
            {
              dates: [
                new Date("2024-05-21T09:20:00"),
                new Date("2024-05-31T09:20:00")
              ],
              price: 1555
            },
            {
              dates: [
                new Date("2024-05-21T09:20:00"),
                new Date("2024-05-31T09:20:00")
              ],
              price: 1600
            }
          ]
        }
        return propertySent
  },
  }
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

.image-container {
  position: relative;
}

.btn-delete-img {
  width: 100px;
}
</style>
