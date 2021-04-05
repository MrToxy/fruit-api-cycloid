<template>
  <div>
    <div
      class="fruit-detail__hero is-flex is-align-items-flex-end is-justify-content-center"
    >
      <img
        class="fruit-detail__image"
        height="256"
        width="256"
        :src="fruit.image"
      />
    </div>
    <section class="section">
      <div class="container">
        <button class="button is-inverted has-background-danger">Delete</button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "FruitDetail",
  beforeRouteEnter(to, _from, next) {
    next((vm) => vm.fetchFruit(to.params.id));
  },
  data: () => ({
    fruit: null,
  }),
  methods: {
    async fetchFruit(id) {
      try {
        const { data: fruit } = await this.$api.show(id);
        this.fruit = fruit;
        console.log("fruit: ", fruit);
      } catch (error) {
        console.log("error: ", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.fruit-detail__hero {
  height: 300px;
  width: 100%;
  background-color: rgba(#264653, 0.6);
  position: relative;
}
.fruit-detail__image {
  position: relative;
  transform: translateY(50%);
  height: clamp(128px, 15vw, 256px);
  width: clamp(128px, 15vw, 256px);
  border-radius: 100%;
  background: white;
}
</style>
