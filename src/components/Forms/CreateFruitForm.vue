<template>
  <ValidationObserver slim v-slot="{ handleSubmit, reset }">
    <form @submit.prevent="handleSubmit(() => onSubmit(reset))">
      <FieldWithValidation
        rules="required"
        name="name"
        placeholder="name"
        v-model="form.name"
      />
      <FieldWithValidation
        rules="required"
        name="price"
        :min="1.0"
        type="number"
        step=".01"
        placeholder="price"
        v-model="form.price"
        @blur="form.price = parseFloat(form.price).toFixed(2)"
      />
      <FieldWithValidation
        rules="required"
        name="description"
        v-slot="{ invalid }"
      >
        <textarea
          v-model="form.description"
          :class="{ 'is-invalid': invalid }"
          placeholder="description"
        >
        </textarea>
      </FieldWithValidation>
      <FieldWithValidation
        rules="required"
        name="color"
        label="Color"
        type="color"
        v-model="form.color"
      />
      <FieldWithValidation
        rules="required"
        placeholder="taste"
        name="taste"
        v-model="form.taste"
      />
      <FieldWithValidation
        name="image"
        rules="required|image"
        v-slot="{ validate }"
      >
        <FileUpload
          accept="image/*"
          @upload="
            ({ file, base64 }) => {
              validate(file);
              form.image = base64;
            }
          "
        />
      </FieldWithValidation>
      <FieldWithValidation name="expire date" rules="required">
        <Datepicker :inline="true" v-model="form.expires" />
      </FieldWithValidation>
      <div class="row is-multiline is-justify-content-center mt-2">
        <div class="col-12-mobile col-4-tablet">
          <button
            :disabled="loading"
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
            @click.prevent="$emit('cancel')"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import FieldWithValidation from "@/components/FieldWithValidation";
import FileUpload from "@/components/FileUpload";
import Datepicker from "vuejs-datepicker";
import { Form } from "@/utils";
export default {
  name: "CreateFruitForm",
  components: {
    ValidationObserver,
    FieldWithValidation,
    FileUpload,
    Datepicker,
  },
  data: () => ({
    loading: false,
    form: new Form({
      isFruit: true,
      name: "",
      image: "",
      price: "",
      color: "#ffffff",
      description: "",
      taste: "",
      expires: "",
    }),
  }),

  methods: {
    toggleLoading() {
      this.loading = !this.loading;
    },
    async onSubmit(reset) {
      try {
        this.loading = true;
        await this.$store.dispatch("addFruit", this.form);
        this.$emit("submit", this.form);
        this.form.reset();
        reset();
      } catch (error) {
        this.$emit("error ", { error, form: this.form });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
