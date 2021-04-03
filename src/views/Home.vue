<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",

  beforeRouteEnter(_to, _from, next) {
    next((vm) => vm.$store.dispatch("fetchFruits"));
  },
};
</script>
