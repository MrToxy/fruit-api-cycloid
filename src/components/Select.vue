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
          <label style="display: block" :for="`${id}-${option}`">
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
        option.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  methods: {
    removeSelected(selected) {
      console.log("selected:", selected);
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
<style lang="scss" scoped>
.select__header {
  display: flex;
  align-items: center;

  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.selected {
  padding: 0.25rem;
  display: flex;
  align-items: center;
  max-width: 100%;
  flex-wrap: wrap;
  min-width: 0;
  flex: 1 1;
  border-radius: 3px;
  flex-wrap: wrap;
  max-width: 100%;
  .chip {
    margin: 0 3px;
    font-size: 0.75rem;
  }
}
.select {
  display: flex;

  &__input {
    border-radius: 0px;
    flex: 1 1;
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;
    min-width: 64px;
  }
  position: relative;
  &__options {
    position: absolute;
    display: none;
    padding-top: 1rem;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    max-height: 250px;
    overflow-y: auto;
    background: white;

    label {
      display: block;
    }
  }

  &__input:focus + &__options {
    display: block;
  }
  &__options:hover {
    display: block;
  }
}
.chip {
  display: inline-block;
  border-radius: 10px;
  background: red;
  padding: 0.5rem 0.5rem;
}
.selected__option {
  cursor: pointer;
  label {
    cursor: pointer;
    padding: 1rem;
  }
  &.is-selected {
    background: blue;
    color: white;
  }
}
</style>
