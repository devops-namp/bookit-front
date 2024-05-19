<template>
<div class="bg-dark entire-div">
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <div class="card bg-secondary text-light">
          <div class="card-header text-center fw-bold header-title">
            Sign Up for BookIt
          </div>
          <div class="card-body">
            <form @submit.prevent="signup">
              <div class="mb-3">
                <label for="first-name" class="form-label">First Name</label>
                <input type="text" class="form-control" id="first-name" required placeholder="Enter your first name" v-model="firstName">
              </div>
              <div class="mb-3">
                <label for="last-name" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="last-name" required placeholder="Enter your last name" v-model="lastName">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" required placeholder="Enter your email" v-model="email">
              </div>
              <div class="mb-3">
                <label for="place-of-living" class="form-label">Place of Living</label>
                <input type="text" class="form-control" id="place-of-living" required placeholder="Enter your place of living" v-model="placeOfLiving">
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" required placeholder="Choose a username" v-model="username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required placeholder="Enter your password" v-model="password">
              </div>
              <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm-password" required placeholder="Repeat your password" v-model="confirmPassword">
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-info btn-lg">Sign Up</button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <span class="me-1">Already have an account? </span>
            <router-link to="/" class="fw-bolder text-info">Login here</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { toast } from 'vue3-toastify';

export default {
  name: 'SignUpPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      placeOfLiving: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    checkPasswords() {
      return this.password === this.confirmPassword;
    },
    signup() {
      if (!this.checkPasswords()) {
        toast("Passwords do not match!", {
                        autoClose: 2000,
                        type: 'error',
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
        return;
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
  background: #f6f8fa;
}
.btn-info {
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
