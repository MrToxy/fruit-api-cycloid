<template>
  <transition name="fade" appear>
    <div
      v-if="value"
      class="modal-backdrop is-flex is-align-items-center is-justify-content-center"
    >
      <div class="modal-container">
        <h2 class="modal-title has-text-success">Modal Title</h2>
        <div class="modal-content py-5">
          <slot>
            <form>asdasdsad</form>
          </slot>
        </div>
        <div class="modal-actions">
          <slot name="actions">
            <button>Accept</button>
            <button @click.stop="$emit('input', false)">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          document.documentElement.style.overflowY = "hidden";
        } else {
          document.documentElement.style.overflowY = "";
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style></style>
