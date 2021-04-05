<template>
  <ValidationObserver slim v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
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
      <button class="button">Submit</button>
    </form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import FieldWithValidation from "@/components/FieldWithValidation";
import FileUpload from "@/components/FileUpload";
import Datepicker from "vuejs-datepicker";

export default {
  name: "CreateFruitForm",
  components: {
    ValidationObserver,
    FieldWithValidation,
    FileUpload,
    Datepicker,
  },
  data: () => ({
    form: {
      isFruit: true,
      name: "",
      image: "",
      price: "",
      color: "#ffffff",
      description: "",
      taste: "",
      expires: "",
    },
  }),

  methods: {
    onSubmit() {
      console.log("submit: ");
    },
  },
};
</script>
