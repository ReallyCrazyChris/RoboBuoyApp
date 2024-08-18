<template>
  <div class="column" style="min-height: inherit">
    <div class="col q-px-md q-py-none">
      <q-card flat>
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
        </q-card-section>
        <q-card-section>
          <sogview />
        </q-card-section>

        <q-card-section>
          <vmcview />
        </q-card-section>

        <q-card-section>
          <efficiencyview />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-1 q-px-md q-py-none">
      <q-card>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="Abandon Race"
            @click="raceabandonedTransition()"
          />
          <q-btn
            color="accent"
            label="Race Completed"
            @click="racecompletedTransition()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import raceTimerLarge from "src/components/timer/raceTimerLarge.vue";
import sogview from "src/components/vmc/sog.vue";
import vmcview from "src/components/vmc/vmc.vue";
import efficiencyview from "src/components/vmc/efficiency.vue";

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
