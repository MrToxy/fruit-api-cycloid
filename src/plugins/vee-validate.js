import { extend } from "vee-validate";
import { required, image } from "vee-validate/dist/rules";

extend("required", { ...required, message: "{_field_} is required" });
extend("image", image);

extend("min_value", {
  validate: (value, { min }) => value >= min,
  params: ["min"],
  message: "{_field_} must have a minimum value of {min}",
});
