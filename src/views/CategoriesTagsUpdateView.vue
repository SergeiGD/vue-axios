<template>

  <Breadcrumbs 
    :breadcrumbs="[ 
      { view: 'Categories', name: 'Categories' }, 
      { view: 'CategoriesDetail', name: 'Detail', params: { id: $route.params.id } },
      { view: 'CategoriesTagsUpdate', name: 'Update tags', params: { id: $route.params.id } },
    ]" 
  />

  <div class="shadow rounded-2 overflow-auto">

    <p v-if="errors" class="text-white text-start p-2 h-100 bg-danger rounded-bottom rounded-0 mb-3">
      {{ errors }}
    </p>

    <div class="text-center">
      <span class="fw-bold fs-5">Изменение тегов категории</span>
    </div>
    
    <TagsTable :tags="tags">
      <template v-slot:headButton>
        <tr>
          <td class="p-0" colspan="3">
            <router-link
              :to="{ name: 'CategoriesTagsAdd' }"
              class="btn btn-c_grey-100 w-100 rounded-0 py-2 fw-bold"
              >+ Добавить</router-link
            >
          </td>
        </tr>
      </template>
      <template v-slot:actionButton="tag">
        
        <td class="text-nowrap p-0">
            <button
              @click="removeTagFromCategory(tag.tag)"
              class="btn btn-danger w-100 rounded-0 py-2 fw-bold"
            >Убрать</button>
        </td>

      </template>
    </TagsTable>
  </div>
</template>

<script>
import TagsTable from "@/components/TagsTable.vue";
import axios from "axios";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    TagsTable,
    Breadcrumbs
  },
  data() {
    return {
      tags: [],
      errors: null
    };
  },
  beforeMount() {
    axios
      .get(`categories/${this.$route.params.id}/tags`)
      .then((response) => {
        this.tags = response.data;
      })
  },
  methods: {
    removeTagFromCategory(tag) {
      axios
        .delete(`categories/${this.$route.params.id}/tags`, { data: {tag_id: tag.id} })
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
