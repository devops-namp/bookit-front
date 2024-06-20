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
              <input type="text" class="form-control" id="property-name" v-model="form.name" required
                placeholder="Enter property name" />
            </div>
          </div>

          <div class="form-group">
            <h5 for="property-location">Location</h5>
            <div class="pl-5 pr-5">
              <input type="text" class="form-control" id="property-location" v-model="form.location" required
                placeholder="Enter property location...  e.g. Novi Sad" />
            </div>
          </div>

          <div class="form-group">
            <h5>Filters</h5>
            <div class="pl-5 pr-5">
              <div class="d-flex flex-wrap">
                <div class="form-check mr-3" v-for="filter in availableFilters" :key="filter">
                  <input class="form-check-input" type="checkbox" :id="filter" :value="filter" v-model="form.filters" />
                  <label class="form-check-label" :for="filter">{{ filter }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <h5>Guests</h5>
            <div class="pl-5 pr-5 d-flex align-content-center">
              <label class="ml-5 pr-2">from:</label>
              <input type="number" class="form-control mr-5" v-model="form.minGuests" min="1" required
                placeholder="Min Guests" />
              <label class="pr-2 pl-2">to:</label>
              <input type="number" class="form-control mr-5" v-model="form.maxGuests" min="1" required
                placeholder="Max Guests" />
            </div>
          </div>

          <div class="form-group">
            <h5>Price Type</h5>
            <div class="d-flex justify-content-center">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="price-per-unit" value="per-unit"
                  v-model="form.priceType" required />
                <label class="form-check-label" for="price-per-unit">Price per Unit</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="price-per-person" value="per-person"
                  v-model="form.priceType" required />
                <label class="form-check-label" for="price-per-person">Price per Person</label>
              </div>
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
                    <div class="carousel-item" v-for="(image, index) in form.images" :key="index"
                      :class="{ active: index === 0 }">
                      <img :src="image" class="d-block carousel-image" />
                    </div>
                  </div>
                </div>
                <div class="mt-2 d-flex flex-wrap justify-content-center">
                  <div class="image-container pr-2 pb-2" v-for="(image, index) in form.images" :key="index">
                    <img :src="image" class="img-thumbnail thumbnail-image" @click="setMainImage(index)" />
                    <button type="button" class="btn btn-danger btn-sm btn-delete-img btn-block mt-1"
                      @click="removeImage(index)">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-info btn-lg btn-block mb-3">
            Submit
          </button>
        </div>
      </form>
      <div class="small-container bg-secondary p-3 mx-auto">
        <h4>Availability</h4>
        <div class="form-group">
          <h5>Add price availability</h5>
          <div class="pl-4 pr-4">
            <div v-for="(priceAdjustment, index) in pricePlusAdjustments" :key="index" class="d-flex mb-2">
              <VueDatePicker v-model="priceAdjustment.dates" range range-separator="to" start-placeholder="Start date"
                end-placeholder="End date" class="mr-2" :enable-time-picker="false" format="dd-MM-yyyy"
                :min-date="new Date()"></VueDatePicker>
              <input type="number" class="form-control col-3 mr-2" v-model="priceAdjustment.price" min="0"
                placeholder="Price (€)" />
              <button type="button" class="btn btn-danger" @click="removePlusPriceAdjustment(index)">Remove</button>
            </div>
            <button type="button" class="btn btn-success" @click="addPlusPriceAdjustment">Add New Interval</button>
          </div>
        </div>
        <button class="btn btn-info btn-lg btn-block mb-5" @click="updatePlusPriceAdjustments">
          Add availabilites
        </button>

        <div class="form-group">
          <h5>Remove availability</h5>
          <div class="pl-4 pr-4">
            <div v-for="(priceAdjustment, index) in priceMinusAdjustments" :key="index" class="d-flex mb-2">
              <VueDatePicker v-model="priceAdjustment.dates" range range-separator="to" start-placeholder="Start date"
                end-placeholder="End date" class="mr-2" :enable-time-picker="false" format="dd-MM-yyyy"
                :min-date="new Date()"></VueDatePicker>
              <button type="button" class="btn btn-danger" @click="removeMinusPriceAdjustment(index)">Remove</button>
            </div>
            <button type="button" class="btn btn-success" @click="addMinusPriceAdjustment">Add New Interval </button>
          </div>
        </div>

        <button class="btn btn-info btn-lg btn-block mb-5" @click="updateMinusPriceAdjustments">
          Remove availabilites
        </button>
        <VCalendar expanded :attributes='calendarAttributes' @update:pages="handleMonthChange" ref="calendar"></VCalendar>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../util/NavBar.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AccommodationService from '@/service/AccommodationService';
import { toast } from 'vue3-toastify';
import { th } from "date-fns/locale";

export default {
  name: "CreatePropertyListing",
  components: {
    VueDatePicker,
    NavBar,
  },
  computed: {
    calendarAttributes() {
      return this.accommodations.map((item) => {
        let attribute = {
          key: item.date,
          dates: item.date,
          customData: { price: item.price },
        };
        if (item.status.toLowerCase() === 'available') {
          attribute.highlight = { color: 'green', fillMode: 'light' };
          attribute.color = '#00ff00';
          attribute.popover = {
            label: `Available - $${item.price}`
          };
        } else {
          attribute.color = '#ff0000';
          attribute.highlight = { color: 'red', fillMode: 'light' };
          attribute.popover = {
            label: 'Reserved'
          };
        }
        return attribute;
      });
    }
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
      },
      pricePlusAdjustments: [],
      priceMinusAdjustments: [],
      availableFilters: [
        "WiFi",
        "Pool",
        "Parking",
        "Fireplace",
        "Spa",
        "Bath",
        "Balcony",
        "Kitchen",
      ],
      filterMap: {
        "wifi": "WiFi",
        "pool": "Pool",
        "parking": "Parking",
        "fireplace": "Fireplace",
        "spa": "Spa",
        "bath": "Bath",
        "balcony": "Balcony",
        "kitchen": "Kitchen",
      },
      accommodationId: null,
      accommodations: [],
    };
  },
  created() {
    const propertyId = this.$route.params.id;
    this.accommodationId = propertyId;
    console.log(`Property ID from route: ${propertyId}`);
    if (propertyId) {
      this.setAccommodationInfo();
    }

  },
  methods: {
    submitForm() {

      const submissionData = {
        ...this.form,
        filters: this.form.filters.join(', ').toLocaleLowerCase(),
        images: this.form.images.map(image => {return {'base64Image': image.split(',')[1]}})
      };

      console.log("Form submitted:", submissionData);
      let method, params, msg;
      if (this.accommodationId) {
        method = AccommodationService.updateAccommodation
        params = [this.accommodationId, submissionData];
        msg = 'Accommodation updated successfully!';
      } else {
        method = AccommodationService.addAccommodation
        params = [submissionData];
        msg = 'New accommodation added';
      }
      method(...params).then(res => {
        toast(msg, {
          autoClose: 1000,
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT
        });
        console.log(res.data);
        let accommodationId = res.data.id;
        this.accommodationId = accommodationId;
        console.log("ID");
        console.log(this.accommodationId);

      }).catch(err => {
        toast('You did something wrong!!!', {
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
    addPlusPriceAdjustment() {
      this.pricePlusAdjustments.push({ dates: [], price: null });
    },
    removePlusPriceAdjustment(index) {
      this.pricePlusAdjustments.splice(index, 1);
    },
    addMinusPriceAdjustment() {
      this.priceMinusAdjustments.push({ dates: [] });
    },
    removeMinusPriceAdjustment(index) {
      this.priceMinusAdjustments.splice(index, 1);
    },
    updatePlusPriceAdjustments() {
      if (!this.accommodationId) return;
      console.log(this.pricePlusAdjustments);
      let pricePlusAdjustments = [];

      this.pricePlusAdjustments.forEach(priceAdjustment => {
        pricePlusAdjustments.push({
          startDate: priceAdjustment.dates[0].toISOString().split('T')[0],
          endDate: priceAdjustment.dates[1].toISOString().split('T')[0],
          price: priceAdjustment.price
        });
      });

      const pricePlusAdjustmentsList = {
        pricesPerInterval: pricePlusAdjustments
      };

      console.log(pricePlusAdjustmentsList);
      AccommodationService.adjustPrice(this.accommodationId, pricePlusAdjustmentsList).then(res => {
        toast('Price adjusted successfully!', {
          autoClose: 1000,
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.fetchAccommodationDates(this.$refs.calendar.pages[0].month, this.$refs.calendar.pages[0].year);
        console.log(res.data);
      }).catch(err => {
        toast('Failed to adjust price!', {
          autoClose: 1000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.fetchAccommodationDates(this.$refs.calendar.pages[0].month, this.$refs.calendar.pages[0].year);
        console.log(err);
      });
    },
    updateMinusPriceAdjustments() {
      if (!this.accommodationId) return;
      let priceMinusAdjustments = [];
      this.priceMinusAdjustments.forEach(priceAdjustment => {
        priceMinusAdjustments.push({
          startDate: priceAdjustment.dates[0].toISOString().split('T')[0],
          endDate: priceAdjustment.dates[1].toISOString().split('T')[0],
        });
      });
      const priceMinusAdjustmentsList = {
        pricesPerInterval: priceMinusAdjustments
      };
      console.log(priceMinusAdjustmentsList);
      console.log(this.accommodationId);
      AccommodationService.removePrice(this.accommodationId, priceMinusAdjustmentsList).then(res => {
        toast('Price removed!', {
          autoClose: 1000,
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT
        });
        
        this.fetchAccommodationDates(this.$refs.calendar.pages[0].month, this.$refs.calendar.pages[0].year);
        console.log(res.data);
      }).catch(err => {
        toast('Failed to remove price!', {
          autoClose: 1000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.fetchAccommodationDates(this.$refs.calendar.pages[0].month, this.$refs.calendar.pages[0].year);
        console.log(err);
      });

    },
    handleMonthChange(newPage) {
      console.log('Month changed to:', newPage);
      if (newPage[0].id === this.month_id) return;
      console.log(newPage[0].month);
      console.log(newPage[0].year);
      this.fetchAccommodationDates(newPage[0].month, newPage[0].year);
      this.month_id = newPage[0].id;
    },
    fetchAccommodationDates(month, year) {
      if (!this.accommodationId) return;
      AccommodationService.getDatesInfo(this.accommodationId, month, year)
        .then(response => {
          console.log("Accommodation dates:", response.data);
          this.accommodations = response.data;

        })
        .catch(error => {
          console.error("Error fetching accommodation dates:", error);
        });
    },
    removeImage(index) {
      this.form.images.splice(index, 1);
    },
    setAccommodationInfo() {
      AccommodationService.getAccommodation(this.$route.params.id)
      .then(response => {
        console.log("Accommodation by id:", response.data);
        let property = response.data;
        this.form = {
        ...property,
        filters: property.filters.split(', ').map(filter => this.filterMap[filter]),
        images: property.images.map(image => `data:image/png;base64,${image.base64Image}`),
      };
      })
      .catch(error => {
        console.error("Error fetching accommodation by id:", error);
      });
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
