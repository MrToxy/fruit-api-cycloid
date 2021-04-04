<template>
  <div class="home">
    <input type="text" v-model.trim="search" placeholder="search fruit" />
    <pre>
      {{ $store.getters.price }}
    </pre>
    <div
      v-for="fruit in fruits"
      :ref="fruit.id"
      :key="fruit.id"
      :class="`fruit--${fruit.state}`"
      class="fruit"
    >
      {{ fruit.name }}
      <button @click="deleteFruit(fruit.id)">Delete</button>
    </div>
    <button v-if="!fruits.length && search" @click="addFruit">Add fruit</button>
  </div>
</template>

<script>
import { Query } from "@/utils";
export default {
  name: "Home",
  data: () => ({
    search: "",
  }),
  beforeRouteEnter(_to, _from, next) {
    next((vm) => vm.fetchFruits());
  },
  computed: {
    fruits() {
      const fruits = this.$store.getters.fruits;

      return (
        new Query(fruits)
          .where((fruit) =>
            fruit.name.toLowerCase().includes(this.search.toLowerCase())
          )
          // .where((fruit) => fruit.state === "healthy")
          .get()
      );
    },
  },
  methods: {
    async fetchFruits() {
      try {
        await this.$store.dispatch("fetchFruits");
      } catch (error) {
        console.log("error in cmp: ", error);
      }
    },
    toggleDeleting(id) {
      const [fruit] = this.$refs[id];
      if (fruit) fruit.classList.toggle("deleting");
    },
    async deleteFruit(id) {
      try {
        this.toggleDeleting(id);

        await this.$store.dispatch("deleteFruit", { id });
      } catch (error) {
        console.log("err: ", error);
      } finally {
        this.toggleDeleting(id);
      }
    },

    addFruit() {
      console.log("add fruit");
    },
  },
};
</script>
<style scoped lang="scss">
.deleting {
  opacity: 0.4;
  pointer-events: none;
}
.fruit {
  &--rotten {
    color: red;
  }
  &--healthy {
    color: green;
  }
  &--rotting {
    color: yellow;
  }
}
</style>
