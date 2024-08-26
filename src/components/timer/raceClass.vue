<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col">
      <div class="fit row">
        <q-img
          class="col-5 q-my-xs q-mr-xs"
          :src="raceTimer.classFlagModel.image"
        />

        <div class="col-5 q-my-xs q-mr-xs" />
        <div class="col-1 q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
        </div>
        <div class="col-12 text-caption text-center q-my-xs">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
        <div class="col-12 text-center q-my-xs">
          <raceTimerLarge />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <sogview class="q-py-sm" />
      <vmcview class="q-py-sm" />
      <efficiencyview class="q-py-sm" />
    </q-card-section>

    <q-card-actions class="col-1" align="right">
      <q-btn
        flat
        color="secondary"
        label="Postpone Race"
        @click="racepostponedTransition()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useCourse } from "src/stores/course";

const raceTimer = useRaceTimer();

export default {
  name: "raceClass",
  components: { raceTimerLarge },

  setup(props) {
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
<style></style>
