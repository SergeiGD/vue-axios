import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => {
    if (localStorage.getItem("access_token") !== null) {
      // если в localStorage есть токен, то получаем данные из него
      return {
        user_id: jwt_decode(localStorage.getItem("access_token")).id,
      }
    }
    // иначе просто вернем null
    return { user_id: null }
  },
  actions: {
    async logIn(user) {
      // запрос для получения токенов и изменения состояния хранилища
      try {
        // кидаем запрос
        const response = await axios.post("auth/login", user);
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        // устанавливаем user_id
        this.user_id = jwt_decode(access_token).id;
        // сохраняем токены в локал сторедж
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return null;
      } catch (error) {
        // если произошла ошибка, то возвращаем ее
        return error.response.data.detail[0].msg !== undefined
          ? error.response.data.detail[0].msg
          : error.response.data.detail;
      }
    },

    logOut() {
      this.user_id = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  getters: {
    isAuthenticated: (state) => {
      // если установлен user_id, то вернет true
      return !!state.user_id;
    },
  },
});
