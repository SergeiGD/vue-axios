<template>
  <section class="vh-100 d-flex flex-column">
    <div class="mx-auto w-75">
      <form @submit.prevent="requestReset" class="w-100">
        <p class="text-center fs-4 mb-0">Запрос сброса пароля</p>

        <hr class="mb-4 mt-0" />

        <p
          v-if="errors"
          class="text-white text-start p-2 bg-danger rounded-2 mb-4"
        >
          {{ errors }}
        </p>
        <p
          v-if="success"
          class="text-white text-start p-2 bg-success rounded-2 mb-4"
        >
          На почту было отправлено письмо с дальнейшими инструкциями
        </p>

        <div class="mb-4">
          <input
            type="email"
            class="form-control"
            placeholder="Эл. почта"
            v-model="email"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4 w-100">
          Продолжить
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      errors: null,
      success: false,
    };
  },
  methods: {
    requestReset() {
      axios
        .post("auth/request_reset", { email: this.email })
        .then(() => {
          this.errors = null;
          this.success = true;
        })
        .catch((error) => {
          console.log(error);
          this.success = false;
          this.errors =
            error.response.data.detail[0].msg !== undefined
              ? error.response.data.detail[0].msg
              : error.response.data.detail;
        });
      // this.errors = await this.userStore.logIn(this.user);
      // if (this.errors === null) this.success = true;
    },
  },
};
</script>
