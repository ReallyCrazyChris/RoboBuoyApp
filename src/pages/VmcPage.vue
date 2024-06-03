<template>
  <q-page>
    <VmcDashboard :config="config"></VmcDashboard>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import VmcDashboard from "src/components/dashboards/VmcDashboard.vue";

export default defineComponent({
  name: "VmcPage",
  props: ["config"],
  components: {
    VmcDashboard,
  },
  setup() {},
});
</script>
