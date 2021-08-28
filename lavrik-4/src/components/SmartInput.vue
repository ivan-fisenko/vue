<template>
  <div class="form-group">
    <label>{{ name }}</label>
    <font-awesome-icon
      v-if="activated"
      :icon="valid ? 'check-circle' : 'exclamation-circle'"
      :class="valid ? 'text-success' : 'text-danger'"
    />
    <input
      type="text"
      class="form-control"
      :value="value"
      @input="onInput($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "SmartInput",
  props: { name: String, value: String, valid: Boolean },
  data: () => ({
    activated: false,
  }),
  methods: {
    onInput(value) {
      this.activated = true;
      this.$emit("updated", value);
    },
  },
  created() {
    this.activated = !!this.value;
  },
};
</script>

<style scoped></style>
