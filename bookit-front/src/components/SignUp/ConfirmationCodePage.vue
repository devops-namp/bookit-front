<template>
  <div class="bg-dark entire-div">
    <div class="container pt-5 w-50">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card bg-secondary text-light">
            <div class="card-header text-center fw-bold header-title">
              Sign Up confirmation
            </div>
            <div class="card-body px-4">
              <form @submit.prevent="confirm">
                <div class="d-grid pt-1">
                  <label for="code" class="form-label font-weight-bold">Code</label>
                  <input type="text" class="form-control" id="code" required placeholder="Enter the code we've sent you" v-model="code">
                </div>
                <div class="d-grid pt-4">
                  <button type="submit" class="btn btn-info btn-lg btn-block">Confirm</button>
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
import UserService from '@/service/UserService'
import { toast } from 'vue3-toastify';

export default {
  name: 'ConfirmationCodePage',
  data() {
    return {
      code: ''
    }
  },
  methods: {
    confirm() {
      let payload = {"code": this.code, "email": localStorage.getItem("email")};
      UserService.confirmRegistration(payload).then(_res => {
        this.$router.push("/");
      }).catch(_err => {
        toast("Invalid code!", {
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
