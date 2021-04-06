<template>
  <section class="section">
    <div class="container">
      <div class="filters">
        <div class="row is-multiline">
          <div class="col-12-mobile col-4-tablet">
            <label>
              <!-- <p>Name</p> -->
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
              <!-- <p>State</p> -->
              <Select
                v-model="states"
                placeholder="Select State"
                :options="$store.getters.states"
              />
            </label>
          </div>
          <div class="col-12-mobile col-3-tablet">
            <label>
              <!-- <p>Taste</p> -->
              <Select
                v-model="taste"
                placeholder="Select Taste"
                :options="$store.getters.taste"
              />
            </label>
          </div>
          <div class="col-12-mobile col-2-tablet">
            <Modal
              :default-actions="false"
              title="Create new fruit"
              persistent
              v-model="modal"
            >
              <template #default>
                <CreateFruitForm
                  @submit="onFormSubmit"
                  @cancel="modal = false"
                />
              </template>
              <template #activator="{ listeners }">
                <button
                  class="button is-inverted is-fullwidth"
                  v-on="listeners"
                >
                  Add fruit
                </button>
              </template>
            </Modal>
          </div>
        </div>
        <div class="row is-justify-content-center pt-2">
          <div class="col-12-mobile col-6-tablet col-4-desktop">
            <label>
              <p>Price Range</p>
              <PriceSlider
                tooltip="always"
                tooltip-placement="bottom"
                v-if="price"
                v-model="price"
                v-bind="priceRange"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="row is-multiline pt-6">
        <div
          v-for="fruit in fruits"
          :key="fruit.id"
          class="col-12-mobile col-6-tablet col-4-desktop fruit-card__container"
        >
          <FruitCard :fruit="fruit" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Query } from "@/utils";
import Select from "@/components/Select";
import PriceSlider from "@/components/PriceSlider";
import FruitCard from "@/components/FruitCard";
import CreateFruitForm from "@/components/Forms/CreateFruitForm";
import Modal from "@/components/Modal";
export default {
  name: "Home",
  components: {
    Select,
    PriceSlider,
    FruitCard,
    Modal,
    CreateFruitForm,
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
        const { min, max } = this.priceRange;
        this.price = [min, max];
      } catch (error) {
        console.log("error in cmp: ", error);
      }
    },
    async onFormSubmit({ form, toggleLoading }) {
      try {
        toggleLoading();
        await this.$store.dispatch("addFruit", form);
        this.$events.fire("notification", "testing");
      } catch (error) {
        console.log("error: ", error);
      } finally {
        toggleLoading();
      }
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
  top: 4.25rem;
  z-index: 1;
  background: #2a9d8f;
}
</style>
