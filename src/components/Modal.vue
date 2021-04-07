<template>
  <div>
    <transition name="fade" appear>
      <div
        v-show="modalOpen"
        @click="onClickOutside"
        :class="{ 'modal--persistent': persistent }"
        class="modal-backdrop is-flex has-text-primary is-align-items-center is-justify-content-center"
      >
        <div
          class="modal-container"
          :class="{ 'is-fullscreen-mobile': fullScreenMobile }"
        >
          <h2 class="modal-title has-text-success" v-text="title" />
          <div class="modal-content py-5">
            <slot :toggle="toggleModal"> </slot>
          </div>
          <div class="modal-actions">
            <slot name="actions">
              <div
                v-if="defaultActions"
                class="row moda-actions__default is-multiline is-justify-content-center"
              >
                <div class="col-12-mobile col-4-tablet">
                  <button class="button is-fullwidth">Accept</button>
                </div>
                <div class="col-12-mobile col-4-tablet">
                  <button
                    class="button is-fullwidth"
                    @click="modalOpen = false"
                  >
                    Close
                  </button>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </transition>
    <slot name="activator" :listeners="listeners"> </slot>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    defaultActions: {
      type: Boolean,
      required: false,
      default: false,
    },
    fullScreenMobile: {
      type: Boolean,
      required: false,
      default: true,
    },
    title: { type: String, required: false, default: "" },
    persistent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    open: false,
  }),
  computed: {
    listeners() {
      return {
        click: () => {
          this.modalOpen = !this.modalOpen;
        },
      };
    },
    modalOpen: {
      get() {
        return this.open;
      },
      set(val) {
        this.open = val;
        if (this.value !== val) this.$emit("input", val);
        this.onToggle();
      },
    },
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    onClickOutside() {
      if (!this.persistent) {
        this.onToggle();
        this.modalOpen = false;
      }
    },
    onToggle() {
      if (this.open) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "";
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.modalOpen = val;
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
.modal--persistent {
  &:active .modal-container {
    transform: scale(1.05);
  }
  .modal-container {
    transition: transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    will-change: transform;
    &:active {
      transform: none !important;
    }
  }
}
// .modal--persistent:active {
//   .modal-container {
//     transform: scale(1.1);
//   }
//   .modal-container:active {
//     transform: none !important;
//   }
// }
</style>

<style></style>
