<template>
  <section class="section">
    <Modal v-model="modal" />
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
      </div>
      <div class="row is-justify-content-center">
        <div class="col-12-mobile col-6-tablet col-4-desktop">
          <label>
            <p @click="modal = !modal">Price Range</p>
            <PriceSlider v-if="price" v-model="price" v-bind="priceRange" />
          </label>
        </div>
      </div>
    </div>
    <div class="row is-multiline pt-6">
      <div
        v-for="fruit in fruits"
        :key="fruit.id"
        class="col-12-mobile col-6-tablet col-4-desktop fruit-container"
      >
        <FruitCard :fruit="fruit" />
      </div>
    </div>
  </section>
  <!-- {{ fruit.name }}
      <button @click="deleteFruit(fruit.id)">Delete</button> -->
  <!-- <button v-if="!fruits.length && search" @click="addFruit">Add fruit</button> -->
</template>

<script>
import { Query } from "@/utils";
import Select from "@/components/Select";
import PriceSlider from "@/components/PriceSlider";
import FruitCard from "@/components/FruitCard";
import Modal from "@/components/Modal";
export default {
  name: "Home",
  components: {
    Select,
    PriceSlider,
    FruitCard,
    Modal,
  },
  data() {
    return {
      modal: false,
      search: "",
      states: [],
      taste: [],
      price: null,
    };
  },
  beforeRouteEnter(_to, _from, next) {
    next((vm) => vm.fetchFruits());
  },
  computed: {
    priceRange() {
      return this.$store.getters.price;
    },
    fruits() {
      const fruits = this.$store.getters.fruits;

      const query = new Query(fruits)
        .where((fruit) =>
          fruit.name.toLowerCase().includes(this.search.toLowerCase())
        )
        .whereIn("state", this.states)
        .whereIn("taste", this.taste);

      if (this.price)
        query.where(
          (fruit) =>
            fruit.price >= this.price[0] && fruit.price <= this.price[1]
        );

      return query.get();
    },
  },
  methods: {
    async fetchFruits() {
      try {
        await this.$store.dispatch("fetchFruits");
        console.log("price: ", this.priceRange);
        const { min, max } = this.priceRange;
        this.price = [min, max];
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
.filters {
  position: sticky;
  top: 3.25rem;
  z-index: 1;
  background: #2a9d8f;
}
.fruit-container {
  height: auto;
  &::before {
    content: "";
    padding-top: 66%;
    float: left;
  }
}
</style>
