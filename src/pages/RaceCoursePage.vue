<template>
  <q-page>
    <div class="column" style="min-height: inherit">
      <div class="col" ref="raceCoursePageMapContainer">
        <raceCourseMap
          v-if="raceCoursePageMapContainer?.clientHeight"
          :height="raceCoursePageMapContainer?.clientHeight"
          show-map
          show-title
          show-sequence
          show-boundary
          show-zoom
          show-controls
          can-edit
          :key="cource.title"
        ></raceCourseMap>
      </div>
      <div class="col-1 q-px-md q-py-none">
        <raceCourseOptions />
      </div>
    </div>
  </q-page>
</template>

<script>
/*show-title
          show-sequence
          show-boundary
          show-zoom
          show-controls
          can-edit*/

import { defineComponent, ref } from "vue";
import { useRaceCourse } from "src/stores/raceCourse";
import raceCourseMap from "src/components/course/raceCourseMap.vue";
import raceCourseOptions from "src/components/course/raceCourseOptions.vue";

const cource = useRaceCourse();

export default defineComponent({
  name: "RaceCourse",
  components: {
    raceCourseMap,
    raceCourseOptions,
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
