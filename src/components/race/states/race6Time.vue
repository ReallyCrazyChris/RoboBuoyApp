<template>
  <q-card flat class="row" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-auto self-center q-mr-sm">
          <raceTimerLarge />
        </div>
        <div class="fit col self-center text-right">
          <q-avatar square size="14vmin">
            <q-img :src="raceTimer.yankeeFlagModel.image" />
          </q-avatar>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="fit col-12 q-py-none">
      <div class="row">
        <div class="col-xs-12 col-sm-4 self-center">
          <sogview />
        </div>
        <div class="col-xs-12 col-sm-4 q-mt-md self-center">
          <vmcview />
        </div>
        <div class="col-xs-12 col-sm-4 q-mt-md self-center">
          <efficiencyview />
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
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
      </div>
    </q-card-actions>
  </q-card>

  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col q-pa-none"> </q-card-section>

    <q-card-actions class="col-1" align="right"> </q-card-actions>
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
