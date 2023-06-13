<template>
  <div class="row" v-if="category">
    <div class="col-lg-6 col-12">
      <div class="input-group">
        <label for="category-name" class="input-group-text w-10r"
          >Наименование</label
        >
        <input
          id="category-name"
          type="text"
          class="form-control"
          v-model="category.name"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-lg-0 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-beds" class="input-group-text w-10r"
          >Спальных мест</label
        >
        <input
          id="category-beds"
          type="text"
          class="form-control"
          v-model="category.beds"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-price" class="input-group-text w-10r">Цена</label>
        <input
          id="category-price"
          type="number"
          class="form-control"
          v-model="category.price"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-rooms-count" class="input-group-text w-10r"
          >Кол-во комнат</label
        >
        <input
          id="category-rooms-count"
          type="number"
          class="form-control"
          v-model="category.rooms_count"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-square" class="input-group-text w-10r"
          >Площадь</label
        >
        <input
          id="category-square"
          type="number"
          class="form-control"
          v-model="category.square"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-floors" class="input-group-text w-10r"
          >Этажей</label
        >
        <input
          id="category-floors"
          type="number"
          class="form-control"
          v-model="category.floors"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-prepayment-percent" class="input-group-text w-10r"
          >Предоплата %</label
        >
        <input
          id="category-prepayment-percent"
          type="number"
          class="form-control"
          v-model="category.prepayment_percent"
        />
      </div>
    </div>

    <div class="col-md-6 col-12 mt-4">
      <div class="input-group flex-nowrap w-auto">
        <label for="category-refund-percent" class="input-group-text w-10r"
          >Возврат %</label
        >
        <input
          id="category-refund-percent"
          type="number"
          class="form-control"
          v-model="category.refund_percent"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-lg-6 col-12">
        <div class="col-12 d-flex flex-column h-100">
          <label
            for="category-description"
            class="input-group-text rounded-top rounded-0"
            >Описание</label
          >
          <textarea
            id="category-description"
            type="text"
            class="form-control rounded-bottom rounded-0 h-10r flex-grow-1'"
            v-model="category.description"
          ></textarea>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-lg-0 mt-4">
        <label
          for="category-main-photo"
          class="input-group-text rounded-top rounded-0"
          >Главное фото</label
        >
        <input
          id="category-main-photo"
          type="file"
          class="form-control rounded-bottom rounded-0"
          v-on:change="fileUploaded"
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
  props: ["redirectTo", "category"],
  methods: {
    fileUploaded(e) {
      this.$emit("fileUploaded", e);
    },
  },
};
</script>
