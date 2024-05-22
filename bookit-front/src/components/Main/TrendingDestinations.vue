<template>
  <div class="mt-4">
    <h2 class="text-light mb-3">Trending destinations</h2>
    <div class="row">
      <div class="col">
        <a :href="generateSearchUrl('Niš')">
          <img src="../../assets/Nis.jpg" alt="Destination 1" class="img-thumbnail img-top-row">
        </a>
      </div>
      <div class="col">
        <a :href="generateSearchUrl('Kopaonik')">
          <img src="../../assets/Kopaonik.jpg" alt="Destination 2" class="img-thumbnail img-top-row">
        </a>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <a :href="generateSearchUrl('Belgrade')">
          <img src="../../assets/Belgrade.jpg" alt="Destination 3" class="img-thumbnail img-bottom-row">
        </a>
      </div>
      <div class="col">
        <a :href="generateSearchUrl('Novi Sad')">
          <img src="../../assets/NoviSad.jpeg" alt="Destination 4" class="img-thumbnail img-bottom-row">
        </a>
      </div>
      <div class="col">
        <a :href="generateSearchUrl('Zlatibor')">
          <img src="../../assets/Zlatibor.jpg" alt="Destination 5" class="img-thumbnail img-bottom-row">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendingDestinations',
  data() {
    return {
      user: ''
    };
  },
  methods: {
    generateSearchUrl(location) {
      return `/search?selectedLocation=${encodeURIComponent(location)}`;
    }
  },
};
</script>

<style scoped>
.img-top-row {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.img-bottom-row {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
