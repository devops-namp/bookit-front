<template>
<div class="bg-dark entire-div">
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <div class="card bg-secondary text-light">
          <div class="card-header text-center fw-bold header-title">
            Welcome to BookIt
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Enter your password" v-model="password">
              </div>
              <div class="d-grid">
                <button type="button" class="btn btn-primary btn-lg" @click="login">Login</button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <span class="me-1">Don't have an account? </span>
            <router-link to="/signup" class="fw-bolder text-info">Sign up here</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
  background: #f6f8fa;
}
.btn-primary {
  background-color: #1f883d;
  color: white;
}
.header-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.entire-div {
  min-height: 100vh;
}
</style>
