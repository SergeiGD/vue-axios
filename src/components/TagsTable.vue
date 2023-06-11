<template>
  <div class="shadow mt-4 rounded-2 overflow-auto">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-nowrap">id</th>
          <th scope="col" class="text-nowrap">Наименование</th>
        </tr>
      </thead>
      <tbody>
        <slot name="headButton"></slot>
        <tr role="button" v-for="tag in tags" :key="tag.id">
          <th scope="row">{{ tag.id }}</th>
          <td class="text-nowrap">
            <router-link
              :to="{ name: 'TagsDetail', params: { id: tag.id } }"
              class="link-hover d-block"
              >{{ tag.name }}
            </router-link>
          </td>
        </tr>
        <slot name="actionButton"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["tags"],
};
</script>
