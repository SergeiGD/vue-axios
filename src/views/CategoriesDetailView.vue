<template>
  <NotFound v-if="notFound"></NotFound>
  <div
    class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative"
    v-if="category"
  >
    <i
      class="fa-regular fa-square-minus text-danger card_icon card_icon__delete"
      data-bs-toggle="modal"
      data-bs-target="#delete_modal"
    ></i>
    <router-link
      :to="{ name: 'CategoriesUpdate', params: { id: category.id } }"
      class="fa-regular fa-pen-to-square card_icon card_icon__edit"
    ></router-link>

    <div class="text-center">
      <span class="fw-bold fs-5">id: </span>
      <span class="fw-bold fs-5">{{ category.id }}</span>
    </div>

    <div class="row">
      <div class="col-12 row">
        <p
          v-if="errors"
          class="text-white text-start p-2 bg-danger rounded-2 w-100"
        >
          {{ errors }}
        </p>

        <div class="col-md-6 col-12 row">
          <p class="fw-bold col-5">Наименование:</p>
          <p class="opacity-75 col-7">{{ category.name }}</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-md-0 mt-2 row">
          <p class="fw-bold col-5">Спальных мест:</p>
          <p class="opacity-75 col-7">{{ category.beds }}</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-2 row">
          <p class="fw-bold col-5">Цена:</p>
          <p class="opacity-75 col-7">{{ category.price }}&#8381;</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-2 row">
          <p class="fw-bold col-5">Комнат:</p>
          <p class="opacity-75 col-7">{{ category.rooms_count }}</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-2 row">
          <p class="fw-bold col-5">Площадь (м&#178;):</p>
          <p class="opacity-75 col-7">{{ category.square }}</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-2 row">
          <p class="fw-bold col-5">Этажей:</p>
          <p class="opacity-75 col-7">{{ category.floors }}</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-2 row">
          <p class="fw-bold col-5">Предоплата:</p>
          <p class="opacity-75 col-7">{{ category.prepayment_percent }}%</p>
          <hr />
        </div>

        <div class="col-md-6 col-12 mt-2 row">
          <p class="fw-bold col-5">Возврат:</p>
          <p class="opacity-75 col-7">{{ category.refund_percent }}%</p>
          <hr />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-12">
          <div class="col-12">
            <p class="fw-bold col-5">Описание:</p>
            <p id="manage_info" class="opacity-75" style="white-space: pre-line">
              {{ category.description }}
            </p>
            <hr />
          </div>
        </div>

        <div class="col-lg-6 col-12 mt-lg-0 mt-4">
          <span class="input-group-text rounded-top roumain_photo_pathnded-0"
            >Главное фото:</span
          >
          <div class="img_wrapper">
            <img
              :src="main_photo_path"
              alt="Главное фото"
              class="img-fluid w-100 img"
            />
            <button
              class="btn open_img btn-dark"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#show_img_modal"
            >
              <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DeletePopup :deleteItem="deleteCategory" />
  <ImagePopup :image_scr="main_photo_path" />
</template>

<script>
import axios from "axios";
import DeletePopup from "@/components/DeletePopup.vue";
import NotFound from "@/components/NotFound.vue";
import ImagePopup from "@/components/ImagePopup.vue";

export default {
  components: {
    DeletePopup,
    NotFound,
    ImagePopup,
  },
  data() {
    return {
      category: null,
      main_photo_path: null,
      notFound: false,
      errors: null,
    };
  },
  mounted() {
    axios
      .get(`categories/${this.$route.params.id}`)
      .then((response) => {
        this.category = response.data;
        // генерируем путь до файла
        this.main_photo_path =
          axios.defaults.imagesURL + response.data.main_photo_path;
      })
      .catch((error) => {
        if (error.response.status === 404) this.notFound = true;
      });
  },
  methods: {
    deleteCategory() {
      axios
        .delete(`categories/${this.$route.params.id}`)
        .then(() => {
          this.$router.push({ name: "Categories" });
        })
        .catch((error) => {
          console.log(error);
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? error.response.data.detail[0].msg
              : error.response.data.detail;
        });
    },
  },
};
</script>
