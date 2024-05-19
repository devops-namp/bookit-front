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
              <div class="mb-3">
                <label for="password" class="form-label">Current Password</label>
                <input type="password" class="form-control" id="password" required placeholder="Enter your password" v-model="currentPassword">
              </div>
              <div class="mb-3">
                <label for="new-password" class="form-label">New Password</label>
                <input type="password" class="form-control" id="new-password" placeholder="Repeat your password" v-model="newPassword">
              </div>
              <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm-password" placeholder="Repeat your password" v-model="confirmPassword">
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

export default {
  name: 'ProfilePage',
  components: {
    NavBar,
  },
  data() {
    return {
      user:{
        firstName: 'Aleksa',
        lastName: 'Simic',
        email: 'askela007aleksa@gmail.com',
        placeOfLiving: 'Šabac',
        username: 'askelaUSer',
        password: 'userSifra',
      },
      confirmPassword: '',
      currentPassword:'',
      newPassword:''
    }
  },
  methods: {
    deleteAccount(){
      if(this.user.password !== this.currentPassword){
          toast("Incorect passowrd!", {
                                  autoClose: 2000,
                                  type: 'error',
                                  position: toast.POSITION.BOTTOM_RIGHT
                              });
                  return;
      }
    },
    checkPasswords() {
      return this.user.password === this.currentPassword && this.newPassword === this.confirmPassword;
    },
    updateAccount() {
      if (!this.checkPasswords()) {
        toast("Passwords do not match!", {
                        autoClose: 2000,
                        type: 'error',
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
        return;
      }
      else{
        toast("Accont updated!", {
                        autoClose: 2000,
                        type: 'success',
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
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
