<template>
  <div
    class="modal fade"
    :id="imagePopupId"
    tabindex="-1"
    aria-labelledby="show_img_label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="show_img_label">
            Просмотр изображения
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img
            id="img_modal"
            class="w-100"
            alt="Просмотр изображения"
            :src="image_scr"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image_scr", "imagePopupId"],
};
</script>
