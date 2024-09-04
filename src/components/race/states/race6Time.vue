<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col-1">
      <div class="row">
        <div class="col-10 self-center">
          <raceTimerLarge />
        </div>
        <div class="col-1 self-center">
          <div class="">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="col q-pa-none">
      <sogview />
      <vmcview />
      <efficiencyview />
    </q-card-section>

    <q-card-actions class="col-1" align="right">
      <q-btn
        flat
        color="secondary"
        label="Abandon Race"
        @click="raceabandonedTransition()"
      />
      <q-btn
        color="accent"
        label="End Race"
        @click="racecompletedTransition()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";
import sogview from "src/components/boat/sog.vue";
import vmcview from "src/components/boat/vmc.vue";
import efficiencyview from "src/components/boat/efficiency.vue";

import { useRaceTimer } from "src/stores/raceTimer";
const raceTimer = useRaceTimer();

export default {
  name: "raceTime",
  components: { raceTimerLarge, sogview, vmcview, efficiencyview },

  setup(props) {
    return { raceTimer };
  },

  methods: {
    racecompletedTransition() {
      raceTimer.racecompletedTransition();
      raceTimer.publishRaceTransition("racecompleted");
    },

    raceabandonedTransition() {
      raceTimer.raceabandonedTransition();
      raceTimer.publishRaceTransition("raceabandoned");
    },
  },
};
</script>
<style></style>
