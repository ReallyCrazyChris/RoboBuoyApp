<template>
  <div class="column" style="min-height: inherit">
    <q-card class="col-1 q-py-none" flat>
      <q-card-section>
        <div class="row">
          <div class="col-6 text-h6">Prepare Race</div>
          <div class="col-6 q-pr-sm" align="right"><regattaShare /></div>
        </div>
      </q-card-section>
    </q-card>

    <div class="col q-px-md q-py-none">
      <courseMap
        :height="120"
        show-map
        show-boundary
        show-zoom
        show-controls
        :readonly="true"
        :key="course.signature"
      ></courseMap>
    </div>

    <div class="col-1 q-px-md q-py-none"><raceSettings /></div>

    <div class="col-1 q-px-md q-py-none">
      <q-card>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="postpone"
            @click="racepostponedTransition()"
          />
          <q-btn
            color="positive"
            label="Follow me"
            @click="followmeTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import regattaShare from "src/components/regatta/regattaShare.vue";
import raceSettings from "src/components/race/raceSettings.vue";
import courseMap from "src/components/course/courseMap.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();
const regatta = useRegatta();
const course = useCourse();

export default {
  name: "raceInfo",
  components: {
    courseMap,
    raceSettings,
    regattaShare,
  },

  setup(props) {
    return { regatta, course };
  },

  methods: {
    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },

    followmeTransition() {
      raceTimer.followmeTransition();
      raceTimer.publishRaceTransition("followme");
    },
  },
};
</script>
<style></style>
