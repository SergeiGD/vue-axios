<template>
  <form @submit.prevent="deleteItem">
    <div
      class="modal fade"
      id="delete_modal"
      tabindex="-1"
      aria-labelledby="delete_modal_label"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="delete_modal_label">
              Подтвердите удаление
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Вы уверены, что хотите выполнить удаление?</p>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-danger w-10r"
              data-bs-dismiss="modal"
            >
              Да, удалить
            </button>
            <button
              type="button"
              class="btn btn-secondary w-10r"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ["deleteItem"],
};
</script>
