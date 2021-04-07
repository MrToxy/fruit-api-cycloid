<template>
  <div id="app">
    <Navbar />

    <transition name="slide">
      <div
        v-if="notification.message"
        :class="`is-${notification.type}`"
        class="notification is-borderless is-fixed-top"
      >
        {{ notification.message }}
      </div>
    </transition>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import { sleep } from "@/utils";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    notification: {
      type: "success",
      message: "",
    },
    timeout: null,
  }),
  mounted() {
    this.$events.subscribe("notification", (notification) => {
      this.$nextTick(async () => {
        this.notification = {
          ...this.notification,
          ...notification,
        };
        await sleep();
        this.notification.message = "";
      });
    });
  },
};
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
  will-change: transform;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100%);
}
</style>
