<template>
  <q-page>
    <courseMap showMap showBoundary editCourse></courseMap>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import courseMap from "src/components/course/courseMap.vue";

export default defineComponent({
  name: "RaceCourse",
  components: {
    courseMap,
  },
  setup() {},
});
</script>
