<template>
  <q-page>
    <RoboMap></RoboMap>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import RoboMap from "src/components/map/RoboMap.vue";

export default defineComponent({
  name: "RaceCourse",
  components: {
    RoboMap,
  },
  setup() {},
});
</script>
