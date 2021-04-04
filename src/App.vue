<template>
  <div id="app">
    <Navbar />
    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
