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
              <form class="row">
                <div class="col-md-4 d-flex align-items-center">
                  <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trip and Book" class="img-fluid" />
                </div>
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="username" class="form-control" id="username" placeholder="Enter your username" v-model="username">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter your password" v-model="password">
                  </div>
                  <div class="pt-3">
                    <button type="button" class="btn btn-info btn-lg btn-block" @click="login">Login</button>
                    <router-link to="/main" class="btn btn-info btn-lg btn-block">Continue as guest</router-link>
                  </div>
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
import AuthService from '@/service/AuthService';
import { toast } from 'vue3-toastify';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      localStorage.clear();
      AuthService.login(this.username, this.password).then(res => {
        const token = res.data.token;
        localStorage.setItem("access_token", token);
        localStorage.setItem("username", this.username);
        this.$router.push("/main");
      }).catch(_err => {
        toast("Invalid credentials!", {
          autoClose: 1000,
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
