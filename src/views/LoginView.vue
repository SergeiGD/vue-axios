<template>
  <section class="vh-100 d-flex flex-column">
    <div class="mx-auto w-75">


      <form @submit.prevent="login" class="w-100">

        <p class="text-center fs-4 mb-0">Авторизация</p>

        <hr class="mb-4 mt-0">

        <p v-if="errors" class="text-white  text-start p-2 bg-danger rounded-2 mb-4">{{ errors }}</p>

        <div class="mb-4">
          <input type="email" class="form-control" placeholder="Эл. почта" v-model="user.email">       
        </div>

        <div class="mb-4">
          <input type="password" class="form-control" placeholder="Пароль" v-model="user.password">     
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4 w-100">Войти</button>

        <RouterLink :to="{ name: 'RequestReset' }" class="text-center d-block">Забыли пароль?</RouterLink>
        
      </form>

    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from '@/stores/user'

export default({
  data() {
    return {
      user: {
        email: "",
        password: "",
      },    
      errors: null
    };
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    async login() {
      this.errors = await this.userStore.logIn(this.user);
      if (this.errors === null) this.$router.push({name: "Tags"});
    }
  }
})
</script>
