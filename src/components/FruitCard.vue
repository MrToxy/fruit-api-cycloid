<template>
  <router-link
    :to="{ name: 'fruit.detail', params: { id: fruit.id } }"
    v-slot="{ navigate, href }"
    custom
  >
    <a
      :href="href"
      @click="navigate"
      class="fruit-card"
      ref="card"
      :class="fruit.state"
    >
      <div class="fruit-card__header is-flex is-justify-content-space-between">
        <span class="fruit-card__expires" v-text="getExpiration(fruit)" />
        <span class="fruit-card__price" v-text="formatPrice(fruit.price)" />
      </div>
      <img
        class="fruit-card__image"
        :style="{ color: fruit.color }"
        ref="cardImage"
        :data-src="fruit.image"
        height="64"
        width="64"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAZ0lEQVR42u3QgRAAQAgAsE/mURIIKPU4ujaExc/qd1gIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB+w3ux0/BZKdeXQAAAABJRU5ErkJggg=="
      />
      <h2 class="fruit-card__name">{{ fruit.name }}</h2>
      <div class="fruit-card__stats">
        <div class="fruit-card_stat" v-text="fruit.taste" />
      </div>
    </a>
  </router-link>
</template>
<script>
import { daysToDateObject, formatPrice } from "@/utils";
export default {
  name: "FruitCard",
  props: {
    fruit: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(this.onInterect, {
        threshold: 0.2,
      });
      observer.observe(this.$refs.card);
    } else if (this.$refs.cardImage) {
      this.$refs.cardImage.src = this.$refs.cardImage.dataset.src;
    }
  },
  methods: {
    onInterect([card], observer) {
      if (card.isIntersecting) {
        const image = this.$refs.cardImage;
        if (image) {
          image.src = image.dataset.src;
        }
        observer.disconnect();
      }
    },
    formatPrice,
    getExpiration({ expiresIn = 0 }) {
      const { weeks, hours, days } = daysToDateObject(expiresIn);

      const expires = [];

      if (weeks > 0) expires.push(`${Math.floor(weeks)} weeks`);
      if (days >= 1) expires.push(`${Math.floor(days)} day(s)`);
      if (hours > 0 && days < 1) expires.push(`${Math.floor(hours)} hours`);

      return expiresIn <= 0 ? "Expired" : `${expires.join(", ")} to Expire`;
    },
  },
};
</script>
