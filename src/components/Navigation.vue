<template>
  <div class="container-xl d-flex flex-column gap-5">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'Tags' }">Tags</router-link>
      <router-link v-if="!userStore.isAuthenticated" :to="{ name: 'Login' }">Login</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<script>
import { mapStores } from "pinia";
import { useUserStore } from '@/stores/user'

export default({
  // data() {
  //   return {
  //     user: {
  //       email: "",
  //       password: "",
  //     },    
  //     errors: null
  //   };
  // },
  computed: {
    ...mapStores(useUserStore)
  },
  // methods: {
  //   async login() {
  //     this.errors = await this.userStore.logIn(this.user);
  //     if (this.errors === null) this.$router.push({name: "Tags"});
  //   }
  // }
})
</script>
