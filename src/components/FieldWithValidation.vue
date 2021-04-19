<template>
  <ValidationProvider
    slim
    ref="provider"
    :rules="rules"
    :name="name"
    v-slot="{ errors, valid, invalid, validate }"
  >
    <div class="control has-border">
      <p v-if="label" class="control-label" v-text="label" />
      <slot
        :listeners="listeners"
        :errors="errors"
        :validate="validate"
        :invalid="invalid && errors.length"
      >
        <input
          :type="type"
          :class="{ 'is-invalid': errors.length && !valid }"
          :value="value"
          v-on="listeners"
          v-bind="$attrs"
        />
      </slot>
      <p class="input-error">{{ errors[0] }}</p>
    </div>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "FieldWithValidation",
  inheritAttrs: false,
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: null,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    rules: {
      type: [String, Object, Array],
      required: true,
    },
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit("input", e.target.value);
          // this.$refs.provider.validate(e.target.value);
        },
      };
    },
  },
};
</script>
