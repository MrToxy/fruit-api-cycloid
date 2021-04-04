<template>
  <vue-slider
    v-bind="$props"
    :enable-cross="false"
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
    },
    max: {
      type: Number,
      required: false,
    },
    value: {
      type: Array,
      required: true,
    },
  },
};
</script>
