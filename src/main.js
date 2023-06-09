import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import "./assets/styles/style.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.1.57:8000/'; 

// установка Bearer заголовка
axios.interceptors.request.use(function (config) {
  if (localStorage.getItem("access_token") !== null){
    // если в локал сторедж есть access_token, то добавляем его к запросу
    const access_token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});


function updateToken(){
  if (localStorage.getItem("refresh_token") !== null){
    // если есть токен обновления, то пытаемся обновить токены
    return axios.post("auth/refresh_user_token/", {
      token: localStorage.getItem("refresh_token")
    })
    .then((response) => {
      // ксли успешно, обновляем ключи в локал сторедж
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return Promise.resolve(response.data.access_token);
    })
    .catch((error) => {
      // если ошибка, то отчищаем токены
      localStorage.setItem("access_token", null);
      localStorage.setItem("refresh_token", null);
      // кидаем на страницу авторизации 
      router.push({path: "/login"})
      return Promise.reject(error);
    });

  } else{
      // если нету токена обновления, то кидаем на страницу авторизации
      router.push({path: "/login"})
      return Promise.reject(error);
  }

}

// авто обновление jwt токенов
axios.interceptors.response.use(null, (error) => {
  // выполняем только когда код 401 и запрос не на эндпоинт обновления токенов (но тоже при ошибке возвращает 401 и будет бесконечная рекурсия)
  if (error.response.status == 401 && error.config.url !== "auth/refresh_user_token/") {
    // пытаемся обновить токены
    return updateToken().then((token) => {
      // при успехе переотпраялем запрос, который не удалось отправить из-за отсутсвия активного токена доступа
      error.config.headers['Authorization'] = `Bearer ${token}`;
      error.config.baseURL = undefined;
      return axios.request(error.config);
    });
  }

  // иначе просто отколняем промис
  return Promise.reject(error);
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
