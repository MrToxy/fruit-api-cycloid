<template>
  <section class="section">
    <div class="filters">
      <div class="row is-multiline">
        <div class="col-12-mobile col-6-tablet">
          <label>
            <p>Name</p>
            <div class="control has-icon-right">
              <input
                type="text"
                v-model.trim="search"
                placeholder="search fruit"
              />
              <span class="icon">
                <button @click="search = ''" class="button icon">
                  &times;
                </button>
              </span>
            </div>
          </label>
        </div>
        <div class="col-12-mobile col-3-tablet">
          <label>
            <p>State</p>
            <Select
              v-model="states"
              placeholder="Select State"
              :options="$store.getters.states"
            />
          </label>
        </div>
        <div class="col-12-mobile col-3-tablet">
          <label>
            <p>Taste</p>
            <Select
              v-model="taste"
              placeholder="Select Taste"
              :options="$store.getters.taste"
            />
          </label>
        </div>
        <div class="col-12">
          <label>
            <p>Price Range</p>
            <PriceSlider v-model="price" v-bind="$store.getters.price" />
          </label>
        </div>
      </div>
    </div>
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
  </section>
</template>

<script>
import { Query } from "@/utils";
import Select from "@/components/Select";
import PriceSlider from "@/components/PriceSlider";
export default {
  name: "Home",
  components: {
    Select,
    PriceSlider,
  },
  data() {
    return {
      search: "",
      states: [],
      taste: [],
      price: [this.$store.getters.price.min, this.$store.getters.price.max],
    };
  },
  beforeRouteEnter(_to, _from, next) {
    next((vm) => vm.fetchFruits());
  },
  computed: {
    fruits() {
      const fruits = this.$store.getters.fruits;

      return new Query(fruits)
        .where((fruit) =>
          fruit.name.toLowerCase().includes(this.search.toLowerCase())
        )
        .whereIn("state", this.states)
        .whereIn("taste", this.taste)
        .where(
          (fruit) =>
            fruit.price >= this.price[0] && fruit.price <= this.price[1]
        )
        .get();
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
