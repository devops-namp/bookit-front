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
              Change your password
            </div>
            <div class="card-body">
              <form @submit.prevent="updateAccount">
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
import AuthService from '@/service/AuthService';

export default {
  name: 'ProfilePage',
  components: {
    NavBar,
  },
  data() {
    return {
      confirmPassword: '',
      currentPassword:'',
      newPassword:''
    }
  },

  methods: {
    checkPasswords() {
      return this.newPassword === this.confirmPassword;
    },
    updateAccount() {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!this.checkPasswords()) {
        toast("Confirmed password does not match!", {
          autoClose: 2000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else if (!regex.test(this.newPassword)) {
        toast("Password must be at least 6 characters long, contain at least one letter and one number", {
          autoClose: 3000,
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else {
        let payload = {
          "username": localStorage.getItem("username"),
          "currentPassword": this.currentPassword,
          "newPassword": this.newPassword
        }

        AuthService.changePassword(payload).then(_res => {
          toast("Password successfully updated!", {
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
    