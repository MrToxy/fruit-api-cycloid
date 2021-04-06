<template>
  <section class="section">
    <div class="container">
      <div class="mt-3">
        <figure class="fruit">
          <p :style="{ borderColor: fruit.color }" class="fruit__price">
            ${{ fruit.price }}
          </p>
          <router-link to="/" class="fruit__back"
            ><span class="emoji-left">👈</span>Back</router-link
          >
          <div class="fruit__hero">
            <img height="400" :src="fruit.image" class="fruit__img" />
          </div>
          <h2 class="fruit__name is-capitalize" v-text="fruit.name" />
          <div class="fruit__details">
            <p><span class="emoji-left">🍑</span> Great for every meal</p>
            <p><span class="emoji-left">💊</span> Vitamins full</p>
            <p><span class="emoji-left">🍰</span> Peaches cakes are the best</p>
            <p>
              <span class="emoji-left">🍹</span> Make your own peachy coctail
            </p>
          </div>
          <p class="fruit__description" v-text="fruit.description">
            <Modal
              ref="modal"
              persistent
              :default-actions="false"
              :title="`Delete ${fruit.name}`"
            >
              <template #default="{ toggle }">
                <ValidationObserver
                  slim
                  v-slot="{ handleSubmit, valid, reset }"
                >
                  <form @submit.prevent="handleSubmit(onDeleteFruit)">
                    <FieldWithValidation
                      name="confirmation"
                      :rules="{ required: true, is: `DELETE` }"
                      :placeholder="`to delete type DELETE`"
                      class="has-border"
                      v-model="confirmation"
                    />
                    <div
                      class="row is-multiline is-justify-content-center mt-2"
                    >
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
        </figure>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import Modal from "@/components/Modal";
import { ValidationObserver } from "vee-validate";
import FieldWithValidation from "@/components/FieldWithValidation";
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
      document.querySelector(".fruit__img").style.animationPlayState =
        "running";
    });
  },
  methods: {
    onCancel(reset, toggle) {
      this.confirmation = "";
      reset();
      toggle();
    },
    async fetchFruit(id) {
      try {
        this.loading = true;
        const { data: fruit } = await this.$api.show(id);
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

.fruit {
  width: 70rem;
  margin: 0 auto;
  background: white;
  box-shadow: 0 3rem 6rem 1rem rgba(0, 0, 0, 0.25);
  position: relative;
  max-width: 90%;
}

.fruit__hero {
  position: relative;
}

.fruit__hero::before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: linear-gradient(to right bottom, #2a9d8f, #e9c46a);

  opacity: 0.4;
}

.fruit__img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  position: relative;
  clip-path: circle(3% at 50% 6%);
  transform: translateY(-100%);
  animation: clippy 1s linear forwards;
  animation-play-state: paused;

  @keyframes clippy {
    0%,
    50% {
      transform: translateY(-100%);
      clip-path: circle(3% at 50% 6%);
    }

    50%,
    100% {
      transform: translateY(0%);
      clip-path: circle(5% at 50% 50%);
    }

    100% {
      clip-path: circle(100% at 50% 50%);
    }
  }
}

.fruit__price {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  font-size: 2rem;
  padding: 1rem;

  background: linear-gradient(to right bottom, #2a9d8f, #e9c46a);
  // height: clamp(150px, 30vw, 250px);
  // width: clamp(150px, 30vw, 250px);
  // border: 6px solid currentColor;
  // border-radius: 50%;
  // transform: rotate(15deg);
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.4);
  color: white;
  font-family: "Bungee Inline", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  // svg {
  //   width: 80%;
  // }
}

.fruit__back:link,
.fruit__back:visited {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  z-index: 2;
  border: 2px solid white;
  border-radius: 100rem;
  padding: 0 2rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.fruit__back:hover,
.fruit__back:active {
  background-color: white;
  color: #555;
}

.fruit__name {
  background: linear-gradient(to right, #2a9d8f, #e9c46a);
  padding: 1.75rem 1rem;
  font-family: "Bungee Inline", sans-serif;
  font-weight: 400;
  font-size: 3.25rem;
  color: white;
  text-align: center;
  word-spacing: 2px;
}

.fruit__details {
  background-color: #e9c46a;
  padding: 4rem 6rem;
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.75rem;
}

.fruit__description {
  padding: 5rem 6rem;
  font-size: 1.6rem;
  line-height: 1.8;
  background: #e9c46a;
}
.fruit__link {
  min-height: 60px;
}

.fruit__link:link,
.fruit__link:visited {
  display: block;
  background-color: #d3d46a;
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.fruit__link:hover,
.fruit__link:active {
  background-color: #54a759;
}

.fruit__source {
  padding: 0 6rem 3rem;
  color: #999;
  font-size: 1.2rem;
  background: #e9c46a;
}

.fruit__source a:link,
.fruit__source a:visited {
  color: #999;
}

.fruit__source a:hover,
.fruit__source a:active {
  color: #555;
}

.emoji-left {
  font-size: 2rem;
  margin-right: 1rem;
}

.emoji-right {
  font-size: 2rem;
  margin-left: 1rem;
}
</style>
