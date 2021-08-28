<template>
  <div class="progress">
    <div :style="progressStyles" class="progress-bar"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: { value: Number, max: Number },
  computed: {
    progressStyles() {
      return { width: (100 / this.max) * this.value + "%" };
    },
  },
};
</script>

<style scoped></style>
