<template>
  <q-card flat class="row" style="min-height: inherit">
    <q-card-section class="col-xs-12 col-md-6">
      <div class="row">
        <div class="col-5">
          <q-img :src="raceTimer.classFlagModel.image" />
        </div>

        <div class="col-5" />
        <div class="col-2 text-right">
          <q-avatar square size="3.4rem">
            <q-img :src="raceTimer.yankeeFlagModel.image" />
          </q-avatar>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="row">
        <div class="col-12 text-caption text-center q-my-xs">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
        <div class="col-12 text-center q-my-xs">
          <raceTimerLarge />
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="col-12 self-end">
      <div class="fit text-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="racepostponedTransition()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";

import { useRaceTimer } from "src/stores/raceTimer";

const raceTimer = useRaceTimer();

export default {
  name: "raceReady",
  components: { raceTimerLarge },

  setup() {
    return { raceTimer };
  },

  methods: {
    raceclassTransition() {
      raceTimer.raceclassTransition();
      raceTimer.publishRaceTransition("raceclass");
    },

    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },
  },
};
</script>
