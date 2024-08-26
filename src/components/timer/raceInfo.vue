<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pt-sm q-pb-none">
      <div class="row">
        <div class="col-12 text-h6">{{ regatta.name }}</div>
        <div class="col-12 text-caption text-weight-bold">
          {{ regatta.description }}
        </div>

        <div class="col-6 text-caption text-weight-bold">
          {{ regatta.localDate }} @ {{ regatta.localTime }}
        </div>
      </div>
    </q-card-section>
    <q-card-section class="col q-pt-none">
      <courseMap
        :height="300"
        show-map
        show-boundary
        show-zoom
        show-controls
        :key="course.signature"
      ></courseMap>
    </q-card-section>
    <q-card-actions class="col-1 q-pt-none" align="right">
      <q-btn
        flat
        color="secondary"
        label="postpone"
        @click="racepostponedTransition()"
      />
      <q-btn color="positive" label="Follow me" @click="followmeTransition()" />
    </q-card-actions>
  </q-card>
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
