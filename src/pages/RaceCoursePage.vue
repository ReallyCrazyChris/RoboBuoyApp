<template>
  <q-page>
    <div
      ref="raceCoursePageMapContainer"
      class="row"
      style="min-height: inherit"
    >
      <div class="col-12">
        <raceCourseMap
          v-if="raceCoursePageMapContainer?.clientHeight"
          :height="raceCoursePageMapContainer?.clientHeight"
          show-map
          show-boundary
          show-zoom
          show-attribution
          show-controls
          can-edit
          :key="cource.label"
        ></raceCourseMap>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRaceCourse } from "src/stores/raceCourse";
import raceCourseMap from "src/components/course/raceCourseMap.vue";

const cource = useRaceCourse();

export default defineComponent({
  name: "RaceCourse",
  components: {
    raceCourseMap,
  },
  setup() {
    // makes sure the raceCourseMap fills the parent element to the maximum
    const raceCoursePageMapContainer = ref(null);

    return {
      raceCoursePageMapContainer,
      cource,
    };
  },
  mounted() {},
});
</script>
<style></style>
