<template>
  <q-page>
    <div class="column" style="min-height: inherit">
      <div class="col" ref="raceCoursePageMapContainer">
        <courseMap
          v-if="raceCoursePageMapContainer?.clientHeight"
          :height="raceCoursePageMapContainer?.clientHeight"
          show-map
          show-boundary
          show-zoom
          show-controls
          can-edit
          :key="cource.signature"
        ></courseMap>
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
import { useCourse } from "src/stores/course";
import courseMap from "src/components/course/courseMap.vue";

const cource = useCourse();

export default defineComponent({
  name: "RaceCourse",
  components: {
    courseMap,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
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
