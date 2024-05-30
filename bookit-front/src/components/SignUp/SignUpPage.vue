<template>
  <div class="bg-dark entire-div">
    <div class="container pt-5 w-50">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card bg-secondary text-light">
            <div class="card-header text-center fw-bold header-title">
              Sign Up for BookIt
            </div>
            <div class="card-body">
              <form @submit.prevent="signup">
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-person-vcard icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="first-name" class="form-label font-weight-bold">First Name</label>
                    <input type="text" class="form-control" id="first-name" required placeholder="Enter your first name" v-model="firstName">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-person-vcard icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="last-name" class="form-label font-weight-bold">Last Name</label>
                    <input type="text" class="form-control" id="last-name" required placeholder="Enter your last name" v-model="lastName">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-envelope icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="email" class="form-label font-weight-bold">Email Address</label>
                    <input type="email" class="form-control" id="email" required placeholder="Enter your email" v-model="email">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-house icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="place-of-living" class="form-label font-weight-bold">Place of Living</label>
                    <input type="text" class="form-control" id="place-of-living" required placeholder="Enter your place of living" v-model="placeOfLiving">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-person icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="username" class="form-label font-weight-bold">Username</label>
                    <input type="text" class="form-control" id="username" required placeholder="Choose a username" v-model="username">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-braces-asterisk icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="password" class="form-label font-weight-bold">Password</label>
                    <input type="password" class="form-control" id="password" required placeholder="Enter your password" v-model="password">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-braces-asterisk icon-large"></i>
                  </div>
                  <div class="col pr-5">
                    <label for="confirm-password" class="form-label font-weight-bold">Confirm Password</label>
                    <input type="password" class="form-control" id="confirm-password" required placeholder="Repeat your password" v-model="confirmPassword">
                  </div>
                </div>
                <div class="mb-3 row align-items-center">
                  <div class="col-auto">
                    <i class="bi bi-person-fill-gear icon-large"></i>
                  </div>
                  <div class="col pr-5 d-flex flex-column">
                    <label for="role" class="form-label font-weight-bold">Role</label>
                    <select class="form-select" id="role" v-model="role">
                      <option selected>Guest</option>
                      <option>Host</option>
                    </select>
                  </div>
                </div>
                <div class="d-grid pt-4">
                  <button type="submit" class="btn btn-info btn-lg btn-block">Sign Up</button>
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
import UserService from '@/service/UserService'
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
      confirmPassword: '',
      role: 'Guest'
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
      let payload = {
        "username": this.username,
        "password": this.password,
        "email": this.email,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "city": this.placeOfLiving,
        "role": this.role.toUpperCase()
      };
      localStorage.clear();
      localStorage.setItem("email", this.email);
      UserService.register(payload).then(_res => {
        this.$router.push('/signup/confirm');
      }).catch(err => {
        toast(err.response.data, {
          autoClose: 1000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
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
.icon-large {
  font-size: 2rem;
}
select {
  height: 2.5rem;
}
</style>
