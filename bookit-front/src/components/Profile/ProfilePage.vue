<template>
<div class="bg-dark entire-div">
  <div class="container">
      <nav-bar />
  </div>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <div class="card bg-secondary text-light">
          <div class="card-header text-center fw-bold header-title">
            Manage account
          </div>
          <div class="card-body">
            <form @submit.prevent="updateAccount">
              <div class="mb-3">
                <label for="first-name" class="form-label">First Name</label>
                <input type="text" class="form-control" id="first-name" required placeholder="Enter your first name" v-model="user.firstName">
              </div>
              <div class="mb-3">
                <label for="last-name" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="last-name" required placeholder="Enter your last name" v-model="user.lastName">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" required placeholder="Enter your email" v-model="user.email">
              </div>
              <div class="mb-3">
                <label for="place-of-living" class="form-label">Place of Living</label>
                <input type="text" class="form-control" id="place-of-living" required placeholder="Enter your place of living" v-model="user.placeOfLiving">
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" required placeholder="Choose a username" v-model="user.username">
              </div>
              <div class="d-grid d-flex">
                <button type="submit" class="btn btn-info btn-lg">Update</button>
                <button type="button" @click="deleteAccount" class="btn btn-danger btn-lg ml-auto">Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { toast } from 'vue3-toastify';
import NavBar from "../util/NavBar.vue";
import UserService from '@/service/UserService';

export default {
  name: 'ProfilePage',
  components: {
    NavBar,
  },
  data() {
    return {
      user:{
        firstName: '',
        lastName: '',
        email: '',
        placeOfLiving: '',
        username: ''
      }
    }
  },

  mounted() {
    UserService.getUser(localStorage.getItem("username")).then(res => {
      this.user.firstName = res.data.firstName;
      this.user.lastName = res.data.lastName;
      this.user.email = res.data.email;
      this.user.placeOfLiving = res.data.city;
      this.user.username = res.data.username;
    })
  },

  methods: {
    deleteAccount() {},
    checkPasswords() {
      return this.newPassword === this.confirmPassword;
    },
    updateAccount() {
      let updateProfilePayload = {
        "username": this.user.username,
        "email": this.user.email,
        "firstName": this.user.firstName,
        "lastName": this.user.lastName,
        "city": this.user.placeOfLiving
      };

      UserService.updateProfile(localStorage.getItem("username"), updateProfilePayload).then(res => {
        if (res.data.token !== null && res.data.token !== "") {
          localStorage.setItem("access_token", res.data.token);
        }
        localStorage.setItem("username", this.user.username);
        localStorage.setItem("email", this.user.email);
        toast("Account updated!", {
          autoClose: 2000,
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }).catch(err => {
        toast(err.response.data, {
          autoClose: 2000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
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
