<template>
  <q-page>
    <VmcDashboard></VmcDashboard>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import VmcDashboard from "src/components/dashboards/VmcDashboard.vue";

export default defineComponent({
  name: "VmcPage",
  components: {
    VmcDashboard,
  },
  setup() {},
});
</script>
