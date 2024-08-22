<template>
  <div class="column" style="min-height: inherit">
    <q-card class="col-1 q-py-none" flat>
      <q-card-section>
        <raceInfoRegatta />
      </q-card-section>
    </q-card>

    <!--div class="col" ref="raceCoursePageMapContainer">
      <courseMap
        v-if="raceCoursePageMapContainer?.clientHeight"
        :height="raceCoursePageMapContainer?.clientHeight"
        show-map
        show-boundary
        show-zoom
        show-controls
        can-edit
        :key="course.signature"
      ></courseMap>
    </div-->

    <div class="col-1 q-p-none">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="Postpone Race"
            @click="racepostponedTransition()"
          />
          <q-btn
            color="positive"
            label="follow me"
            @click="followmeTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import raceInfoRegatta from "src/components/timer/raceInfoRegatta.vue";
import raceInfo from "src/components/timer/raceInfo.vue";
import courseSelection from "src/components/course/courseSelection.vue";
import courseLaps from "src/components/course/courseLaps.vue";

import courseMap from "src/components/course/courseMap.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();
const course = useCourse();

export default {
  name: "raceInfo",
  components: {
    //raceInfoRegatta,
    //courseMap,
    //raceInfo,
    //courseSelection,
    //courseLaps,
  },

  setup(props) {
    const raceCoursePageMapContainer = ref(null);
    return { course, raceCoursePageMapContainer };
  },

  methods: {
    followmeTransition() {
      raceTimer.followmeTransition();
      raceTimer.publishRaceTransition("followme");
    },

    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },
  },
};
</script>
<style></style>
