import { defineStore } from 'pinia'
import axios from "axios";
import jwt_decode from "jwt-decode";

export const useUserStore = defineStore('user', {
  state: () => {
    return { user_id: null }
  },
  actions: {
    async logIn(user) {
      // axios.post('auth/login', user)
      //   .then((response) => {
      //     const access_token = response.data.access_token;
      //     this.user_id = jwt_decode(access_token).id;
      //     return true;
      //   })
      //   .catch((error) =>{
      //     if (error.response.status === 401 || error.response.status === 403) {
      //       return false;
      //     }
      //   });
      try {
        const response = await axios.post('auth/login', user);
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        this.user_id = jwt_decode(access_token).id;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return null;
      } catch(error) {
        return (error.response.data.detail[0].msg !== undefined) ? error.response.data.detail[0].msg : error.response.data.detail;
      }

      // const access_token = response.data.access_token;
      // this.user_id = jwt_decode(access_token).id;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user_id,
  }
})
