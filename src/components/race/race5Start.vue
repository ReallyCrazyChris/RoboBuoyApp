<template>
  <q-card flat class="column" style="min-height: inherit">
    <q-card-section class="col">
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
    <q-card-section>
      <div class="col-12 text-center" style="font-size: 30vmin">START</div>
    </q-card-section>

    <q-card-actions class="col-1" align="right">
      <q-btn
        flat
        color="secondary"
        label="Postpone"
        @click="racepostponedTransition()"
      />

      <q-btn
        color="primary"
        label="Recall One"
        @click="recalloneTransition()"
      />

      <q-btn
        color="secondary"
        label="Recall All"
        @click="recallallTransition()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";

import { useRaceTimer } from "src/stores/raceTimer";

const raceTimer = useRaceTimer();

export default {
  name: "raceStart",
  components: { raceTimerLarge },

  setup(props) {
    return { raceTimer };
  },

  methods: {
    racepostponedTransition() {
      raceTimer.racepostponedTransition();
      raceTimer.publishRaceTransition("racepostponed");
    },

    recalloneTransition() {
      raceTimer.recalloneTransition();
      raceTimer.publishRaceTransition("recallone");
    },

    recallallTransition() {
      raceTimer.recallallTransition();
      raceTimer.publishRaceTransition("recallall");
    },
  },
};
</script>
<style></style>
src/stores/raceCourse
