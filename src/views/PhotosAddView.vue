<template>
  <Breadcrumbs
    :breadcrumbs="[
      { view: 'Categories', name: 'Categories' },
      {
        view: 'CategoriesDetail',
        name: 'Detail',
        params: { id: $route.params.id },
      },
      {
        view: 'CategoriesPhotosUpdate',
        name: 'Update photos',
        params: { id: $route.params.id },
      },
      {
        view: 'PhotosAdd',
        name: 'Add photo',
        params: { id: $route.params.id },
      },
    ]"
  />

  <div class="shadow rounded-2 overflow-auto p-3">
    <p
      v-if="errors"
      class="text-white text-start p-2 h-100 bg-danger rounded-bottom rounded-0 mb-3"
    >
      {{ errors }}
    </p>

    <div class="text-center mb-4">
      <span class="fw-bold fs-5">Добавление доп. фотографии к категории</span>
    </div>

    <form class="row" @submit.prevent="savePhoto">
      <div class="col-12">
        <div class="input-group">
          <input
            id="category-main-photo"
            type="file"
            class="form-control rounded-bottom rounded-0"
            v-on:change="fileUploaded"
          />
        </div>
      </div>

      <div class="col-12 mt-4">
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-lg btn-c_yellow-700">
            Сохранить
          </button>
          <button
            type="button"
            class="btn btn-lg btn-c_grey-100"
            @click="redirectToPhotosUpdate"
          >
            Отмена
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      photo: null,
      errors: null,
    };
  },
  methods: {
    savePhoto() {
      const photoData = new FormData();
      photoData.append("photo_file", this.photo);
      photoData.append("category_id", this.$route.params.id);

      axios({
        method: "post",
        url: "photos/",
        data: photoData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          this.redirectToPhotosUpdate();
        })
        .catch((error) => {
          console.log(error);
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? `${error.response.data.detail[0].loc[1]}: ${error.response.data.detail[0].msg}`
              : error.response.data.detail;
        });
    },
    fileUploaded(e) {
      this.photo = e.target.files[0];
    },
    redirectToPhotosUpdate() {
      this.$router.push({
        name: "CategoriesPhotosUpdate",
        params: { id: this.$route.params.id },
      });
    },
  },
};
</script>
