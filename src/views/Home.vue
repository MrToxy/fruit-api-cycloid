<template>
  <section class="section">
    <div class="container">
      <div class="filters">
        <div class="row is-multiline">
          <div class="col-12-mobile col-4-tablet">
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
          </div>
          <div class="col-12-mobile col-3-tablet">
            <Select
              v-model="states"
              placeholder="Select State"
              :options="$store.getters.states"
            />
          </div>
          <div class="col-12-mobile col-3-tablet">
            <Select
              v-model="taste"
              placeholder="Select Taste"
              :options="$store.getters.taste"
            />
          </div>
          <div class="col-12-mobile col-2-tablet">
            <Modal :default-actions="false" title="Create new fruit" persistent>
              <template #default="{ toggle }">
                <CreateFruitForm
                  @submit="(form) => onFormSubmit(form, toggle)"
                  @error="onFormError"
                  @cancel="toggle"
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
      search: "",
      states: [],
      taste: [],
      price: [],
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
      } catch (error) {
        console.log("error in cmp: ", error);
      }
    },
    onFormError({ form }) {
      this.$events.fire("notification", {
        type: "danger",
        message: `We were not able to create ${form.name}`,
      });
    },
    onFormSubmit(form, toggle) {
      toggle();
      this.$events.fire("notification", {
        message: `${form.name} was created successfully`,
      });
    },
  },
  watch: {
    priceRange({ max, min }) {
      this.$set(this.price, 0, min);
      this.$set(this.price, 1, max);
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
