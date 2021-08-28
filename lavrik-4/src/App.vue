<template>
  <form v-if="!formSent">
    <progress-bar :value="fieldsDone" :max="info.length"></progress-bar>
    <div>
      <smart-input
        :name="field.name"
        :valid="field.valid"
        :value="field.value"
        @updated="onInput(i, $event)"
        v-for="(field, i) in info"
        :key="i"
      >
      </smart-input>
    </div>
    <button
      :disabled="!formReady"
      @click="formSent = true"
      class="btn btn-primary"
      type="button"
    >
      Send Data
    </button>
  </form>
  <div v-else>
    <table class="table table-bordered">
      <tr v-for="(item, i) in info" :key="i">
        <td>{{ item.name }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import SmartInput from "@/components/SmartInput.vue";
import ProgressBar from "./components/ProgressBar";

export default {
  name: "App",
  components: {
    ProgressBar,
    SmartInput,
  },
  data: () => ({
    info: [
      {
        name: "Name",
        value: "",
        pattern: /^[a-zA-Z ]{2,30}$/,
      },
      {
        name: "Phone",
        value: "",
        pattern: /^[0-9]{7,14}$/,
      },
      {
        name: "Email",
        value: "",
        pattern: /.+/,
      },
      {
        name: "Some Field 1",
        value: "",
        pattern: /.+/,
      },
      {
        name: "Some Field 2",
        value: "",
        pattern: /.+/,
      },
    ],
    formSent: false,
  }),
  computed: {
    fieldsDone() {
      return this.info.reduce((acc, val) => acc + Number(val.valid), 0);
    },
    formReady() {
      return this.fieldsDone === this.info.length;
    },
  },
  methods: {
    onInput(i, value) {
      let field = this.info[i];
      field.value = value.trim();
      field.valid = field.pattern.test(field.value);
    },
  },
  created() {
    return this.info.forEach((field) => {
      field.valid = field.pattern.test(field.value);
    });
  },
};
</script>

<style>
.wrapper {
  padding: 15px;
  max-width: 900px;
}
</style>
