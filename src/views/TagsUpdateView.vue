<template>
  <NotFound v-if="notFound"></NotFound>

  <Breadcrumbs
    :breadcrumbs="[
      { view: 'Tags', name: 'Tags' },
      { view: 'TagsDetail', name: 'Detail', params: { id: $route.params.id } },
      { view: 'TagsUpdate', name: 'Update', params: { id: $route.params.id } },
    ]"
  />

  <p v-if="errors" class="text-white text-start p-2 h-100 bg-danger rounded-2">
    {{ errors }}
  </p>
  <form
    class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative"
    @submit.prevent="updateTag"
  >
    <TagsInputs :tag="tag" :redirectTo="redirectToTagsDetail" />
  </form>
</template>

<script>
import axios from "axios";
import TagsInputs from "@/components/TagsInputs.vue";
import NotFound from "@/components/NotFound.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {
    TagsInputs,
    NotFound,
    Breadcrumbs,
  },
  data() {
    return {
      errors: null,
      tag: null,
      notFound: false,
    };
  },
  methods: {
    updateTag() {
      axios
        .put(`tags/${this.$route.params.id}`, this.tag)
        .then(() => {
          this.redirectToTagsDetail();
        })
        .catch((error) => {
          console.log(error);
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? error.response.data.detail[0].msg
              : error.response.data.detail;
        });
    },
    redirectToTagsDetail() {
      this.$router.push({ name: "TagsDetail", params: { id: this.tag.id } });
    },
  },
  mounted() {
    axios
      .get(`tags/${this.$route.params.id}`)
      .then((response) => (this.tag = response.data))
      .catch((error) => {
        if (error.response.status === 404) this.notFound = true;
      });
  },
};
</script>
