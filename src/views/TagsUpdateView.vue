<template>
  <p v-if="errors" class="text-white  text-start p-2 h-100 bg-danger rounded-2">{{ errors }}</p>
  <form class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative" @submit.prevent="updateTag">
    <TagsInputs :tag="tag" :redirectTo="redirectToTagsDetail"/>
  </form>
</template>

<script>
import axios from "axios";
import TagsInputs from '@/components/TagsInputs.vue'

export default({
  components: {
    TagsInputs
  },
  data() {
    return {
      errors: null,
      tag: null
    }
  },
  methods: {
    updateTag() {
      axios.put(`http://192.168.1.57:8000/tags/${this.$route.params.id}`, this.tag)
        .then(() => {
          this.redirectToTagsDetail()
        })
        .catch((error) =>{
          console.log(error)
          this.errors = (error.response.data.detail[0].msg !== 'undefined') ? error.response.data.detail[0].msg : error.response.data.detail;
        });
    },
    redirectToTagsDetail() {
      this.$router.push({path: `/tags/${this.tag.id}`});
    },
  },
  mounted() {
      axios
        .get(`http://192.168.1.57:8000/tags/${this.$route.params.id}`)
        .then((response) => (this.tag=response.data));
    },
})
</script>
