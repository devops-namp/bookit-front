<template>
  <div class="star-rating d-flex">
    <span v-for="star in stars" :key="star" class="star" @click="setRating(star)">
      <i :class="['bi', star <= rating ? 'bi-star-fill' : 'bi-star']"></i>
    </span>
    <button class="reset-rating" @click="resetRating">
      <i class="bi bi-x-circle"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  computed: {
    rating: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    setRating(value) {
      this.rating = value;
    },
    resetRating() {
      this.rating = 0;
    },
  },
  data() {
    return {
      stars: [1, 2, 3, 4, 5],
    };
  },
};
</script>

<style scoped>
.star {
  cursor: pointer;
  color: #ffc107;
}
.star i {
  font-size: 1.5rem;
}
.reset-rating {
  cursor: pointer;
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.5rem;
}
.reset-rating i {
  font-size: 1.5rem;
}
</style>
