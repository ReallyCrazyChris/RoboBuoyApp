<template>
  <div class="column" style="min-height: inherit">
    <q-card class="col-1 q-py-none" flat>
      <q-card-section>
        <raceInfoRegatta></raceInfoRegatta>
      </q-card-section>
    </q-card>

    <div class="col q-px-md q-py-none">
      <raceCourseOptions />
      <raceInfoOptions />
    </div>

    <div class="col-1 q-px-md q-py-none">
      <q-card>
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

import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceCourse } from "src/stores/raceCourse";

const raceTimer = useRaceTimer();
const course = useRaceCourse();

export default {
  name: "raceInfo",
  components: {
    raceInfoRegatta,
    raceInfoOptions,
    raceCourseOptions,
  },

  setup(props) {
    return { course };
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
