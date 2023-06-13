<template>
  <NotFound v-if="notFound"></NotFound>

  <Breadcrumbs
    :breadcrumbs="[
      { view: 'Tags', name: 'Tags' },
      { view: 'TagsDetail', name: 'Detail', params: { id: $route.params.id } },
    ]"
  />

  <div
    class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative"
    v-if="tag"
  >
    <i
      class="fa-regular fa-square-minus text-danger card_icon card_icon__delete"
      data-bs-toggle="modal"
      data-bs-target="#delete_modal"
    ></i>
    <router-link
      :to="{ name: 'TagsUpdate', params: { id: tag.id } }"
      class="fa-regular fa-pen-to-square card_icon card_icon__edit"
    ></router-link>

    <div class="text-center">
      <span class="fw-bold fs-5">id: </span>
      <span class="fw-bold fs-5">{{ tag.id }}</span>
    </div>

    <div class="row">
      <div class="col-12 row">
        <p
          v-if="errors"
          class="text-white text-start p-2 bg-danger rounded-2 w-100"
        >
          {{ errors }}
        </p>

        <p class="fw-bold col-lg-2 col-5">Наименование:</p>
        <p class="opacity-75 col-lg-10 col-7 text-start">{{ tag.name }}</p>
        <hr />
      </div>
    </div>
  </div>

  <DeletePopup :deleteItem="deleteTag" />
</template>

<script>
import axios from "axios";
import DeletePopup from "@/components/DeletePopup.vue";
import NotFound from "@/components/NotFound.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    DeletePopup,
    NotFound,
    Breadcrumbs,
  },
  data() {
    return {
      tag: null,
      notFound: false,
      errors: null,
    };
  },
  mounted() {
    axios
      .get(`tags/${this.$route.params.id}`)
      .then((response) => (this.tag = response.data))
      .catch((error) => {
        if (error.response.status === 404) this.notFound = true;
      });
  },
  methods: {
    deleteTag() {
      axios
        .delete(`tags/${this.$route.params.id}`)
        .then(() => {
          this.$router.push({ name: "Tags" });
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
