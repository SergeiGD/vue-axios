<template>
  <div class="row" v-if="tag">
    <div class="col-12">
      <div class="input-group">
        <label for="tag-name" class="input-group-text w-10r"
          >Наименование</label
        >
        <input
          id="tag-name"
          type="text"
          class="form-control"
          v-model="tag.name"
        />
      </div>
    </div>

    <div class="col-12 mt-4">
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-lg btn-c_yellow-700">
          Сохранить
        </button>
        <button
          type="button"
          class="btn btn-lg btn-c_grey-100"
          @click="redirectTo"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["redirectTo", "tag"],
};
</script>
