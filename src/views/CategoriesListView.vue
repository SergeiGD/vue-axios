<template>
  <div class="shadow mt-4 rounded-2 overflow-auto">
    <CategoriesTable
      :categories="categories"
      :page="page"
      :pagination="pagination"
      @pageChanged="pageChanged"
    >
      <template v-slot:headButton>
        <tr>
          <td class="p-0" colspan="5">
            <router-link
              :to="{ name: 'CategoriesCreate' }"
              class="btn btn-c_grey-100 w-100 rounded-0 py-2 fw-bold"
              >+ Создать</router-link
            >
          </td>
        </tr>
      </template>
    </CategoriesTable>
  </div>
</template>

<script>
import CategoriesTable from "@/components/CategoriesTable.vue";
import axios from "axios";

export default {
  components: {
    CategoriesTable,
  },
  data() {
    return {
      categories: [],
      pagination: null,
      page: 1,
    };
  },
  beforeMount() {
    axios.get(`categories/`).then((response) => {
      this.pagination = response.data[0];
      this.categories = response.data.slice(1);
    });
  },
  methods: {
    pageChanged(new_page) {
      this.page = new_page;
      // копируем query, чтоб не изменять остальные query параметры
      const query = Object.assign({}, this.$router.currentRoute.value.query);
      // обновляем значение
      query.page = this.page;
      // обновляем url
      this.$router.push({ name: "Categories", query: query });
    },
  },
  beforeRouteUpdate(to, from, next) {
    // при обновлении страницы (pageChanged) будет вызван этот метод в нем получем новые данные
    axios.get(to.fullPath).then((response) => {
      this.pagination = response.data[0];
      this.categories = response.data.slice(1);
    });
    next(() => {});
  },
};
</script>
