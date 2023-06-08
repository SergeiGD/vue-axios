<template>
  <p  v-if="errors" class="text-white  text-start p-2 h-100 bg-danger rounded-2">{{ errors }}</p>
  <form class="shadow p-3 rounded-2 d-flex flex-column gap-4 position-relative" @submit.prevent="createTag">
    <TagsInputs :tag="tag" :redirectTo="redirectToTags"/>
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
      tag: {
        name: ""
      }
    }
  },
  methods: {
    createTag() {
      axios.post("http://192.168.1.57:8000/tags/", this.tag)
        .then(() => {
          this.redirectToTags()
        })
        .catch((error) =>{
          console.log(error)
          this.errors = (error.response.data.detail[0].msg === 'undefined') ? error.response.data.detail[0].msg : error.response.data.detail;
        });
    },
    redirectToTags() {
      this.$router.push({path: '/tags'});
    },
  }
})
</script>
