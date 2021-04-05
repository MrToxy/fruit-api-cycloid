<template>
  <label :class="{ 'has-file': file }" for="imageUpload" class="image-upload">
    <img
      ref="image"
      class="image-upload__image"
      height="128"
      width="128"
      :src="placeholder"
    />
    <input
      id="imageUpload"
      v-bind="$attrs"
      hidden
      type="file"
      @change="onFileUpload"
    />
  </label>
</template>
<script>
import { fileToBase64 } from "@/utils";
const placeholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP89elTPQAJKwNfpAMGWwAAAABJRU5ErkJggg==";
export default {
  name: "FileUpload",
  inheritAttrs: false,
  data: () => ({
    file: null,
    placeholder,
  }),
  methods: {
    async onFileUpload(e) {
      const file = e.target.files[0];
      if (file) {
        try {
          const base64 = await fileToBase64(file);
          this.file = base64;
          this.$refs.image.src = this.file;
          this.$emit("upload", { base64, file });
        } catch (error) {
          this.file = placeholder;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.image-upload {
  height: 128px;
  width: 128px;
  display: inline-block;
  border-radius: 100%;
  background: url("../assets/icons/upload.png") rgba(black, 0.4);
  background-size: 48px;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-position-y 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  position: relative;
  &.has-file {
    background-position-y: calc(100% + 48px);
  }
  &:hover {
    background-position-y: 50%;
  }

  img {
    height: 100%;
    width: 100%;
    border: none;
    border-radius: inherit;
    object-fit: contain;
    pointer-events: none;
    z-index: -1;
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
