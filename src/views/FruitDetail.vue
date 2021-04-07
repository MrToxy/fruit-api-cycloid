<template>
  <section class="section">
    <div class="container">
      <div class="fruit-detail">
        <p :style="{ borderColor: fruit.color }" class="fruit-detail__price">
          {{ formatPrice(fruit.price) }}
        </p>
        <router-link to="/" class="fruit-detail__back"
          ><span class="emoji-left">👈</span>Back</router-link
        >
        <div class="fruit-detail__hero">
          <img
            ref="image"
            height="400"
            :src="fruit.image"
            class="fruit-detail__img"
          />
        </div>
        <h2 class="fruit-detail__name is-capitalize" v-text="fruit.name" />
        <div class="fruit-detail__details has-text-centered">
          <div class="py-1">
            <p>👅</p>
            <h2>{{ fruit.taste }}</h2>
          </div>
          <div class="py-1">
            <p>📅</p>
            <h2>{{ formatDate(fruit.expires) }}</h2>
          </div>
        </div>
        <p
          class="fruit-detail__description has-text-centered has-text-left-desktop"
          v-text="fruit.description"
        >
          <Modal
            ref="modal"
            persistent
            :default-actions="false"
            :title="`Delete ${fruit.name}`"
          >
            <template #default="{ toggle }">
              <ValidationObserver slim v-slot="{ handleSubmit, valid, reset }">
                <form @submit.prevent="handleSubmit(onDeleteFruit)">
                  <FieldWithValidation
                    name="confirmation"
                    :rules="{ required: true, is: `DELETE` }"
                    :placeholder="`to delete type DELETE`"
                    class="has-border"
                    v-model="confirmation"
                  />
                  <div class="row is-multiline is-justify-content-center mt-2">
                    <div class="col-12-mobile col-4-tablet">
                      <button
                        :disabled="loading || !valid"
                        :class="{ 'is-loading': loading }"
                        class="button is-fullwidth"
                      >
                        Submit
                      </button>
                    </div>
                    <div class="col-12-mobile col-4-tablet">
                      <button
                        :disabled="loading"
                        class="button is-fullwidth"
                        @click.prevent="onCancel(reset, toggle)"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </template>
            <template #activator="{ listeners }">
              <button
                v-on="listeners"
                class="button is-fullwidth is-danger fruit__link"
              >
                Delete Fruit
              </button>
            </template>
          </Modal>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import Modal from "@/components/Modal";
import { ValidationObserver } from "vee-validate";
import FieldWithValidation from "@/components/FieldWithValidation";
import { formatPrice } from "@/utils";

export default {
  name: "FruitDetail",
  components: {
    Modal,
    ValidationObserver,
    FieldWithValidation,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    fruit: {
      image: "",
      name: "",
    },
    confirmation: "",
    loading: false,
  }),
  async mounted() {
    try {
      await this.fetchFruit(this.id);
    } catch (error) {
      console.log("error: ", error);
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.image.style.animationPlayState = "running";
    });
  },
  methods: {
    formatPrice,
    formatDate(date) {
      const _date = new Date(date).toLocaleDateString();
      return _date;
    },
    onCancel(reset, toggle) {
      this.confirmation = "";
      reset();
      toggle();
    },
    async fetchFruit(id) {
      try {
        this.loading = true;
        const fruit = await this.$store.dispatch("showFruit", { id });
        this.fruit = fruit;
        this.loading = false;
      } catch (error) {
        this.$router.push({
          name: "notfound",
          params: {
            status: error.response.status,
            message: "Error fetching page",
          },
        });
      } finally {
        this.loading = false;
      }
    },
    async onDeleteFruit() {
      try {
        this.loading = true;
        await this.$store.dispatch("deleteFruit", { id: this.fruit.id });
        this.$refs.modal.toggleModal();

        this.$router.push("/").then(() => {
          this.$events.fire("notification", {
            show: true,
            type: "success",
            message: "Delete successfully",
          });
        });
      } catch (error) {
        this.loading = false;
        console.log("error: ", error);
      }
    },
  },
};
</script>
