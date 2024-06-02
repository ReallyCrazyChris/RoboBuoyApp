<template>
  <q-page>
    <GpsDashboard></GpsDashboard>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import GpsDashboard from "src/components/dashboards/GPSDashboard.vue";

export default defineComponent({
  name: "GPSPage",
  components: {
    GpsDashboard,
  },
  setup() {},
});
</script>
