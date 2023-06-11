<template>
  <div class="shadow mt-4 rounded-2 overflow-auto">
    <TagsTable :tags="tags">
      <template v-slot:headButton>
        <tr>
          <td class="p-0" colspan="3">
            <router-link
              :to="{ name: 'TagsCreate' }"
              class="btn btn-c_grey-100 w-100 rounded-0 py-2 fw-bold"
              >+ Создать</router-link
            >
          </td>
        </tr>
      </template>
    </TagsTable>
  </div>
</template>

<script>
import TagsTable from "@/components/TagsTable.vue";
import axios from "axios";

export default {
  components: {
    TagsTable,
  },
  data() {
    return {
      tags: [],
    };
  },
  mounted() {
    axios.get("tags/").then((response) => (this.tags = response.data));
  },
};
</script>
