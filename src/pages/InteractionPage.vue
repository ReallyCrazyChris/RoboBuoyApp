<template>
  <q-page padding>
    <RoboMapPin />
  </q-page>
</template>

<script>
import RoboMapPin from "src/components/omap/RoboMapPin.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "InteractionPage",
  components: {
    RoboMapPin,
  },
});
</script>
