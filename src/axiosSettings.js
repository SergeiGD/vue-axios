import axios from "axios";
import { useUserStore } from '@/stores/user';
import router from "./router";

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
    .catch(() => {
      // если ошибка, то вызываем logout и отправляем на страницу авторизации 
      const store = useUserStore()
      store.logOut();
      router.push({name: 'Login'});
      return Promise.reject();
    });

  } else{
      // если нету токена обновления, то кидаем на страницу авторизации
      router.push({name: "Login"})
      return Promise.reject();
  }

}

// авто обновление jwt токенов
axios.interceptors.response.use(null, (error) => {
  // выполняем только когда код 401 и запрос не на эндпоинт обновления аутентификации
  if (error.response.status == 401 && !(/^auth(\w*)/.test(error.config.url))) {
    // пытаемся обновить токены
    return updateToken().then((token) => {
      // при успехе переотпраялем запрос, который не удалось отправить из-за отсутсвия активного токена доступа
      error.config.headers['Authorization'] = `Bearer ${token}`;
      error.config.baseURL = undefined;
      return axios.request(error.config);
    }).catch(() => {
      return Promise.reject(error)
    });
  }

  // иначе просто отколняем промис
  return Promise.reject(error);
});
