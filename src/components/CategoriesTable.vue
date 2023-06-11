<template>
  <div class="shadow mt-4 rounded-2 overflow-auto">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-nowrap">id</th>
          <th scope="col" class="text-nowrap">Наименование</th>
          <th scope="col" class="text-nowrap">Спальных мест</th>
          <th scope="col" class="text-nowrap">Комнат</th>
          <th scope="col" class="text-nowrap">Цена</th>
        </tr>
      </thead>
      <tbody>
        <slot name="headButton"></slot>
        <tr role="button" v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td class="text-nowrap">
            <router-link
              :to="{ name: 'CategoriesDetail', params: { id: category.id } }"
              class="link-hover d-block"
              >{{ category.name }}
            </router-link>
          </td>
          <td class="text-nowrap">
            <tr scope="row">
              {{
                category.beds
              }}
            </tr>
          </td>
          <td class="text-nowrap">
            <tr scope="row">
              {{
                category.rooms_count
              }}
            </tr>
          </td>
          <td class="text-nowrap">
            <tr scope="row">
              {{
                category.price
              }}
            </tr>
          </td>
        </tr>
        <slot name="actionButton"></slot>
      </tbody>
    </table>
  </div>

  <div class="d-flex justify-content-center mt-4" v-if="pagination">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="
            this.$emit('pageChanged', page - 1 > 0 ? page - 1 : page)
          "
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-for="item in pagination.pages_count" :key="item" class="page-item">
        <a
          class="page-link"
          href="#"
          @click.prevent="this.$emit('pageChanged', item)"
          >{{ item }}</a
        >
      </li>

      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="
            this.$emit(
              'pageChanged',
              page + 1 <= pagination.pages_count ? page + 1 : page
            )
          "
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["categories", "pagination", "page"],
};
</script>
