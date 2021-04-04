<template>
  <vue-slider
    :min="min"
    :max="max"
    :enable-cross="false"
    :value="value"
    @change="(value) => $emit('input', value)"
  ></vue-slider>
</template>
<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  name: "PriceSlider",
  components: {
    VueSlider,
  },
  props: {
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 0.1,
    },
    value: {
      type: Array,
      required: true,
    },
  },
};
</script>
