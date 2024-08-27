<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pt-sm q-pb-none">
      <div class="text-h6 text-center">
        Prepare for {{ regatta.name }} start
      </div>

      <sogview class="q-pt-lg" />
      <vmcview />
      <efficiencyview />
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
import courseMap from "src/components/course/courseMap.vue";
import sogview from "src/components/boat/sog.vue";
import vmcview from "src/components/boat/vmc.vue";
import efficiencyview from "src/components/boat/efficiency.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();
const regatta = useRegatta();
const course = useCourse();

export default {
  name: "raceInfo",
  components: { sogview, vmcview, efficiencyview },

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
