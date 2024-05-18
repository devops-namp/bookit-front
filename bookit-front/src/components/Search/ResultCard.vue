<template>
  <div class="card mb-4">
    <div class="image-container">
      <img :src="image" class="card-img-top" alt="Apartment image">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text mb-0"><strong>Location:</strong> {{ location }}</p>
      <p class="card-text mb-0"><strong>Features:</strong></p>
      <ul class="list-unstyled mb-1">
        <li v-for="(value, key) in filters" :key="key">
          <i class="bi bi-check-circle checkmark" v-if="value"/>
          <i class="bi bi-x-circle x-circle" v-else></i>
          {{ filterFormat(key) }}
        </li>
      </ul>
      <p class="card-text mb-0"><strong>Guests:</strong> {{ minGuests }} - {{ maxGuests }}</p>
      <label class="card-text"><strong>Price:</strong> {{ price }}€</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultCard',
  props: {
    image: String,
    name: String,
    location: String,
    filters: Object,
    minGuests: Number,
    maxGuests: Number,
    price: Number
  },
  methods: {
    filterFormat(filter) {
      return filter
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/^[a-z]/, match => match.toUpperCase())
        .trim();
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 18rem;
}
.checkmark {
  color: green;
}
.x-circle {
  color: red;
}
.image-container {
  width: 100%;
  height: 13rem;
  background-color: slategrey;
  align-content: center;
  overflow: hidden;
}
.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
