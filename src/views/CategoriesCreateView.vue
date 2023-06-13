<template>

  <Breadcrumbs 
    :breadcrumbs="[ 
      { view: 'Categories', name: 'Categories' }, 
      { view: 'CategoriesCreate', name: 'Create' } 
    ]" 
  />

  <p v-if="errors" class="text-white text-start p-2 h-100 bg-danger rounded-2">
    {{ errors }}
  </p>
  <form
    class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative"
    @submit.prevent="createCategory"
  >
    <CategoriesInputs 
      :category="category" 
      :redirectTo="redirectToCategories" 
      @fileUploaded="fileUploaded"
    />
  </form>
</template>

<script>
import axios from "axios";
import CategoriesInputs from "@/components/CategoriesInputs.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    CategoriesInputs,
    Breadcrumbs
  },
  data() {
    return {
      errors: null,
      category: {
        name: "",
        description: "",
        price: 0,
        prepayment_percent: 0,
        refund_percent: 0,
        rooms_count: 0,
        floors: 0,
        beds: 0,
        square: 0
      },
      photo: null
    };
  },
  methods: {
    createCategory() {
      // создание категории идет с помощью FormData
      const category_data = new FormData();
      // проходим по свойствам объекта и создаем из них свойства FormData
      for (var prop in this.category) {
        category_data.append(prop, this.category[prop]);
      }
      category_data.append('photo', this.photo);

      axios({
        method: "post",
        url: "categories/",
        data: category_data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          this.redirectToCategories();
        })
        .catch((error) => {
          console.log(error);
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? `${error.response.data.detail[0].loc[1]}: ${ error.response.data.detail[0].msg}`
              : error.response.data.detail;
        });
    },
    redirectToCategories() {
      this.$router.push({ name: "Categories" });
    },
    fileUploaded(e) {
      this.photo = e.target.files[0];
    }
  },
};
</script>
