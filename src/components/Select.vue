<template>
  <div class="select">
    <div class="selected" style="background: white">
      <span
        @click="removeSelected(option)"
        v-for="option in selected"
        :key="option"
        class="chip"
        >{{ option }}</span
      >
      <input
        autocomplete="off"
        :placeholder="placeholder"
        type="text"
        v-model.trim="search"
        class="select__input"
      />
      <ul class="select__options">
        <li
          v-for="option in filteredOptions"
          :key="`${id}-${option}`"
          :class="{ 'is-selected': selected.includes(option) }"
          class="has-text-success selected__option"
        >
          <label class="select__option-label is-block" :for="`${id}-${option}`">
            <input
              hidden
              :id="`${id}-${option}`"
              type="checkbox"
              :value="option"
              v-model="selected"
            />
            {{ option }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  data: () => ({
    selected: [],
    search: "",
    id: Symbol().toString(),
  }),
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
        String(option).toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  methods: {
    removeSelected(selected) {
      const idx = this.selected.indexOf(selected);
      if (idx !== -1) this.selected.splice(idx, 1);
    },
  },
  watch: {
    selected(value) {
      this.$emit("input", value);
    },
  },
};
</script>
