<template>
  <div class="column" style="min-height: inherit">
    <q-card class="col-1 q-py-none" flat>
      <q-card-section>
        <raceInfoRegatta />
      </q-card-section>
    </q-card>

    <div class="col" ref="raceCoursePageMapContainer">
      <raceCourseMap
        v-if="raceCoursePageMapContainer?.clientHeight"
        :height="raceCoursePageMapContainer?.clientHeight"
        show-map
        show-boundary
        show-zoom
        show-controls
        can-edit
        :key="course.signature"
      ></raceCourseMap>
    </div>

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
import raceInfoOptions from "src/components/timer/raceInfoOptions.vue";
import raceCourseOptions from "src/components/course/raceCourseOptions.vue";
import raceCourseLapInfo from "src/components/course/raceCourseLapInfo.vue";

import raceCourseMap from "src/components/course/raceCourseMap.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceCourse } from "src/stores/raceCourse";

const raceTimer = useRaceTimer();
const course = useRaceCourse();

export default {
  name: "raceInfo",
  components: {
    raceInfoRegatta,
    raceCourseMap,
    //raceInfoOptions,
    //raceCourseOptions,
    //raceCourseLapInfo,
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
