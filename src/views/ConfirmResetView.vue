<template>
  <section class="vh-100 d-flex flex-column">
    <div class="mx-auto w-75">


      <form @submit.prevent="confirmReset" class="w-100">

        <p class="text-center fs-4 mb-0">Подтверждение сброса пароля</p>

        <hr class="mb-4 mt-0">

        <p v-if="errors" class="text-white  text-start p-2 bg-danger rounded-2 mb-4">{{ errors }}</p>

        <div class="mb-4">
          <input type="password" class="form-control" placeholder="Пароль" v-model="password1">     
        </div>

        <div class="mb-4">
          <input type="password" class="form-control" placeholder="Повторите пароль" v-model="password2">     
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4 w-100">Продолжить</button>
        
      </form>

    </div>
  </section>
</template>

<script>
import axios from "axios";

export default({
  data() {
    return {
      password1: "",    
      password2: "",    
      errors: null
    };
  },
  methods: {
    confirmReset() {
      console.log('bbb')
      if (this.password1 !== this.password2) {
        this.errors = "Пароли не совпадают";
        return;
      }
      axios.post(`auth/reset_password/${this.$route.params.token}`, {password: this.password1})
        .then(() => {
          this.$router.push({name: "Login"});
        })
        .catch((error) =>{
          console.log(error);
          this.errors = (error.response.data.detail[0].msg !== undefined) ? error.response.data.detail[0].msg : error.response.data.detail;
        });
    }
  }
})
</script>
