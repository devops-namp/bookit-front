<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
        <a class="navbar-brand" href="#">BookIt.com</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li v-if="user" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Aleksa Simic
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#"><i class="bi bi-person-fill"/>&nbsp;Manage account</a>
                        <a class="dropdown-item" href="#"><font-awesome-icon icon="fa-solid fa-suitcase"/>&nbsp;Booking and trips</a>
                        <a class="dropdown-item" href="#"><i class="bi bi-person-hearts"/>&nbsp;Reviews</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#"><i class="bi bi-box-arrow-left"/>&nbsp;Sign out</a>
                    </div>
                </li>
            </ul>
            <a class="text-light text-decoration-none p-2" href="#">List your property</a>
            <a v-if="!user" class="text-light text-decoration-none bg-info p-2" href="#">Register</a>
            <a v-if="!user" class="text-light text-decoration-none bg-info p-2" href="#">Sign in</a>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed:{
  },
  mounted() {
  },
  data() {
    return {
        user: 'nesto'
    };
  },
  methods: {
  },
  }
</script>

<style scoped>

</style>
