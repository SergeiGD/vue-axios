<template>

  <Breadcrumbs 
    :breadcrumbs="[ 
      { view: 'Categories', name: 'Categories' }, 
      { view: 'CategoriesDetail', name: 'Detail', params: { id: $route.params.id } },
      { view: 'CategoriesTagsUpdate', name: 'Update tags', params: { id: $route.params.id } },
      { view: 'CategoriesTagsAdd', name: 'Add tags', params: { id: $route.params.id } },
    ]" 
  />

  <div class="shadow rounded-2 overflow-auto">

    <p v-if="errors" class="text-white text-start p-2 h-100 bg-danger rounded-bottom rounded-0 mb-3">
      {{ errors }}
    </p>

    <div class="text-center">
      <span class="fw-bold fs-5">Добавление тегов к категории</span>
    </div>

    <TagsTable :tags="tags">
      <template v-slot:actionButton="tag">
        
        <td class="text-nowrap p-0">
            <button
              @click="addTagToCategory(tag.tag)"
              class="btn btn-primary w-100 rounded-0 py-2 fw-bold"
            >Выбрать</button>
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
  props: ["tag"],
  data() {
    return {
      tags: [],
      errors: null
    };
  },
  beforeMount() {
    axios
      .get(`tags/`)
      .then((response) => {
        this.tags = response.data;
      })
  },
  methods: {
    addTagToCategory(tag) {
      axios
        .put(`categories/${this.$route.params.id}/tags`, { tag_id: tag.id })
        .then(() => {
          this.$router.push({ name: "CategoriesTagsUpdate", params: { id: this.$route.params.id } });
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
