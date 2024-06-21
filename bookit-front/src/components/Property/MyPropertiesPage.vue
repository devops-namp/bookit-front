<template>
  <div class="bg-dark entire-div">
    <div class="container">
      <nav-bar />
      <div class="properties-list pt-5 d-flex flex-column align-items-center">
        <h2 class="text-white mb-4">Manage properties</h2>
        <div class="property-card" v-for="property in properties" :key="property.id">
          <div class="d-flex justify-content-center p-5 col-3">
            <img v-if="property.images && property.images.length > 0" :src="'data:image/jpeg;base64,' + property.images[0].base64Image"  alt="Property Image" class="property-image">
            <!-- No-Image.png from assets -->
            <img v-else src="@/assets/No-Image.png" alt="Property Image" class="property-image">
          </div>
          <div class="property-details col-3">
            <h6 class="h6-name">{{ property.name }}</h6>
            <p>{{ property.location }}</p>
            <p>Price type: <b class="price-p">{{ formatPriceType(property.priceType) }}</b></p>
          </div>
          <div class="property-details col">
            <!-- <div class="align-content-center text-center">
              <div v-for="adjustment in property.priceAdjustments" :key="adjustment.price">
                <p> 
                  <b class="color-it-blue">from:&nbsp;</b>{{ formatDate(adjustment.dates[0]) }}&nbsp;&nbsp;&nbsp;
                  <b class="color-it-blue">to:&nbsp;</b>{{ formatDate(adjustment.dates[1]) }}&nbsp;&nbsp;&nbsp;
                  <b class="color-it-blue">for:&nbsp;</b><b class="color-it-green">{{ adjustment.price }}€</b>
                </p>
              </div>
            </div> -->
            <button class="btn btn-info" @click="updateProperty(property.id)">Update property</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../util/NavBar.vue";
import moment from "moment";
import AccommodationService from '@/service/AccommodationService';

export default {
  name: "MyPropertiesPage",
  components: {
    NavBar,
  },
  data() {
    return {
      properties: [
        // {
        //   id: 1,
        //   name: "Central Konaci Apartments on APrtments on Apartments",
        //   location: "Kopaonik",
        //   filters: [],
        //   minGuests: 1,
        //   maxGuests: 1,
        //   priceType: "price-per-unit",
        //   images: [
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551076950.jpg?k=0cc401ec6cfc9c27e602d358c5a36afcd524c9bbafd93a1152edbad6208c564d&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551077088.jpg?k=9de972a17f808f2f55930ca0538846e2383f3a2041934decd50fa69691453a07&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520536.jpg?k=4c3d970eed45c89579f39ca1e109dd01a31b12dbbd34f1fa417934fd919496dc&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520898.jpg?k=bfe2fe818abb30c41c7a2ec70bdfe560d251484e2e542abab0ea0a8931f170c2&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520909.jpg?k=f061149dd59c7a7a4fe9c51440f24eff26d009668f0704d9b7348482f3aef981&o=&hp=1",
        // ],
        //   priceAdjustments: [
        //     {
        //       dates: [
        //         new Date("2024-05-21T09:20:00"),
        //         new Date("2024-05-31T09:20:00")
        //       ],
        //       price: 1555
        //     }
        //   ],
        // },
        // {
        // id: 2,
        // name: "Central Konaci Apartments",
        // location: "Kopaonik",
        // filters: [],
        // minGuests: 1,
        // maxGuests: 1,
        // priceType: "price-per-unit",
        // images: [
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551077088.jpg?k=9de972a17f808f2f55930ca0538846e2383f3a2041934decd50fa69691453a07&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520536.jpg?k=4c3d970eed45c89579f39ca1e109dd01a31b12dbbd34f1fa417934fd919496dc&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520898.jpg?k=bfe2fe818abb30c41c7a2ec70bdfe560d251484e2e542abab0ea0a8931f170c2&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520539.jpg?k=9d713cd1709ee6a8aa44a94558557133f348e230e4d3f8235a210c989e301908&o=&hp=1",
        //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/554520909.jpg?k=f061149dd59c7a7a4fe9c51440f24eff26d009668f0704d9b7348482f3aef981&o=&hp=1",
        // ],
        // priceAdjustments: [
        //     {
        //       dates: [
        //         new Date("2024-06-01T09:20:00"),
        //         new Date("2024-06-10T09:20:00")
        //       ],
        //       price: 1750
        //     },
        //     {
        //       dates: [
        //         new Date("2024-06-01T09:20:00"),
        //         new Date("2024-06-10T09:20:00")
        //       ],
        //       price: 1750
        //     },
        //     {
        //       dates: [
        //         new Date("2024-06-01T09:20:00"),
        //         new Date("2024-06-10T09:20:00")
        //       ],
        //       price: 1750
        //     }
        //   ],
        // }
      ],
    };
  },
  mounted() {
    const ownerUsername = localStorage.getItem("username");
    AccommodationService.getOwnersAccommodations(ownerUsername)
      .then(response => {
        console.log(response.data);
        this.properties = response.data;
      })
      .catch(error => {
        console.error("Error fetching accommodations:", error);
      });
  },
  methods: {
    formatPriceType(priceType){
      return priceType.replace('price-','').replace('-',' ')
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    updateProperty(id) {
      console.log(`Navigating to update property with id: ${id}`);
      this.$router.push({ path: `/updateProperty/${id}` });
    }
  }
};
</script>

<style scoped>
.color-it-blue{
  color: blue;
}

.color-it-green{
  color: green;
}

.h6-name{
  font-weight: 600;
}

.price-p{
  color: lightskyblue;
  font-weight: 600;
}

.entire-div {
  min-height: 100vh;
  background-color: #343a40;
}

.properties-list {
  width: 100%;
}

.property-card {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
}

.property-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
}

.property-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn {
  margin-top: 0.5rem;
}
</style>
