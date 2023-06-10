<template>
  <div class="container-xl d-flex flex-column gap-5 ">
    <nav class="d-flex gap-3 justify-content-center p-3 fw-bold">
      <router-link 
        :to="{ name: 'Home' }"
        :class="[this.$route.fullPath === '/' ? 'text-warning' : 'text-secondary']"
      >Home</router-link>

      <router-link 
        :to="{ name: 'Tags' }" 
        :class="[/^\/tags(\w*)/.test(this.$route.fullPath) ? 'text-warning' : 'text-secondary']"
      >Tags</router-link>

      <router-link 
        v-if="!userStore.isAuthenticated" 
        :to="{ name: 'Login' }"
        :class="[ /^\/auth(\w*)/.test(this.$route.fullPath) ? 'text-warning' : 'text-secondary']"
      >Login</router-link>

      <a v-if="userStore.isAuthenticated" href="#" @click="logout">Logout</a>
      
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from '@/stores/user'

export default({
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    logout() {
      this.userStore.logOut();
      this.$router.push({name: "Tags"});
    }
  }
})
</script>
