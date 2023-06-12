<template>
  <div class="shadow mt-4 rounded-2 overflow-auto p-3">

    <p v-if="errors" class="text-white text-start p-2 h-100 bg-danger rounded-bottom rounded-0 mb-3">
      {{ errors }}
    </p>

    <div class="text-center mb-4">
      <span class="fw-bold fs-5">Изменение доп. фотографий категории</span>
    </div>

    <router-link :to="{ name: 'PhotosAdd' }" class="btn btn-c_grey-100 w-100 py-2 fw-bold mb-4 rounded">Добавить</router-link>

    <div class="row">
      <div class="col-lg-4 col-sm-6 col-12 mb-4" v-for="photo in photos" :key="photo.id">
        <div class="w-100 d-flex flex-column justify-content-center">
          <span class="input-group-text rounded-top rounded-0">Фото {{ photo.order }}:</span>
          <div class="img_wrapper">

              <img :src="imagesURL + photo.path" :alt="`Фото ${ photo.order }`" class="img-fluid w-100 img"/>

              <button
                class="btn open_img btn-dark"
                type="button"
                data-bs-toggle="modal"
                :data-bs-target="`#additionalPhoto${photo.id}`"
              >
                <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
              </button>

              <ImagePopup :image_scr="imagesURL + photo.path" :imagePopupId="`additionalPhoto${photo.id}`"/>

          </div>

          <div class="row w-100 mx-auto rounded-bottom rounded-0"> 
            <router-link :to="{ name: 'PhotosUpdate', params: { photoId: photo.id } }" class="col-6 btn btn-primary rounded-0 py-2 fw-bold ">Изменить</router-link>
            <button class="col-6 btn btn-danger rounded-0 fw-bold" @click="removePhoto(photo)">Удалить</button>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import ImagePopup from "@/components/ImagePopup.vue";

export default {
  components: {
    ImagePopup
  },
  data() {
    return {
      photos: [],
      imagesURL: axios.defaults.imagesURL,
      errors: null
    };
  },
  beforeMount() {
    axios
      .get(`categories/${this.$route.params.id}/photos`)
      .then((response) => {
        this.photos = response.data;
        // отсоритурем элементы по порядоковому номеру
        this.photos.sort((a, b) => a.order - b.order);
      })
  },
  methods: {
    removePhoto(photo) {
      axios
        .delete(`photos/${photo.id}`)
        .then(() => {
          this.$router.push({ name: "CategoriesDetail", params: { id: this.$route.params.id } });
        })
        .catch((error) => {
          console.log(error);
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? error.response.data.detail[0].msg
              : error.response.data.detail;
        });
    }
  }
};
</script>
