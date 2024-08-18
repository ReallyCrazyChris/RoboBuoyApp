<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-px-md q-py-none">
      <q-card-section class="row fit justify-start">
        <div class="col-10">
          <raceTimerLarge />
        </div>
        <div class="col-1 q-ml-xs q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
        </div>

        <div class="col-12 text-center" style="font-size: 30vmin">START</div>
      </q-card-section>
    </div>

    <div class="col-1 q-px-md q-py-none"></div>

    <div class="col-1 q-px-md q-py-none">
      <q-card>
        <q-card-actions align="right">
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
    </div>
  </div>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRaceCourse } from "src/stores/raceCourse";

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
