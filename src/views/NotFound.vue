<template>
  <section class="section">
    <div
      class="container is-fullheight has-text-centered is-flex is-justify-content-center is-align-items-center"
    >
      <div>
        <h1 class="is-size-3">{{ message }}</h1>
        <p class="is-size-2 mt-1 mb-2">{{ status }}</p>
        <router-link :to="redirectTo">
          <button class="button is-medium is-inverted">
            Take me to a safe place
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "NotFound",
  props: {
    status: {
      type: [String, Number],
      required: false,
      default: 404,
    },
    message: {
      type: String,
      required: false,
      default: "It seems like you might be lost",
    },
    redirectTo: {
      type: [String, Object],
      required: false,
      default: "/",
    },
  },
};
</script>
