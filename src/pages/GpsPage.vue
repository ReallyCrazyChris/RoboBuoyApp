<template>
  <q-page>
    <GpsDashboard></GpsDashboard>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import GpsDashboard from "src/components/dashboards/GpsDashboard.vue";

export default defineComponent({
  name: "RaceCourse",
  components: {
    GpsDashboard,
  },
  setup() {},
});
</script>
