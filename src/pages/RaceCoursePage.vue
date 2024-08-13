<template>
  <q-page>
    <raceCourseMap showMap showBoundary editCourse></raceCourseMap>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import raceCourseMap from "src/components/course/raceCourseMap.vue";

export default defineComponent({
  name: "RaceCourse",
  components: {
    raceCourseMap,
  },
  setup() {},
});
</script>
