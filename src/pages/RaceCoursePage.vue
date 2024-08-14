<template>
  <q-page padding>
    <raceCourseMap
      :height="550"
      show-map
      show-boundary
      show-zoom
      show-attribution
      edit-course
      :key="cource.label"
    ></raceCourseMap>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import raceCourseMap from "src/components/course/raceCourseMap.vue";
import { useRaceCourse } from "src/stores/raceCourse";

const cource = useRaceCourse();

export default defineComponent({
  name: "RaceCourse",
  components: {
    raceCourseMap,
  },
  setup() {
    return {
      cource,
    };
  },
});
</script>
