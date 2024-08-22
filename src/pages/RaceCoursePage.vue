<template>
  <q-page>
    <div class="column" style="min-height: inherit">
      <div class="col" ref="raceCoursePageMapContainer">
        <raceCourseMap
          v-if="raceCoursePageMapContainer?.clientHeight"
          :height="raceCoursePageMapContainer?.clientHeight"
          show-map
          show-boundary
          show-zoom
          show-controls
          can-edit
          :key="cource.signature"
        ></raceCourseMap>
      </div>
    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn icon="arrow_back" color="positive" @click="regattaTransition()" />
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        icon="arrow_forward"
        color="positive"
        @click="joinRegattaTransition()"
      />
    </q-page-sticky>
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
  methods: {
    joinRegattaTransition() {
      this.$router.push("joinregatta");
    },
    regattaTransition() {
      this.$router.push("regatta");
    },
  },
});
</script>
<style></style>
