<template>
  <div class="shadow p-3 rounded-2 position-relative find_form">
    <i
      class="fa-regular fa-trash-can text-danger card_icon card_icon__delete clean_btn"
      @click="this.$emit('filterCleaned')"
    ></i>

    <div class="row align-items-start justify-content-between">
      <div class="col-lg-12 col-12 row mx-auto p-0">
        <div class="col-12 col-md-6">
          <label for="filter-id" class="form-label">id</label>
          <input
            id="filter-id"
            type="number"
            class="form-control"
            v-model="filter.id"
          />
        </div>

        <div class="col-12 col-md-6">
          <label for="filter-name" class="form-label">Наименование</label>
          <input
            id="filter-name"
            type="text"
            class="form-control"
            v-model="filter.name"
          />
        </div>

        <div class="col-12 col-md-6">
          <label for="filter-price-from" class="form-label">Цена от</label>
          <input
            id="filter-price-from"
            type="number"
            class="form-control"
            v-model="filter.price_from"
          />
        </div>

        <div class="col-12 col-md-6">
          <label for="filter-price-until" class="form-label">Цена до</label>
          <input
            id="filter-price-until"
            type="number"
            class="form-control"
            v-model="filter.price_until"
          />
        </div>

        <div class="col-12 col-md-6">
          <label for="filter-beds-from" class="form-label"
            >Спальных мест от</label
          >
          <input
            id="filter-beds-from"
            type="number"
            class="form-control"
            v-model="filter.beds_from"
          />
        </div>

        <div class="col-12 col-md-6">
          <label for="filter-beds-until" class="form-label"
            >Спальных мест до</label
          >
          <input
            id="filter-beds-until"
            type="number"
            class="form-control"
            v-model="filter.beds_until"
          />
        </div>

        <div class="col-12 mt-4">
          <button
            class="btn btn-warning w-100"
            @click="this.$emit('filterChanged')"
          >
            Найти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filter"],
};
</script>
