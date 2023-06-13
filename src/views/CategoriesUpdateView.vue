<template>
  <NotFound v-if="notFound"></NotFound>

  <Breadcrumbs
    :breadcrumbs="[
      { view: 'Categories', name: 'Categories' },
      {
        view: 'CategoriesDetail',
        name: 'Detail',
        params: { id: $route.params.id },
      },
      {
        view: 'CategoriesUpdate',
        name: 'Update',
        params: { id: $route.params.id },
      },
    ]"
  />

  <p v-if="errors" class="text-white text-start p-2 h-100 bg-danger rounded-2">
    {{ errors }}
  </p>
  <form
    class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative"
    @submit.prevent="updateCategory"
  >
    <CategoriesInputs
      :category="category"
      :redirectTo="redirectToCategoriesDetail"
      @fileUploaded="fileUploaded"
    />
  </form>
</template>

<script>
import axios from "axios";
import CategoriesInputs from "@/components/CategoriesInputs.vue";
import NotFound from "@/components/NotFound.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    CategoriesInputs,
    NotFound,
    Breadcrumbs,
  },
  data() {
    return {
      errors: null,
      category: null,
      photo: null,
      notFound: false,
    };
  },
  methods: {
    updateCategory() {
      // создание категории идет с помощью FormData
      const category_data = new FormData();
      // проходим по свойствам объекта и создаем из них свойства FormData
      for (var prop in this.category) {
        category_data.append(prop, this.category[prop]);
      }
      if (this.photo !== null) category_data.append("photo", this.photo);

      axios({
        method: "PATCH",
        url: `categories/${this.$route.params.id}`,
        data: category_data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then(() => {
          this.redirectToCategoriesDetail();
        })
        .catch((error) => {
          console.log(error);
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? `${error.response.data.detail[0].loc[1]}: ${error.response.data.detail[0].msg}`
              : error.response.data.detail;
        });
    },
    redirectToCategoriesDetail() {
      this.$router.push({
        name: "CategoriesDetail",
        params: { id: this.category.id },
      });
    },
    fileUploaded(e) {
      this.photo = e.target.files[0];
    },
  },
  beforeMount() {
    axios
      .get(`categories/${this.$route.params.id}`)
      .then((response) => (this.category = response.data))
      .catch((error) => {
        if (error.response.status === 404) this.notFound = true;
      });
  },
};
</script>
