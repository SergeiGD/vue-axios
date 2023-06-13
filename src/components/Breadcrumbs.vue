<template>
  <div style="--bs-breadcrumb-divider: \'>\';" aria-label="breadcrumb">
    <ol class="breadcrumb link-hover text-dark text-decoration-none fs-5">

      <li class="breadcrumb-item" v-for="breadcrumb, index in breadcrumbs" :key="index">

        <router-link
          :to="{ name: breadcrumb.view, params: breadcrumb.params }"
          class="link-hover text-dark text-decoration-none"
        >{{ breadcrumb.name }}</router-link>

        |
          
      </li>

    </ol>

  </div>
</template>

<script>

export default({
    props: ["breadcrumbs"],
})

</script>