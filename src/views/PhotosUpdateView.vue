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
        view: 'PhotosUpdate',
        name: 'Edit photo',
        params: { id: $route.params.id, photoId: $route.params.photoId },
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
      <div class="col-6">
        <div class="input-group">
          <input
            id="category-main-photo"
            type="file"
            class="form-control rounded-bottom rounded-0"
            v-on:change="fileUploaded"
          />
        </div>
      </div>

      <div class="col-6">
        <div class="input-group">
          <label for="photo-order" class="input-group-text w-10r"
            >Порядковый номер</label
          >
          <input
            id="photo-order"
            type="number"
            class="form-control"
            v-model="order"
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
      photo_file: null,
      order: null,
      errors: null,
    };
  },
  methods: {
    savePhoto() {
      const photoData = new FormData();
      if (this.photo_file !== null)
        photoData.append("photo_file", this.photo_file);
      photoData.append("order", this.order);

      axios({
        method: "PATCH",
        url: `photos/${this.$route.params.photoId}`,
        data: photoData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
      this.photo_file = e.target.files[0];
    },
    redirectToPhotosUpdate() {
      this.$router.push({
        name: "CategoriesPhotosUpdate",
        params: { id: this.$route.params.id },
      });
    },
  },
  beforeMount() {
    axios
      .get(`photos/${this.$route.params.photoId}`)
      .then((response) => {
        if (response.data.category_id != this.$route.params.id) {
          this.notFound = true;
        } else {
          this.order = response.data.order;
        }
      })
      .catch((error) => {
        if (error.response.status === 404) this.notFound = true;
      });
  },
};
</script>
