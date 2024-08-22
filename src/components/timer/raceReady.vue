<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-px-md q-py-none">
      <q-card flat>
        <q-card-section class="fit row">
          <q-img
            class="col-5 q-my-xs q-mr-xs"
            :src="raceTimer.classFlagModel.image"
          />
          <q-img class="col-5 q-my-xs q-mr-xs" src="" />
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
        </q-card-section>
      </q-card>
    </div>

    <div class="col-1 q-px-md q-py-none"></div>

    <div class="col-1 q-px-md q-py-none">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="Postpone Race"
            @click="racepostponedTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceCourse } from "src/stores/raceCourse";

const raceTimer = useRaceTimer();

export default {
  name: "raceReady",
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
